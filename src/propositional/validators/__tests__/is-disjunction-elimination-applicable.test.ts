import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isDisjunctionEliminationApplicable } from "../is-disjunction-elimination-applicable";

describe("isDisjunctionEliminationApplicable", () => {
	it("should return true for valid disjunction elimination", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(true);
	});

	it("should return false when implications have different consequents", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["S"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false when the disjunction does not match the antecedents", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["X"] },
				{ operator: Operator.Var, values: ["Y"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false if there are not exactly two implications", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Var,
			values: ["R"],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false for more that three formulas in the input array", () => {
		const formula1: PropFormula = {
			operator: Operator.Var,
			values: ["A"],
		};
		const formula2: PropFormula = {
			operator: Operator.Var,
			values: ["B"],
		};
		const formula3: PropFormula = {
			operator: Operator.Var,
			values: ["C"],
		};
		const formula4: PropFormula = {
			operator: Operator.Var,
			values: ["D"],
		};

		expect(
			isDisjunctionEliminationApplicable([
				formula1,
				formula2,
				formula3,
				formula4,
			]),
		).toBe(false);
	});

	it("should return false for fewer than three formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		// Only two formulas
		expect(isDisjunctionEliminationApplicable([formula1, formula2])).toBe(
			false,
		);

		// Only one formula
		expect(isDisjunctionEliminationApplicable([formula1])).toBe(false);

		// Empty array
		expect(isDisjunctionEliminationApplicable([])).toBe(false);
	});

	it("should return false when there is no disjunction formula", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["X"] },
				{ operator: Operator.Var, values: ["Y"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false when there is only one implication", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["X"] },
				{ operator: Operator.Var, values: ["Y"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false when disjunction has invalid structure (wrong length)", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			], // 3 values instead of 2
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false when implication has invalid structure (wrong length)", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			], // 3 values instead of 2
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should work when formulas are in different order (disjunction last)", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(true);
	});

	it("should work when formulas are in different order (disjunction middle)", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(true);
	});

	it("should return true when antecedents are in different order (swapped)", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["P"] },
			], // Q, P (reversed)
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		// Should still be true because the function checks both orderings
		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(true);
	});

	it("should handle complex formulas as antecedents and consequent", () => {
		const complexAntecedent1: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const complexAntecedent2: PropFormula = {
			operator: Operator.Var,
			values: ["C"],
		};

		const complexConsequent: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["D"] },
				{ operator: Operator.Var, values: ["E"] },
			],
		};

		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [complexAntecedent1, complexAntecedent2],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [complexAntecedent1, complexConsequent],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [complexAntecedent2, complexConsequent],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(true);
	});

	it("should return false when implications have same antecedents but different consequents", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["P"] }, // Same antecedent twice
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["S"] }, // Different consequent
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false when disjunction values is not an array", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: "invalid" as unknown as PropFormula[], // Not an array
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false when implication values is not an array", () => {
		const formula1: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: "invalid" as unknown as PropFormula[], // Not an array
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["Q"] },
				{ operator: Operator.Var, values: ["R"] },
			],
		};

		expect(
			isDisjunctionEliminationApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});
});
