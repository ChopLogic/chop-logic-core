import { PropFormula } from '../../types';
import { isDisjunctionEliminationApplicable } from '../checks/is-disjunction-elimination-applicable';
import { Operator } from '../../enums';

/**
 * Applies the disjunction elimination rule:
 * Given formulas (A ∨ B), (A => C), and (B => C), we can infer C.
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula]} A tuple containing the inferred formula.
 * @throws {Error} if the formulas do not satisfy disjunction elimination conditions.
 */
export function disjunctionElimination(formulas: PropFormula[]): [PropFormula] {
  if (!isDisjunctionEliminationApplicable(formulas)) {
    throw new Error('Disjunction elimination is not applicable to the given formulas.');
  }

  // Extract the consequent from one of the implications
  const implication1 = formulas.find((formula) => formula.operator === Operator.Implies);

  return [implication1.values[1] as PropFormula];
}
