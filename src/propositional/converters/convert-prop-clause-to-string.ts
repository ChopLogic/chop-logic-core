import type { PropClause } from "../../models";
import { convertPropFormulaToString } from "./convert-prop-formula-to-string";

/**
 * Converts a clause into its set notation using Unicode logical symbols.
 *
 * @param clause - A clause (a list of literals `p` or `¬p`).
 * @returns The string representation of the clause, e.g. `{p, ¬q}`; the empty clause is `{}`.
 * @category Converters
 *
 * @example
 * convertPropClauseToString([p, { operator: Operator.Not, values: [q] }]); // "{p, ¬q}"
 * convertPropClauseToString([]); // "{}"
 */
export function convertPropClauseToString(clause: PropClause): string {
	return `{${clause.map(convertPropFormulaToString).join(", ")}}`;
}
