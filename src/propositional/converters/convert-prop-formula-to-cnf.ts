import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { convertPropFormulaToNNF } from "./convert-prop-formula-to-nnf";

function distribute(left: PropFormula, right: PropFormula): PropFormula {
	if (left.operator === Operator.And) {
		const [a, b] = left.values as PropFormula[];
		return {
			operator: Operator.And,
			values: [distribute(a, right), distribute(b, right)],
		};
	}

	if (right.operator === Operator.And) {
		const [a, b] = right.values as PropFormula[];
		return {
			operator: Operator.And,
			values: [distribute(left, a), distribute(left, b)],
		};
	}

	return { operator: Operator.Or, values: [left, right] };
}

/**
 * Converts a propositional formula to conjunctive normal form (CNF).
 *
 * The formula is first converted with {@link convertPropFormulaToNNF}, then disjunction is
 * distributed over conjunction until no `And` occurs below an `Or`:
 * - `φ ∨ (ψ ∧ χ)` is equivalent to `(φ ∨ ψ) ∧ (φ ∨ χ)`
 * - `(φ ∧ ψ) ∨ χ` is equivalent to `(φ ∨ χ) ∧ (ψ ∨ χ)`
 *
 * The result stays a binary tree; flattening nested conjunctions and disjunctions happens in
 * {@link convertPropFormulaToClauses}. Note that distribution may grow the formula exponentially.
 * The input formula is not mutated.
 *
 * @param formula - The propositional formula to convert.
 * @returns An equivalent formula that is a conjunction of disjunctions of literals,
 * or a single `Contradiction`/`Tautology` node.
 * @throws {Error} If the formula contains an unknown operator.
 * @category Converters
 *
 * @example
 * // ¬(g ∧ (r ⇒ f))  is converted to  (¬g ∨ r) ∧ (¬g ∨ ¬f)
 * convertPropFormulaToCNF({
 *   operator: Operator.Not,
 *   values: [{ operator: Operator.And, values: [g, { operator: Operator.Implies, values: [r, f] }] }],
 * });
 */
export function convertPropFormulaToCNF(formula: PropFormula): PropFormula {
	function traverse(node: PropFormula): PropFormula {
		if (node.operator !== Operator.And && node.operator !== Operator.Or) {
			return node;
		}

		const [left, right] = node.values as PropFormula[];

		if (node.operator === Operator.And) {
			return {
				operator: Operator.And,
				values: [traverse(left), traverse(right)],
			};
		}

		return distribute(traverse(left), traverse(right));
	}

	return traverse(convertPropFormulaToNNF(formula));
}
