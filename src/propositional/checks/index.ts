import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';
import { isImplicationEliminationApplicable } from './is-implication-elimination-applicable';
import { isDisjunctionEliminationApplicable } from './is-disjunction-elimination-applicable';
import { isConjunctionEliminationApplicable } from './is-conjunction-elimination-applicable';
import { isEquivalenceEliminationApplicable } from './is-equivalence-elimination-applicable';
import { isNegationEliminationApplicable } from './is-negation-elimination-applicable';
import { isDisjunctionCreationApplicable } from './is-dusjunction-creation-applicable';
import { isConjunctionCreationApplicable } from './is-conjunction-creation-applicable';
import { isEquivalenceCreationApplicable } from './is-equivalence-creation-applicable';
import { isNegationCreationApplicable } from './is-negation-creation-applicable';
import { PropFormula } from '../../common/types';
import { PropFormulaCheck } from '../../common/enums';

type PropFormulaCheckFunction = (formulas: PropFormula[]) => boolean;

const PROP_FORMULA_CHECKS: Record<PropFormulaCheck, PropFormulaCheckFunction> = {
  [PropFormulaCheck.areEqual]: arePropFormulasStructurallyEqual,
  // Elimination rules
  [PropFormulaCheck.isIE]: isImplicationEliminationApplicable,
  [PropFormulaCheck.isDE]: isDisjunctionEliminationApplicable,
  [PropFormulaCheck.isCE]: isConjunctionEliminationApplicable,
  [PropFormulaCheck.isEE]: isEquivalenceEliminationApplicable,
  [PropFormulaCheck.isNE]: isNegationEliminationApplicable,
  // Creation rules
  [PropFormulaCheck.isDC]: isDisjunctionCreationApplicable,
  [PropFormulaCheck.isCC]: isConjunctionCreationApplicable,
  [PropFormulaCheck.isEC]: isEquivalenceCreationApplicable,
  [PropFormulaCheck.isNC]: isNegationCreationApplicable,
};

/**
 * Applies a series of propositional formula checks to an array of formulas.
 *
 * @param formulas - An array of propositional formulas to check.
 * @param checks - An array of check names to apply (defaults to all available checks).
 * @returns An object mapping each check name to its boolean result.
 */
export function applyPropFormulaChecks(
  formulas: PropFormula[],
  checks: PropFormulaCheck[] = Object.keys(PropFormulaCheck) as PropFormulaCheck[],
): Record<string, boolean> {
  return checks.reduce<Record<string, boolean>>((results, checkName) => {
    const checkFunction = PROP_FORMULA_CHECKS[checkName];
    results[checkName] = checkFunction ? checkFunction(formulas) : false;
    return results;
  }, {});
}
