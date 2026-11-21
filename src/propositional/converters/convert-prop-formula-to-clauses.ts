import { Operator } from "../../enums";
import type { PropClause, PropFormula } from "../../models";
import { convertPropFormulaToCNF } from "./convert-prop-formula-to-cnf";
import { getPropLiteralKey } from "./get-prop-literal-key";

function collect(node: PropFormula, operator: Operator): PropFormula[] {
	if (node.operator !== operator) return [node];
	return (node.values as PropFormula[]).flatMap((value) =>
		collect(value, operator),
	);
}

/**
 * Converts an arbitrary propositional formula to an equivalent set of clauses
 * (the full clausal form conversion: Implications, Negations, Distribution, Operators).
 *
 * The formula is converted with {@link convertPropFormulaToCNF}, then nested conjunctions are
 * flattened into a list of clauses and nested disjunctions into a list of literals:
 * - `φ1 ∨ ... ∨ φn` → `{φ1, ..., φn}`
 * - `φ1 ∧ ... ∧ φn` → `{φ1}, ..., {φn}`
 *
 * Since clauses are sets, duplicate literals within a clause and duplicate clauses (regardless of
 * literal order) are removed; the first occurrence order is preserved. Tautological clauses such as
 * `{p, ¬p}` are kept.
 *
 * A formula equivalent to a tautology yields no clauses (`[]`); a formula equivalent to a
 * contradiction by constant folding yields the empty clause (`[[]]`).
 * The input formula is not mutated.
 *
 * @param formula - The propositional formula to convert.
 * @returns The list of clauses; each clause is a list of literals (`p` or `¬p`).
 * @throws {Error} If the formula contains an unknown operator.
 * @category Converters
 *
 * @example
 * // ¬(g ∧ (r ⇒ f))  is converted to  [[¬g, r], [¬g, ¬f]]
 * convertPropFormulaToClauses({
 *   operator: Operator.Not,
 *   values: [{ operator: Operator.And, values: [g, { operator: Operator.Implies, values: [r, f] }] }],
 * });
 */
export function convertPropFormulaToClauses(
	formula: PropFormula,
): PropClause[] {
	const cnf = convertPropFormulaToCNF(formula);

	if (cnf.operator === Operator.Tautology) return [];
	if (cnf.operator === Operator.Contradiction) return [[]];

	const clauses: PropClause[] = [];
	const clauseKeys = new Set<string>();

	for (const conjunct of collect(cnf, Operator.And)) {
		const clause: PropClause = [];
		const literalKeys = new Set<string>();

		for (const literal of collect(conjunct, Operator.Or)) {
			const key = getPropLiteralKey(literal);
			if (literalKeys.has(key)) continue;
			literalKeys.add(key);
			clause.push(literal);
		}

		const clauseKey = JSON.stringify(
			Array.from(literalKeys).sort((a, b) => a.localeCompare(b)),
		);
		if (clauseKeys.has(clauseKey)) continue;
		clauseKeys.add(clauseKey);
		clauses.push(clause);
	}

	return clauses;
}
