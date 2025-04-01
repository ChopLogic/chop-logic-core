import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Applies the implication introduction rule.
 *
 * Given two formulas premise and conclusion, it returns their implication
 *
 * @param premise - The antecedent of the implication.
 * @param conclusion - The consequent of the implication.
 * @returns An array containing the new implication formula.
 */
export function implicationIntroduction(premise: PropFormula, conclusion: PropFormula): PropFormula[] {
  return [{ operator: Operator.Implies, values: [premise, conclusion] }];
}
