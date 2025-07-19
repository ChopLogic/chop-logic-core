import { Operator } from "../../../enums";
import type { PropFormula, PropFormulaVariablesMap } from "../../../models";
import { calculatePropFormula } from "../calculate-prop-formula";

describe("calculatePropFormula", () => {
	it("should evaluate a simple NOR operation", () => {
		const formula: PropFormula = {
			operator: Operator.Nor,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const variablesMap = new Map([
			[0, ["A"]],
			[1, ["B"]],
		]) as PropFormulaVariablesMap;
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, false],
			}),
		).toBe(false);
		expect(
			calculatePropFormula({ formula, variablesMap, assignment: [true, true] }),
		).toBe(false);
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [false, false],
			}),
		).toBe(true);
	});

	it("should evaluate a NOT operation", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["A"] }],
		};
		expect(calculatePropFormula({ formula, assignment: [true] })).toBe(false);
		expect(calculatePropFormula({ formula, assignment: [false] })).toBe(true);
	});

	it("should evaluate a more complex formula ((A & ~B) => C)", () => {
		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{
							operator: Operator.Not,
							values: [{ operator: Operator.Var, values: ["B"] }],
						},
					],
				},
				{ operator: Operator.Var, values: ["C"] },
			],
		};
		const variablesMap = new Map([
			[0, ["A"]],
			[1, ["B"]],
			[2, ["C"]],
		]) as PropFormulaVariablesMap;
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, false, true],
			}),
		).toBe(true);
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, true, true],
			}),
		).toBe(true);
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, false, false],
			}),
		).toBe(false);
	});

	it("should evaluate a more complex formula ((A & B) <=> (C | D))", () => {
		const formula: PropFormula = {
			operator: Operator.Equiv,
			values: [
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.Or,
					values: [
						{ operator: Operator.Var, values: ["C"] },
						{ operator: Operator.Var, values: ["D"] },
					],
				},
			],
		};
		const variablesMap = new Map([
			[0, ["A"]],
			[1, ["B"]],
			[2, ["C"]],
			[3, ["D"]],
		]) as PropFormulaVariablesMap;
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [false, false, false, false],
			}),
		).toBe(true);
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, true, true, true],
			}),
		).toBe(true);
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, false, false, true],
			}),
		).toBe(false);
		expect(
			calculatePropFormula({
				formula,
				variablesMap,
				assignment: [true, true, false, true],
			}),
		).toBe(true);
	});

	it("should throw an error for mismatched assignment length", () => {
		const formula: PropFormula = {
			operator: Operator.Var,
			values: ["A"],
		};
		expect(() => calculatePropFormula({ formula, assignment: [] })).toThrow(
			"Mismatch between formula variables (1) and assignment length (0).",
		);
	});
});
