import { PropFormula } from '../../common/types';

/**
 * Checks if disjunction introduction is applicable.
 *
 * Disjunction introduction allows us to infer a disjunction from any two formulas as disjuncts.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all there is exactly two formulas in the array, otherwise `false`.
 */
export function isDisjunctionIntroductionApplicable(formulas: PropFormula[]): boolean {
  return formulas.length === 2;
}
