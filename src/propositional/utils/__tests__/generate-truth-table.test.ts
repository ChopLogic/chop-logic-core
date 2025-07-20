import { Operator } from "../../../enums";
import type { PropFormula, TruthAssignmentsMap } from "../../../models";
import { generatePropTruthTable } from "../generate-prop-truth-table";

describe("generatePropTruthTable", () => {
	it("should generate a truth table for a simple NAND formula", () => {
		const formula: PropFormula = {
			operator: Operator.Nand,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const expectedTable: TruthAssignmentsMap = new Map([
			[0, [false, false, true]],
			[1, [false, true, true]],
			[2, [true, false, true]],
			[3, [true, true, false]],
		]);

		expect(generatePropTruthTable(formula)).toEqual(expectedTable);
	});

	it("should generate a truth table for a formula with NOT operator", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["A"] }],
		};

		const expectedTable: TruthAssignmentsMap = new Map([
			[0, [false, true]],
			[1, [true, false]],
		]);

		expect(generatePropTruthTable(formula)).toEqual(expectedTable);
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

		const expectedTable: TruthAssignmentsMap = new Map([
			[0, [false, false, false, false, true]],
			[1, [false, false, false, true, false]],
			[2, [false, false, true, false, false]],
			[3, [false, false, true, true, false]],
			[4, [false, true, false, false, true]],
			[5, [false, true, false, true, false]],
			[6, [false, true, true, false, false]],
			[7, [false, true, true, true, false]],
			[8, [true, false, false, false, true]],
			[9, [true, false, false, true, false]],
			[10, [true, false, true, false, false]],
			[11, [true, false, true, true, false]],
			[12, [true, true, false, false, false]],
			[13, [true, true, false, true, true]],
			[14, [true, true, true, false, true]],
			[15, [true, true, true, true, true]],
		]);

		expect(generatePropTruthTable(formula)).toEqual(expectedTable);
	});

	it("should throw an error if the formula has more variables than the limit allows", () => {
		const formula: PropFormula = {
			operator: Operator.And,
			values: Array.from({ length: 101 }, (_, i) => ({
				operator: Operator.Var,
				values: [`A${i}`],
			})) as PropFormula[],
		};

		expect(() => generatePropTruthTable(formula)).toThrow();
	});

	it("should throw an error if the formula has more variables than the limit in parameter allows", () => {
		const formula: PropFormula = {
			operator: Operator.ReversedAntiImplies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		expect(() => generatePropTruthTable(formula, 1)).toThrow();
	});
});
