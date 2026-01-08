import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationReversalApplicable } from "../is-implication-reversal-applicable";

describe("isImplicationReversalApplicable", () => {
	it("should return true for a single formula with schema ¬F => ¬G", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [F] },
				{ operator: Operator.Not, values: [G] },
			],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(true);
	});

	it("should return true for multiple formulas with the schema ¬F => ¬G", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const D: PropFormula = { operator: Operator.Var, values: ["D"] };

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [A] },
				{ operator: Operator.Not, values: [B] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [C] },
				{ operator: Operator.Not, values: [D] },
			],
		};

		expect(isImplicationReversalApplicable([formula1, formula2])).toBe(true);
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

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [F] },
				{ operator: Operator.Not, values: [G] },
			],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(true);
	});

	it("should return false for an empty array", () => {
		expect(isImplicationReversalApplicable([])).toBe(false);
	});

	it("should return false if the formula is not an implication", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Not, values: [A] },
				{ operator: Operator.Not, values: [B] },
			],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(false);
	});

	it("should return false if antecedent is not a negation", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Not, values: [G] }],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(false);
	});

	it("should return false if consequent is not a negation", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [{ operator: Operator.Not, values: [F] }, G],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(false);
	});

	it("should return false if both antecedent and consequent are not negations", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, G],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(false);
	});

	it("should return false if one formula does not satisfy the schema", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };

		const validFormula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [A] },
				{ operator: Operator.Not, values: [B] },
			],
		};

		const invalidFormula: PropFormula = {
			operator: Operator.Implies,
			values: [A, C],
		};

		expect(
			isImplicationReversalApplicable([validFormula, invalidFormula]),
		).toBe(false);
	});

	it("should return false if antecedent negation has no inner formula", () => {
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [] },
				{ operator: Operator.Not, values: [G] },
			],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(false);
	});

	it("should return false if consequent negation has no inner formula", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [F] },
				{ operator: Operator.Not, values: [] },
			],
		};

		expect(isImplicationReversalApplicable([formula])).toBe(false);
	});
});
