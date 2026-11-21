import type { PropClause } from "../../models";
import { arePropLiteralsComplementary } from "./are-prop-literals-complementary";
import { isPropClause } from "./is-prop-clause";

/**
 * Checks whether the Resolution Principle can be applied to the given clauses.
 * The rule is applicable to exactly two clauses that contain at least one complementary pair
 * of literals (`χ` in one clause and `¬χ` in the other).
 *
 * @param clauses - An array of clauses.
 * @returns True if resolution is applicable, otherwise false.
 * @category Validators
 *
 * @example
 * isResolutionApplicable([[p, q], [{ operator: Operator.Not, values: [q] }, r]]); // true
 * isResolutionApplicable([[p], [q]]); // false
 */
export function isResolutionApplicable(clauses: PropClause[]): boolean {
	if (clauses.length !== 2) return false;

	const [first, second] = clauses;

	if (!isPropClause(first) || !isPropClause(second)) return false;

	return first.some((literal) =>
		second.some((other) => arePropLiteralsComplementary([literal, other])),
	);
}
