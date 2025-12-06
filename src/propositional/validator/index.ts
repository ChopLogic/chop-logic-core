import { PropFormulaCheck } from "../../enums";
import type { PropFormula } from "../../models";
import { arePropFormulasStructurallyEqual } from "./are-prop-formulas-structurally-equal";
import { isConjunctionEliminationApplicable } from "./is-conjunction-elimination-applicable";
import { isConjunctionIntroductionApplicable } from "./is-conjunction-introduction-applicable";
import { isDisjunctionEliminationApplicable } from "./is-disjunction-elimination-applicable";
import { isDisjunctionIntroductionApplicable } from "./is-disjunction-introduction-applicable";
import { isEquivalenceEliminationApplicable } from "./is-equivalence-elimination-applicable";
import { isEquivalenceIntroductionApplicable } from "./is-equivalence-introduction-applicable";
import { isImplicationEliminationApplicable } from "./is-implication-elimination-applicable";
import { isImplicationIntroductionApplicable } from "./is-implication-introduction-applicable";
import { isNegationEliminationApplicable } from "./is-negation-elimination-applicable";
import { isNegationIntroductionApplicable } from "./is-negation-introduction-applicable";

type PropFormulaCheckFunction = (formulas: PropFormula[]) => boolean;

const PROP_FORMULA_CHECKS: Record<PropFormulaCheck, PropFormulaCheckFunction> =
	{
		[PropFormulaCheck.areEqual]: arePropFormulasStructurallyEqual,
		// Elimination rules
		[PropFormulaCheck.isIE]: isImplicationEliminationApplicable,
		[PropFormulaCheck.isDE]: isDisjunctionEliminationApplicable,
		[PropFormulaCheck.isCE]: isConjunctionEliminationApplicable,
		[PropFormulaCheck.isEE]: isEquivalenceEliminationApplicable,
		[PropFormulaCheck.isNE]: isNegationEliminationApplicable,
		// Introduction rules
		[PropFormulaCheck.isDI]: isDisjunctionIntroductionApplicable,
		[PropFormulaCheck.isCI]: isConjunctionIntroductionApplicable,
		[PropFormulaCheck.isEI]: isEquivalenceIntroductionApplicable,
		[PropFormulaCheck.isNI]: isNegationIntroductionApplicable,
		[PropFormulaCheck.isII]: isImplicationIntroductionApplicable,
	};

/**
 * Applies a series of propositional formula checks to an array of formulas.
 *
 * @param formulas - An array of propositional formulas to check.
 * @param checks - An array of check names to apply (defaults to all available checks).
 * @returns An object mapping each check name to its boolean result.
 * @category Utilities
 */
export function validatePropFormulas(
	formulas: PropFormula[],
	checks: PropFormulaCheck[] = Object.keys(
		PropFormulaCheck,
	) as PropFormulaCheck[],
): Record<PropFormulaCheck, boolean> {
	return checks.reduce<Record<string, boolean>>((results, checkName) => {
		const checkFunction = PROP_FORMULA_CHECKS[checkName];
		results[checkName] = checkFunction ? checkFunction(formulas) : false;
		return results;
	}, {});
}
