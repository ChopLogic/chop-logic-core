import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isNegationIntroductionApplicable } from "../is-negation-introduction-applicable";

describe("isNegationIntroductionApplicable", () => {
	it("should return true for two implications with the same antecedent and negated consequents", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
	});

	it("should return true when negation is in the first formula", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
	});

	it("should return false if there are not exactly two formulas", () => {
		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		expect(isNegationIntroductionApplicable([formula])).toBe(false);
		expect(isNegationIntroductionApplicable([])).toBe(false);
	});

	it("should return false if at least one formula is not an implication", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.And, // Not an implication
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false if antecedents are not structurally equal", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["C"] }, // Different antecedent
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false if consequents are not exact negations of each other", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["C"] }, // Different variable, not a negation
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false if only one implication", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		expect(isNegationIntroductionApplicable([formula1])).toBe(false);
	});

	it("should return false with three formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["C"] },
			],
		};

		expect(
			isNegationIntroductionApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false with empty array", () => {
		expect(isNegationIntroductionApplicable([])).toBe(false);
	});

	it("should return false when neither formula is an implication", () => {
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

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false when implications have different antecedents", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["X"] }, // Different antecedent
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false when negation is not wrapping exactly the other consequent", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [
						{
							operator: Operator.And,
							values: [
								{ operator: Operator.Var, values: ["B"] },
								{ operator: Operator.Var, values: ["C"] },
							],
						},
					],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] }, // Only B, not (B & C)
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return true with complex antecedent", () => {
		const complexAntecedent: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [complexAntecedent, { operator: Operator.Var, values: ["C"] }],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				complexAntecedent,
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["C"] }],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
	});

	it("should return true with complex consequent", () => {
		const complexConsequent: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["B"] },
				{ operator: Operator.Var, values: ["C"] },
			],
		};

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [{ operator: Operator.Var, values: ["A"] }, complexConsequent],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [complexConsequent],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
	});

	it("should return false when negation has multiple levels but only wraps partially", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [
						{
							operator: Operator.Not,
							values: [{ operator: Operator.Var, values: ["B"] }],
						},
					],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		// ~~B is not considered the negation of B for this rule
		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should handle implications with implications as consequents", () => {
		const nestedConsequent: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["B"] },
				{ operator: Operator.Var, values: ["C"] },
			],
		};

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [{ operator: Operator.Var, values: ["A"] }, nestedConsequent],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [nestedConsequent],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
	});

	it("should return false when negation wraps more than just consequent", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		// Both have identical consequents, not negations of each other
		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false when first formula is neither implication nor has valid structure", () => {
		const formula1: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Implies,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
	});
});
