import { Operator } from "../../enums";
import type { PropFormula } from "../../models";

/**
 * Checks whether a formula is a literal: a propositional variable or the negation of a variable.
 *
 * @param formula - The formula to check.
 * @returns True if the formula is `p` or `¬p` for some variable `p`, otherwise false.
 * @category Validators
 *
 * @example
 * isPropLiteral({ operator: Operator.Var, values: ["p"] }); // true
 * isPropLiteral({ operator: Operator.Not, values: [{ operator: Operator.Var, values: ["p"] }] }); // true
 * isPropLiteral({ operator: Operator.Not, values: [{ operator: Operator.Not, values: [p] }] }); // false
 */
export function isPropLiteral(formula: PropFormula): boolean {
	if (formula.operator === Operator.Var) return true;

	if (formula.operator !== Operator.Not || formula.values.length !== 1) {
		return false;
	}

	const operand = formula.values[0];

	return typeof operand === "object" && operand.operator === Operator.Var;
}
