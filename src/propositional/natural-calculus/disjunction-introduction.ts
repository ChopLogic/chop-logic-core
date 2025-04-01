import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Applies the disjunction introduction rule.
 *
 * Given two formulas A and B, it returns two disjunctions:
 * - (A ∨ B)
 * - (B ∨ A)
 *
 * @param disjunct1 - The first disjunct formula.
 * @param disjunct2 - The second disjunct formula.
 * @returns An array containing the two valid disjunctions.
 */
export function disjunctionIntroduction(disjunct1: PropFormula, disjunct2: PropFormula): PropFormula[] {
  return [
    { operator: Operator.Or, values: [disjunct1, disjunct2] },
    { operator: Operator.Or, values: [disjunct2, disjunct1] },
  ];
}
