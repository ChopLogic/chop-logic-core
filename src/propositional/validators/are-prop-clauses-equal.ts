import type { PropClause, PropLiteral } from "../../models";
import { arePropFormulasStructurallyEqual } from "./are-prop-formulas-structurally-equal";
import { isPropClause } from "./is-prop-clause";

const containsLiteral = (clause: PropClause, literal: PropLiteral): boolean =>
	clause.some((other) => arePropFormulasStructurallyEqual([other, literal]));

/**
 * Checks whether clauses are equal as sets of literals.
 * The order of literals and duplicate literals are ignored, since a clause is a set.
 *
 * @param clauses - An array of clauses to compare.
 * @returns True if every clause contains exactly the same literals, otherwise false.
 * Returns false for an empty array or if any item is not a clause.
 * @category Validators
 *
 * @example
 * arePropClausesEqual([[p, notQ], [notQ, p]]); // true
 * arePropClausesEqual([[p, p], [p]]); // true
 * arePropClausesEqual([[p], [p, q]]); // false
 */
export function arePropClausesEqual(clauses: PropClause[]): boolean {
	if (!clauses.length || !clauses.every(isPropClause)) return false;

	const [first, ...rest] = clauses;

	return rest.every(
		(clause) =>
			clause.every((literal) => containsLiteral(first, literal)) &&
			first.every((literal) => containsLiteral(clause, literal)),
	);
}
