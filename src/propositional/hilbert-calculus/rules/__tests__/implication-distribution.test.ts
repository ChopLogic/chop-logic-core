import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { implicationDistributionRule } from "../implication-distribution";

describe("implicationDistributionRule", () => {
	it("should distribute a single formula with schema F => (G => H)", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Implies, values: [G, H] }],
		};

		const result = implicationDistributionRule([formula]);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Implies,
					values: [F, G],
				},
				{
					operator: Operator.Implies,
					values: [F, H],
				},
			],
		});
	});

	it("should distribute multiple formulas", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const D: PropFormula = { operator: Operator.Var, values: ["D"] };
		const E: PropFormula = { operator: Operator.Var, values: ["E"] };
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [A, { operator: Operator.Implies, values: [B, C] }],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [D, { operator: Operator.Implies, values: [E, F] }],
		};

		const result = implicationDistributionRule([formula1, formula2]);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Implies,
					values: [A, B],
				},
				{
					operator: Operator.Implies,
					values: [A, C],
				},
			],
		});
		expect(result[1]).toEqual({
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Implies,
					values: [D, E],
				},
				{
					operator: Operator.Implies,
					values: [D, F],
				},
			],
		});
	});

	it("should distribute with complex nested formulas", () => {
		const F: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};
		const G: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["R"] },
				{ operator: Operator.Var, values: ["S"] },
			],
		};
		const H: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["T"] }],
		};

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Implies, values: [G, H] }],
		};

		const result = implicationDistributionRule([formula]);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Implies,
					values: [F, G],
				},
				{
					operator: Operator.Implies,
					values: [F, H],
				},
			],
		});
	});

	it("should throw an error if formula does not have the schema F => (G => H)", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		const invalidFormula: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		expect(() => implicationDistributionRule([invalidFormula])).toThrow(
			"Implication distribution requires each formula to have the form F => (G => H).",
		);
	});

	it("should throw an error if no formulas are provided", () => {
		expect(() => implicationDistributionRule([])).toThrow(
			"Implication distribution requires each formula to have the form F => (G => H).",
		);
	});

	it("should throw an error if any formula does not satisfy the schema", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		const validFormula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Implies, values: [G, H] }],
		};

		const invalidFormula: PropFormula = {
			operator: Operator.And,
			values: [F, G],
		};

		expect(() =>
			implicationDistributionRule([validFormula, invalidFormula]),
		).toThrow(
			"Implication distribution requires each formula to have the form F => (G => H).",
		);
	});
});
