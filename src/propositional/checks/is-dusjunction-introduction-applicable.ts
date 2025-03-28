import { PropFormula } from '../../common/types';

/**
 * Checks if disjunction creation is applicable.
 *
 * Disjunction creation allows us to infer a disjunction from any single formula as a disjunct.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all there is exactly one formula in the array, otherwise `false`.
 */
export function isDisjunctionIntroductionApplicable(formulas: PropFormula[]): boolean {
  return formulas.length === 1;
}
