import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationIntroductionApplicable } from "../is-implication-introduction-applicable";

describe("isImplicationIntroductionApplicable", () => {
	it("should return true for exactly two formulas", () => {
		const formula1: PropFormula = { operator: Operator.Var, values: ["P"] };
		const formula2: PropFormula = { operator: Operator.Var, values: ["Q"] };
		expect(isImplicationIntroductionApplicable([formula1, formula2])).toBe(
			true,
		);
	});

	it("should return true for complex formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};
		const formula2: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["R"] },
				{ operator: Operator.Var, values: ["S"] },
			],
		};
		expect(isImplicationIntroductionApplicable([formula1, formula2])).toBe(
			true,
		);
	});

	it("should return true for nested implication formulas", () => {
		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};
		const formula2: PropFormula = { operator: Operator.Var, values: ["R"] };
		expect(isImplicationIntroductionApplicable([formula1, formula2])).toBe(
			true,
		);
	});

	it("should return false if no formulas are provided", () => {
		expect(isImplicationIntroductionApplicable([])).toBe(false);
	});

	it("should return false if only one formula is provided", () => {
		const formula1: PropFormula = { operator: Operator.Var, values: ["P"] };
		expect(isImplicationIntroductionApplicable([formula1])).toBe(false);
	});

	it("should return false if more than two formulas are provided", () => {
		const formula1: PropFormula = { operator: Operator.Var, values: ["P"] };
		const formula2: PropFormula = { operator: Operator.Var, values: ["Q"] };
		const formula3: PropFormula = { operator: Operator.Var, values: ["R"] };
		expect(
			isImplicationIntroductionApplicable([formula1, formula2, formula3]),
		).toBe(false);
	});

	it("should return false for four formulas", () => {
		const formula1: PropFormula = { operator: Operator.Var, values: ["P"] };
		const formula2: PropFormula = { operator: Operator.Var, values: ["Q"] };
		const formula3: PropFormula = { operator: Operator.Var, values: ["R"] };
		const formula4: PropFormula = { operator: Operator.Var, values: ["S"] };
		expect(
			isImplicationIntroductionApplicable([
				formula1,
				formula2,
				formula3,
				formula4,
			]),
		).toBe(false);
	});
});
