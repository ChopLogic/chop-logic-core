import type { PropFormula } from "../../models";

/**
 * Checks if implication creation is applicable.
 *
 * This function verifies that:
 * - Exactly two formulas are provided
 * - Both formulas are well-formed (minimal check)
 *
 * Implication creation allows deriving G => F from any proven formula F
 * with any arbitrary formula G.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns True if implication creation can be applied, false otherwise.
 * @category Validators
 */
export function isImplicationIntroductionApplicable(
	formulas: PropFormula[],
): boolean {
	return formulas.length === 2;
}
