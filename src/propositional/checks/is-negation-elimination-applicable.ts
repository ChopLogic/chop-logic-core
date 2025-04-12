import { PropFormula } from '../../models';
import { Operator } from '../../enums';

/**
 * Checks if negation elimination is applicable to all given formulas.
 *
 * Negation elimination states that if we have a double negation, we can remove it.
 * This function verifies whether each formula in the array has exactly two negations at the top level.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all formulas contain exactly two negations, otherwise `false`.
 */
export function isNegationEliminationApplicable(formulas: PropFormula[]): boolean {
  if (formulas.length === 0) {
    return false;
  }

  return formulas.every(
    (formula) =>
      formula.operator === Operator.Not &&
      Array.isArray(formula.values) &&
      formula.values.length === 1 &&
      (formula.values[0] as PropFormula).operator === Operator.Not,
  );
}
