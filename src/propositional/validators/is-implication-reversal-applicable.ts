import { Operator } from "../../enums";
import type { PropFormula } from "../../models";

/**
 * Checks if implication reversal is applicable to a formula.
 *
 * A formula satisfies the implication reversal schema if it has the form:
 * ¬F => ¬G, where F and G are arbitrary propositional formulas.
 *
 * @param formula - The propositional formula to check.
 * @returns True if the formula matches the schema ¬F => ¬G, false otherwise.
 * @category Validators
 */
function isImplicationReversalSchema(formula: PropFormula): boolean {
	// Check if formula is ¬F => ¬G
	// The outer operator must be an implication
	if (formula.operator !== Operator.Implies) {
		return false;
	}

	// The values must be an array with exactly 2 elements
	if (!Array.isArray(formula.values) || formula.values.length !== 2) {
		return false;
	}

	const antecedent = formula.values[0];
	const consequent = formula.values[1];

	// Both antecedent and consequent must be negations (¬F and ¬G)
	if (
		!Array.isArray(antecedent.values) ||
		antecedent.operator !== Operator.Not ||
		antecedent.values.length !== 1
	) {
		return false;
	}

	if (
		!Array.isArray(consequent.values) ||
		consequent.operator !== Operator.Not ||
		consequent.values.length !== 1
	) {
		return false;
	}

	return true;
}

/**
 * Checks if implication reversal is applicable to all formulas in the array.
 *
 * Each formula in the input array must satisfy the schema ¬F => ¬G.
 * If all formulas match the schema, reversal can be applied to each.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns True if all formulas match the reversal schema, false otherwise.
 * @category Validators
 */
export function isImplicationReversalApplicable(
	formulas: PropFormula[],
): boolean {
	// At least one formula is required
	if (formulas.length === 0) {
		return false;
	}

	// All formulas must satisfy the implication reversal schema
	return formulas.every(isImplicationReversalSchema);
}
