import { arePropFormulasStructurallyEqual } from "../are-prop-formulas-structurally-equal";
import { arePropLiteralsComplementary } from "../are-prop-literals-complementary";
import * as validators from "../index";
import { isConjunctionEliminationApplicable } from "../is-conjunction-elimination-applicable";
import { isConjunctionIntroductionApplicable } from "../is-conjunction-introduction-applicable";
import { isDisjunctionEliminationApplicable } from "../is-disjunction-elimination-applicable";
import { isDisjunctionIntroductionApplicable } from "../is-disjunction-introduction-applicable";
import { isEquivalenceEliminationApplicable } from "../is-equivalence-elimination-applicable";
import { isEquivalenceIntroductionApplicable } from "../is-equivalence-introduction-applicable";
import { isImplicationEliminationApplicable } from "../is-implication-elimination-applicable";
import { isImplicationIntroductionApplicable } from "../is-implication-introduction-applicable";
import { isNegationEliminationApplicable } from "../is-negation-elimination-applicable";
import { isNegationIntroductionApplicable } from "../is-negation-introduction-applicable";
import { isPropAtom } from "../is-prop-atom";
import { isPropClause } from "../is-prop-clause";
import { isPropLiteral } from "../is-prop-literal";
import { isResolutionApplicable } from "../is-resolution-applicable";
import { isWellFormedFormula } from "../is-well-formed-formula";
import { validatePropFormulas } from "../validate-prop-formulas";

describe("Validators index file", () => {
	it("should have all expected functions available", () => {
		expect(typeof validators.arePropFormulasStructurallyEqual).toBe("function");
		expect(validators.arePropFormulasStructurallyEqual).toBe(
			arePropFormulasStructurallyEqual,
		);

		expect(typeof validators.isConjunctionEliminationApplicable).toBe(
			"function",
		);
		expect(validators.isConjunctionEliminationApplicable).toBe(
			isConjunctionEliminationApplicable,
		);

		expect(typeof validators.isConjunctionIntroductionApplicable).toBe(
			"function",
		);
		expect(validators.isConjunctionIntroductionApplicable).toBe(
			isConjunctionIntroductionApplicable,
		);

		expect(typeof validators.isDisjunctionEliminationApplicable).toBe(
			"function",
		);
		expect(validators.isDisjunctionEliminationApplicable).toBe(
			isDisjunctionEliminationApplicable,
		);

		expect(typeof validators.isDisjunctionIntroductionApplicable).toBe(
			"function",
		);
		expect(validators.isDisjunctionIntroductionApplicable).toBe(
			isDisjunctionIntroductionApplicable,
		);

		expect(typeof validators.isEquivalenceEliminationApplicable).toBe(
			"function",
		);
		expect(validators.isEquivalenceEliminationApplicable).toBe(
			isEquivalenceEliminationApplicable,
		);

		expect(typeof validators.isEquivalenceIntroductionApplicable).toBe(
			"function",
		);
		expect(validators.isEquivalenceIntroductionApplicable).toBe(
			isEquivalenceIntroductionApplicable,
		);

		expect(typeof validators.isImplicationEliminationApplicable).toBe(
			"function",
		);
		expect(validators.isImplicationEliminationApplicable).toBe(
			isImplicationEliminationApplicable,
		);

		expect(typeof validators.isImplicationIntroductionApplicable).toBe(
			"function",
		);
		expect(validators.isImplicationIntroductionApplicable).toBe(
			isImplicationIntroductionApplicable,
		);

		expect(typeof validators.isNegationEliminationApplicable).toBe("function");
		expect(validators.isNegationEliminationApplicable).toBe(
			isNegationEliminationApplicable,
		);

		expect(typeof validators.isNegationIntroductionApplicable).toBe("function");
		expect(validators.isNegationIntroductionApplicable).toBe(
			isNegationIntroductionApplicable,
		);

		expect(typeof validators.validatePropFormulas).toBe("function");
		expect(validators.validatePropFormulas).toBe(validatePropFormulas);

		expect(typeof validators.isWellFormedFormula).toBe("function");
		expect(validators.isWellFormedFormula).toBe(isWellFormedFormula);

		expect(typeof validators.isPropAtom).toBe("function");
		expect(validators.isPropAtom).toBe(isPropAtom);

		expect(typeof validators.isPropLiteral).toBe("function");
		expect(validators.isPropLiteral).toBe(isPropLiteral);
	});

	it("should export the resolution validators", () => {
		expect(validators.isPropClause).toBe(isPropClause);
		expect(validators.arePropLiteralsComplementary).toBe(
			arePropLiteralsComplementary,
		);
		expect(validators.isResolutionApplicable).toBe(isResolutionApplicable);
	});
});
