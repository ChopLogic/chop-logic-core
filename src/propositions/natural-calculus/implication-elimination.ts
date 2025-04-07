import { PropFormula } from '../../types';
import { isImplicationEliminationApplicable } from '../checks/is-implication-elimination-applicable';
import { Operator } from '../../enums';

/**
 * Applies the rule of Implication Elimination.
 *
 * Given an implication (A => B) and its antecedent A,
 * it derives the consequent B.
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula]} A tuple containing the inferred formula.
 * @throws {Error} if implication elimination is not applicable.
 */
export function implicationElimination(formulas: PropFormula[]): [PropFormula] {
  if (!isImplicationEliminationApplicable(formulas)) {
    throw new Error('Implication elimination is not applicable to the given formulas.');
  }

  const implicationFormula = formulas.find((f) => f.operator === Operator.Implies);

  return [implicationFormula.values[1] as PropFormula];
}
