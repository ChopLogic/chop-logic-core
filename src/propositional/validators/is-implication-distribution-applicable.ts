import { Operator } from "../../enums";
import type { PropFormula } from "../../models";

/**
 * Checks if implication distribution is applicable to a formula.
 *
 * A formula satisfies the implication distribution schema if it has the form:
 * F => (G => H), where F, G, and H are arbitrary propositional formulas.
 *
 * @param formula - The propositional formula to check.
 * @returns True if the formula matches the schema F => (G => H), false otherwise.
 * @category Validators
 */
function isImplicationDistributionSchema(formula: PropFormula): boolean {
	// Check if formula is F => (G => H)
	// The outer operator must be an implication
	if (formula.operator !== Operator.Implies) {
		return false;
	}

	// The values must be an array with exactly 2 elements
	if (!Array.isArray(formula.values) || formula.values.length !== 2) {
		return false;
	}

	// The second element (consequent) must be an implication (G => H)
	const consequent = formula.values[1];
	if (
		!Array.isArray(consequent.values) ||
		consequent.operator !== Operator.Implies ||
		consequent.values.length !== 2
	) {
		return false;
	}

	return true;
}

/**
 * Checks if implication distribution is applicable to all formulas in the array.
 *
 * Each formula in the input array must satisfy the schema F => (G => H).
 * If all formulas match the schema, distribution can be applied to each.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns True if all formulas match the distribution schema, false otherwise.
 * @category Validators
 */
export function isImplicationDistributionApplicable(
	formulas: PropFormula[],
): boolean {
	// At least one formula is required
	if (formulas.length === 0) {
		return false;
	}

	// All formulas must satisfy the implication distribution schema
	return formulas.every(isImplicationDistributionSchema);
}
