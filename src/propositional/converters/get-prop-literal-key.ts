import { Operator } from "../../enums";
import type { PropFormula, PropLiteral } from "../../models";

/**
 * Builds a key from the literal's polarity and variable name, so it doesn't depend on
 * the order of object properties. Two literals are equal if and only if their keys are equal.
 *
 * @internal
 * @param literal - A literal (`p` or `¬p`).
 * @returns A string key identifying the literal.
 */
export function getPropLiteralKey(literal: PropLiteral): string {
	const isNegated = literal.operator === Operator.Not;
	const atom = isNegated ? (literal.values[0] as PropFormula) : literal;
	return JSON.stringify([isNegated, atom.values[0]]);
}
