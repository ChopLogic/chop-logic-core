import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { arePropFormulasStructurallyEqual } from "../../validators/are-prop-formulas-structurally-equal";
import { isImplicationEliminationApplicable } from "../../validators/is-implication-elimination-applicable";

/**
 * Applies the rule of Implication Elimination (Modus Ponens).
 *
 * Given an implication (A => B) and its antecedent A,
 * it derives the consequent B.
 *
 * @param formulas - An array of propositional formulas.
 * @returns The consequent of the implication if the rule is applicable.
 * @throws {Error} if implication elimination is not applicable.
 */
export function implicationElimination(formulas: PropFormula[]): PropFormula {
	if (!isImplicationEliminationApplicable(formulas)) {
		throw new Error(
			"Implication elimination is not applicable to the given formulas.",
		);
	}

	const [formula1, formula2] = formulas;

	// Find the implication formula and its antecedent
	let implicationFormula: PropFormula | undefined;

	// Check if formula1 is an implication with formula2 as antecedent
	if (
		formula1.operator === Operator.Implies &&
		Array.isArray(formula1.values) &&
		formula1.values.length === 2 &&
		arePropFormulasStructurallyEqual([formula1.values[0], formula2])
	) {
		implicationFormula = formula1;
	}
	// Check if formula2 is an implication with formula1 as antecedent
	else if (
		formula2.operator === Operator.Implies &&
		Array.isArray(formula2.values) &&
		formula2.values.length === 2 &&
		arePropFormulasStructurallyEqual([formula2.values[0], formula1])
	) {
		implicationFormula = formula2;
	}

	// Return the consequent of the implication (second value in the array)
	return implicationFormula?.values[1] as PropFormula;
}
