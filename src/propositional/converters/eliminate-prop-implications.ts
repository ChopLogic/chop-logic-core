import { Operator } from "../../enums";
import type { PropFormula } from "../../models";

function not(formula: PropFormula): PropFormula {
	return { operator: Operator.Not, values: [formula] };
}

function and(left: PropFormula, right: PropFormula): PropFormula {
	return { operator: Operator.And, values: [left, right] };
}

function or(left: PropFormula, right: PropFormula): PropFormula {
	return { operator: Operator.Or, values: [left, right] };
}

function isConstant(formula: PropFormula): boolean {
	return (
		formula.operator === Operator.Tautology ||
		formula.operator === Operator.Contradiction
	);
}

function negate(formula: PropFormula): PropFormula {
	if (isConstant(formula)) {
		return {
			operator:
				formula.operator === Operator.Tautology
					? Operator.Contradiction
					: Operator.Tautology,
			values: formula.values,
		};
	}
	return not(formula);
}

function conjoin(left: PropFormula, right: PropFormula): PropFormula {
	if (left.operator === Operator.Contradiction) return left;
	if (right.operator === Operator.Contradiction) return right;
	if (left.operator === Operator.Tautology) return right;
	if (right.operator === Operator.Tautology) return left;
	return and(left, right);
}

function disjoin(left: PropFormula, right: PropFormula): PropFormula {
	if (left.operator === Operator.Tautology) return left;
	if (right.operator === Operator.Tautology) return right;
	if (left.operator === Operator.Contradiction) return right;
	if (right.operator === Operator.Contradiction) return left;
	return or(left, right);
}

/**
 * Rewrites a propositional formula so that it only uses negation, conjunction and disjunction.
 *
 * The following rewrite rules are applied recursively:
 * - `φ ⇒ ψ` is equal to `¬φ ∨ ψ`
 * - `φ ⇐ ψ` is equal to `φ ∨ ¬ψ`
 * - `φ ⇔ ψ` is equal to `(¬φ ∨ ψ) ∧ (φ ∨ ¬ψ)`
 * - `φ ⊕ ψ` is equal to `(φ ∨ ψ) ∧ (¬φ ∨ ¬ψ)`
 * - `φ ↑ ψ` is equal to `¬φ ∨ ¬ψ`
 * - `φ ↓ ψ` is equal to `¬φ ∧ ¬ψ`
 * - `φ ↛ ψ` is equal to `φ ∧ ¬ψ`
 * - `φ ↚ ψ` is equal to `¬φ ∧ ψ`
 *
 * Contradiction (`⊥`) and tautology (`⊤`) nodes are constants whose operands are irrelevant.
 * They are propagated upwards (`¬⊤ = ⊥`, `φ ∧ ⊥ = ⊥`, `φ ∧ ⊤ = φ`, `φ ∨ ⊤ = ⊤`, `φ ∨ ⊥ = φ`),
 * so the result is either free of constants or a single constant node.
 *
 * The input formula is not mutated.
 *
 * @param formula - The propositional formula to rewrite.
 * @returns An equivalent formula built only from variables, `Not`, `And` and `Or`,
 * or a single `Contradiction`/`Tautology` node.
 * @throws {Error} If the formula contains an unknown operator.
 * @category Converters
 *
 * @example
 * // g ∧ (r ⇒ f)  is converted to  g ∧ (¬r ∨ f)
 * eliminatePropImplications({
 *   operator: Operator.And,
 *   values: [g, { operator: Operator.Implies, values: [r, f] }],
 * });
 */
export function eliminatePropImplications(formula: PropFormula): PropFormula {
	function traverse(node: PropFormula): PropFormula {
		switch (node.operator) {
			case Operator.Var:
			case Operator.Contradiction:
			case Operator.Tautology:
				return node;
			case Operator.Not:
				return negate(traverse(node.values[0] as PropFormula));
		}

		const [leftNode, rightNode] = node.values as PropFormula[];
		const left = traverse(leftNode);
		const right = traverse(rightNode);

		switch (node.operator) {
			case Operator.And:
				return conjoin(left, right);
			case Operator.Or:
				return disjoin(left, right);
			case Operator.Implies:
				return disjoin(negate(left), right);
			case Operator.ReversedImplies:
				return disjoin(left, negate(right));
			case Operator.Equiv:
				return conjoin(
					disjoin(negate(left), right),
					disjoin(left, negate(right)),
				);
			case Operator.Xor:
				return conjoin(
					disjoin(left, right),
					disjoin(negate(left), negate(right)),
				);
			case Operator.Nand:
				return disjoin(negate(left), negate(right));
			case Operator.Nor:
				return conjoin(negate(left), negate(right));
			case Operator.AntiImplies:
				return conjoin(left, negate(right));
			case Operator.ReversedAntiImplies:
				return conjoin(negate(left), right);
			default:
				throw new Error(`Unknown operator: "${node.operator}".`);
		}
	}

	return traverse(formula);
}
