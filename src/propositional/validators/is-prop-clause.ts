import type { PropClause } from "../../models";
import { isPropLiteral } from "./is-prop-literal";

/**
 * Checks whether a value is a clause: an array of literals (`p` or `¬p`).
 * The empty array is a valid clause (the empty clause).
 *
 * @param clause - The clause to check.
 * @returns True if every element of the array is a literal, otherwise false.
 * @category Validators
 *
 * @example
 * isPropClause([p, { operator: Operator.Not, values: [q] }]); // true
 * isPropClause([]); // true
 * isPropClause([{ operator: Operator.And, values: [p, q] }]); // false
 */
export function isPropClause(clause: PropClause): boolean {
	return Array.isArray(clause) && clause.every(isPropLiteral);
}
