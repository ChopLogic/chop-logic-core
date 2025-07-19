import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { arePropFormulasStructurallyEqual } from "../are-prop-formulas-structurally-equal";

describe("arePropFormulasStructurallyEqual", () => {
	it("should return true for identical formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const formula2 = { ...formula1 };
		expect(arePropFormulasStructurallyEqual([formula1, formula2])).toBe(true);
	});

	it("should return false for an empty array", () => {
		expect(arePropFormulasStructurallyEqual([])).toBe(false);
	});

	it("should return true for more than two identical formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const formula2 = { ...formula1 };
		const formula3 = { ...formula1 };
		const formula4 = { ...formula1 };
		expect(
			arePropFormulasStructurallyEqual([
				formula1,
				formula2,
				formula3,
				formula4,
			]),
		).toBe(true);
	});

	it("should return false for different structures", () => {
		const formula1: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const formula2: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		expect(arePropFormulasStructurallyEqual([formula1, formula2])).toBe(false);
	});

	it("should return false for different variable names", () => {
		const formula1: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const formula2: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["C"] },
			],
		};
		expect(arePropFormulasStructurallyEqual([formula1, formula2])).toBe(false);
	});

	it("should return true for deeply nested identical formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Or,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["C"] },
						{ operator: Operator.Var, values: ["D"] },
					],
				},
			],
		};
		const formula2 = { ...formula1 };
		expect(arePropFormulasStructurallyEqual([formula1, formula2])).toBe(true);
	});

	it("should return false for deeply nested different formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Or,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["C"] },
						{ operator: Operator.Var, values: ["D"] },
					],
				},
			],
		};
		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Or,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["X"] },
						{ operator: Operator.Var, values: ["D"] },
					],
				},
			],
		};
		expect(arePropFormulasStructurallyEqual([formula1, formula2])).toBe(false);
	});
});
