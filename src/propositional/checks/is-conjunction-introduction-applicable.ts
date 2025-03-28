import { PropFormula } from '../../common/types';

/**
 * Checks if conjunction creation is applicable.
 *
 * Conjunction creation allows us to infer a conjunction from any two conjuncts.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all there are exactly two formulas in the array, otherwise `false`.
 */
export function isConjunctionIntroductionApplicable(formulas: PropFormula[]): boolean {
  return formulas.length === 2;
}
