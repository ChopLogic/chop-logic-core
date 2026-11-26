import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { isPropAtom } from "./is-prop-atom";

const hasOperator = (
	value: unknown,
	operator: Operator,
): value is { operator: Operator; values: unknown } =>
	typeof value === "object" &&
	value !== null &&
	"operator" in value &&
	value.operator === operator &&
	"values" in value;

const isPropVariable = (value: unknown): boolean =>
	hasOperator(value, Operator.Var) && isPropAtom(value.values);

/**
 * Checks whether a formula is a literal: a propositional variable or the negation of a variable.
 * A variable must hold exactly one atom (`values: ["p"]`); a negation must hold exactly one variable.
 *
 * The check is null-safe: malformed input, including `null` or `undefined` formulas and operands,
 * returns false instead of throwing.
 *
 * @param formula - The formula to check.
 * @returns True if the formula is `p` or `¬p` for some variable `p`, otherwise false.
 * @category Validators
 *
 * @example
 * isPropLiteral({ operator: Operator.Var, values: ["p"] }); // true
 * isPropLiteral({ operator: Operator.Not, values: [{ operator: Operator.Var, values: ["p"] }] }); // true
 * isPropLiteral({ operator: Operator.Not, values: [{ operator: Operator.Not, values: [p] }] }); // false
 * isPropLiteral({ operator: Operator.Var, values: [] }); // false
 */
export function isPropLiteral(formula: PropFormula): boolean {
	if (isPropVariable(formula)) return true;

	return (
		hasOperator(formula, Operator.Not) &&
		Array.isArray(formula.values) &&
		formula.values.length === 1 &&
		isPropVariable(formula.values[0])
	);
}
