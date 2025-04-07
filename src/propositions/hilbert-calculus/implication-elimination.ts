import { PropFormula } from '../../types';
import { isImplicationEliminationApplicable } from '../checks/is-implication-elimination-applicable';
import { Operator } from '../../enums';

/**
 * Applies the rule of Implication Elimination (Modus Ponens).
 *
 * Given an implication (A => B) and its antecedent A,
 * it derives the consequent B.
 *
 * @param formulas - An array of propositional formulas.
 * @returns The consequent of the implication if the rule is applicable.
 * @throws {Error} if implication elimination is not applicable.
 */
export function implicationElimination(formulas: PropFormula[]): PropFormula {
  if (!isImplicationEliminationApplicable(formulas)) {
    throw new Error('Implication elimination is not applicable to the given formulas.');
  }

  // Find the implication formula (A => B)
  const implicationFormula = formulas.find((f) => f.operator === Operator.Implies);

  // The consequent of the implication (second value in values array)
  return implicationFormula.values[1] as PropFormula;
}
