import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { eliminatePropImplications } from "./eliminate-prop-implications";

/**
 * Converts a propositional formula to negation normal form (NNF).
 *
 * The formula is first passed through {@link eliminatePropImplications}, then negations are pushed
 * down to the variables with the following rules:
 * - `¬¬φ` is equivalent to `φ`
 * - `¬(φ ∧ ψ)` is equivalent to `¬φ ∨ ¬ψ`
 * - `¬(φ ∨ ψ)` is equivalent to `¬φ ∧ ¬ψ`
 *
 * If the formula reduces to a constant, the single `Contradiction`/`Tautology` node is returned.
 * The input formula is not mutated.
 *
 * @param formula - The propositional formula to convert.
 * @returns An equivalent formula built from `And`, `Or` and literals (`p` or `¬p`),
 * or a single `Contradiction`/`Tautology` node.
 * @throws {Error} If the formula contains an unknown operator.
 * @category Converters
 *
 * @example
 * // ¬(g ∧ (r ⇒ f))  is converted to  ¬g ∨ (r ∧ ¬f)
 * convertPropFormulaToNNF({
 *   operator: Operator.Not,
 *   values: [{ operator: Operator.And, values: [g, { operator: Operator.Implies, values: [r, f] }] }],
 * });
 */
export function convertPropFormulaToNNF(formula: PropFormula): PropFormula {
	function traverse(node: PropFormula, negated: boolean): PropFormula {
		switch (node.operator) {
			case Operator.Var:
				return negated ? { operator: Operator.Not, values: [node] } : node;
			case Operator.Not:
				return traverse(node.values[0] as PropFormula, !negated);
			case Operator.And:
			case Operator.Or: {
				const [left, right] = node.values as PropFormula[];
				const isAnd = node.operator === Operator.And;
				return {
					operator: isAnd !== negated ? Operator.And : Operator.Or,
					values: [traverse(left, negated), traverse(right, negated)],
				};
			}
			default:
				// Only a root constant can reach this point after eliminatePropImplications.
				return node;
		}
	}

	return traverse(eliminatePropImplications(formula), false);
}
