import { PropFormula } from '../../models';
import { isNegationEliminationApplicable } from '../checks/is-negation-elimination-applicable';

/**
 * Applies negation elimination rule:
 * If ~(~A), then we can infer ~A.
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula]} A tuple containing the inferred formula.
 * @throws {Error} if negation introduction rule is not applicable.
 */
export function negationElimination(formulas: PropFormula[]): [PropFormula] {
  if (!isNegationEliminationApplicable(formulas)) {
    throw new Error('Negation elimination is not applicable to the given formulas.');
  }

  const firstNegationFormula = formulas[0];
  const secondNegationFormula = firstNegationFormula.values[0] as PropFormula;

  return [secondNegationFormula.values[0] as PropFormula];
}
