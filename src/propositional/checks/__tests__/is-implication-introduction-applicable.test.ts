import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationIntroductionApplicable } from "../is-implication-introduction-applicable";

describe("isImplicationIntroductionApplicable", () => {
	it("should return false when one formula is provided", () => {
		const formula: PropFormula = { operator: Operator.Var, values: ["P"] };

		expect(isImplicationIntroductionApplicable([formula])).toBe(false);
	});

	it("should return false when no formulas are provided", () => {
		expect(isImplicationIntroductionApplicable([])).toBe(false);
	});

	it("should return true when two formulas are provided", () => {
		const formula1: PropFormula = { operator: Operator.Var, values: ["P"] };
		const formula2: PropFormula = { operator: Operator.Var, values: ["Q"] };

		expect(isImplicationIntroductionApplicable([formula1, formula2])).toBe(
			true,
		);
	});
});
