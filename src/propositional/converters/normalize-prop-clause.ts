import type { PropClause } from "../../models";
import { getPropLiteralKey } from "./get-prop-literal-key";

/**
 * Removes duplicate literals from a clause, since clauses are sets.
 * The order of first occurrences is preserved. The input clause is not mutated.
 *
 * @param clause - A clause (a list of literals `p` or `¬p`).
 * @returns A new clause without duplicate literals.
 * @category Converters
 *
 * @example
 * // {p, ¬q, p}  is normalized to  {p, ¬q}
 * normalizePropClause([p, { operator: Operator.Not, values: [q] }, p]);
 */
export function normalizePropClause(clause: PropClause): PropClause {
	const keys = new Set<string>();

	return clause.filter((literal) => {
		const key = getPropLiteralKey(literal);
		if (keys.has(key)) return false;
		keys.add(key);
		return true;
	});
}
