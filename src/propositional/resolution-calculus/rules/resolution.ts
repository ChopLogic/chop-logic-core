import type { PropClause } from "../../../models";
import { normalizePropClause } from "../../converters/normalize-prop-clause";
import { arePropLiteralsComplementary } from "../../validators/are-prop-literals-complementary";
import { isResolutionApplicable } from "../../validators/is-resolution-applicable";

/**
 * Applies the Resolution Principle (Propositional Resolution).
 *
 * Given a clause containing a literal `χ` and another clause containing `¬χ`, it derives the clause
 * consisting of all the literals of both clauses without the complementary pair:
 * `{φ1, ..., χ, ..., φm}` and `{ψ1, ..., ¬χ, ..., ψn}` derive `{φ1, ..., φm, ψ1, ..., ψn}`.
 *
 * Only one complementary pair is resolved at a time. When the clauses contain several complementary
 * pairs, one resolvent is returned for each pair, in the order the pairs occur in the first clause.
 * Clauses are sets: duplicate literals in the input clauses and in each resolvent are merged, so
 * every complementary pair is resolved exactly once (`{p, p}` and `{¬p}` derive only `{}`).
 * The order of first occurrences is preserved. The input clauses are not mutated.
 *
 * @param clauses - An array of exactly two clauses.
 * @returns The list of resolvents (the empty clause `[]` means a contradiction was derived).
 * @throws {Error} if resolution is not applicable.
 *
 * @example
 * // {p, q} and {¬q, r} derive {p, r}
 * resolutionRule([[p, q], [{ operator: Operator.Not, values: [q] }, r]]); // [[p, r]]
 */
export function resolutionRule(clauses: PropClause[]): PropClause[] {
	if (!isResolutionApplicable(clauses)) {
		throw new Error("Resolution is not applicable to the given clauses.");
	}

	const [first, second] = clauses.map(normalizePropClause);
	const resolvents: PropClause[] = [];

	first.forEach((literal, i) => {
		second.forEach((other, j) => {
			if (!arePropLiteralsComplementary([literal, other])) return;

			resolvents.push(
				normalizePropClause([
					...first.filter((_, index) => index !== i),
					...second.filter((_, index) => index !== j),
				]),
			);
		});
	});

	return resolvents;
}
