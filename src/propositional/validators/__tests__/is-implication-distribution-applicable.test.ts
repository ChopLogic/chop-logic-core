import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationDistributionApplicable } from "../is-implication-distribution-applicable";

describe("isImplicationDistributionApplicable", () => {
	it("should return true for a single formula with schema F => (G => H)", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Implies, values: [G, H] }],
		};

		expect(isImplicationDistributionApplicable([formula])).toBe(true);
	});

	it("should return true for multiple formulas with the schema F => (G => H)", () => {
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

		expect(isImplicationDistributionApplicable([formula1, formula2])).toBe(
			true,
		);
	});

	it("should return true for complex nested formulas with the schema", () => {
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

		expect(isImplicationDistributionApplicable([formula])).toBe(true);
	});

	it("should return false for an empty array", () => {
		expect(isImplicationDistributionApplicable([])).toBe(false);
	});

	it("should return false if the formula is not an implication", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		const formula: PropFormula = {
			operator: Operator.And,
			values: [A, B],
		};

		expect(isImplicationDistributionApplicable([formula])).toBe(false);
	});

	it("should return false if the consequent is not an implication", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		expect(isImplicationDistributionApplicable([formula])).toBe(false);
	});

	it("should return false if the consequent is an implication with wrong number of values", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				A,
				{
					operator: Operator.Implies,
					values: [A],
				},
			],
		};

		expect(isImplicationDistributionApplicable([formula])).toBe(false);
	});

	it("should return false if one formula does not satisfy the schema", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		const validFormula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Implies, values: [G, H] }],
		};

		const invalidFormula: PropFormula = {
			operator: Operator.Implies,
			values: [F, G],
		};

		expect(
			isImplicationDistributionApplicable([validFormula, invalidFormula]),
		).toBe(false);
	});

	it("should return false if all formulas do not satisfy the schema", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		const formula2: PropFormula = {
			operator: Operator.And,
			values: [B, C],
		};

		expect(isImplicationDistributionApplicable([formula1, formula2])).toBe(
			false,
		);
	});

	it("should return false when values property contains more than two elements", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Implies, values: [G, H] }, F],
		};

		expect(isImplicationDistributionApplicable([formula])).toBe(false);
	});
});
