import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { arePropFormulasStructurallyEqual } from "./are-prop-formulas-structurally-equal";

/**
 * Checks if implication elimination (modus ponens) is applicable to two given formulas.
 *
 * This function verifies that:
 * - Exactly two formulas in the input array
 * - One of the formulas is an implication.
 * - The other formula is structurally equal to the antecedent of the implication.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns True if implication elimination can be applied, false otherwise.
 * @category Validators
 */
export function isImplicationEliminationApplicable(
	formulas: PropFormula[],
): boolean {
	if (formulas.length !== 2) return false;
	const [formula1, formula2] = formulas;

	const checkImplication = (
		implication: PropFormula,
		antecedent: PropFormula,
	) =>
		implication.operator === Operator.Implies &&
		Array.isArray(implication.values) &&
		implication.values.length === 2 &&
		arePropFormulasStructurallyEqual([implication.values[0], antecedent]);

	return (
		checkImplication(formula1, formula2) || checkImplication(formula2, formula1)
	);
}
