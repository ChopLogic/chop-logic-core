import type { PropFormula } from "../../models";

/**
 * Checks if conjunction introduction rule is applicable.
 *
 * Conjunction introduction allows us to infer a conjunction from any two conjuncts.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all there are exactly two formulas in the array, otherwise `false`.
 * @category Validators
 */
export function isConjunctionIntroductionApplicable(
	formulas: PropFormula[],
): boolean {
	return formulas.length === 2;
}
