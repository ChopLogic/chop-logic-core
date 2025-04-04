import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { isImplicationIntroductionApplicable } from '../checks/is-implication-introduction-applicable';

/**
 * Applies the implication introduction rule.
 *
 * Given two formulas premise and conclusion, it returns their implication
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula]} A tuple containing the inferred formula.
 * @throws {Error} if the formulas do not satisfy disjunction introduction conditions.
 */
export function implicationIntroduction(formulas: PropFormula[]): [PropFormula] {
  if (!isImplicationIntroductionApplicable(formulas)) {
    throw new Error('Implication introduction is not applicable to the given formulas.');
  }

  const [premise, conclusion] = formulas;

  return [{ operator: Operator.Implies, values: [premise, conclusion] }];
}
