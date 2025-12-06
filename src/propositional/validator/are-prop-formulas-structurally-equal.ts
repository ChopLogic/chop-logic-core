import type { PropFormula } from "../../models";

/**
 * Checks whether two propositional formulas are structurally equivalent.
 * Two formulas are considered structurally equivalent if they have the exact same structure,
 * operators, and variable names in the same positions.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns True if the formulas are structurally equivalent, otherwise false.
 */
export function arePropFormulasStructurallyEqual(
	formulas: PropFormula[],
): boolean {
	if (!formulas.length) return false;

	const strings = formulas.map((formula) => JSON.stringify(formula));

	return strings.every((item) => item === strings[0]);
}
