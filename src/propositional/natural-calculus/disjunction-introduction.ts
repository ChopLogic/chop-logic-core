import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { isDisjunctionIntroductionApplicable } from '../checks/is-dusjunction-introduction-applicable';

/**
 * Applies the disjunction introduction rule.
 *
 * Given two formulas A and B, it returns two disjunctions: (A ∨ B) and (B ∨ A)
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula, PropFormula]} A tuple containing the two inferred formulas.
 * @throws {Error} if the formulas do not satisfy disjunction introduction conditions.
 */
export function disjunctionIntroduction(formulas: PropFormula[]): [PropFormula, PropFormula] {
  if (!isDisjunctionIntroductionApplicable(formulas)) {
    throw new Error('Disjunction introduction is not applicable to the given formulas.');
  }

  const disjunct1 = formulas[0];
  const disjunct2 = formulas[1];

  return [
    { operator: Operator.Or, values: [disjunct1, disjunct2] },
    { operator: Operator.Or, values: [disjunct2, disjunct1] },
  ];
}
