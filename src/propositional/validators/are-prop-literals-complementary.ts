import { Operator } from "../../enums";
import type { PropFormula, PropLiteral } from "../../models";
import { isPropLiteral } from "./is-prop-literal";

function getVariableName(literal: PropLiteral): unknown {
	if (literal.operator === Operator.Var) return literal.values[0];
	return (literal.values[0] as PropFormula).values[0];
}

/**
 * Checks whether two literals form a complementary pair: a variable and its negation (`p` and `¬p`),
 * in either order.
 *
 * @param literals - An array of exactly two literals.
 * @returns True if the literals are complementary, otherwise false.
 * @category Validators
 *
 * @example
 * arePropLiteralsComplementary([p, { operator: Operator.Not, values: [p] }]); // true
 * arePropLiteralsComplementary([p, { operator: Operator.Not, values: [q] }]); // false
 */
export function arePropLiteralsComplementary(literals: PropLiteral[]): boolean {
	if (literals.length !== 2) return false;

	const [first, second] = literals;

	if (!isPropLiteral(first) || !isPropLiteral(second)) return false;

	const firstNegated = first.operator === Operator.Not;
	const secondNegated = second.operator === Operator.Not;

	if (firstNegated === secondNegated) return false;

	return getVariableName(first) === getVariableName(second);
}
