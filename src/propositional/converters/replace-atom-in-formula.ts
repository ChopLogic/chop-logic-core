import { Operator } from "../../enums";
import type { PropAtom, PropFormula } from "../../models";

/**
 * Recursively replaces all occurrences of a specified atom in a formula with a substitute formula or atom.
 *
 * This function traverses the formula tree and replaces every instance of the target atom with the
 * provided substitute. If the atom is not present in the formula, the original formula is returned unchanged.
 *
 * @param formula - The propositional formula in which substitution will occur.
 * @param atom - The atomic proposition (variable) to be replaced.
 * @param substitute - The formula or atom to replace the target atom with.
 * @returns A new formula with all occurrences of the atom replaced by the substitute.
 * @category Converters
 *
 * @example
 * // Replace q with s in (p => (q => r))
 * const formula: PropFormula = { operator: Operator.Implies, values: [
 *   { operator: Operator.Var, values: [['p']] },
 *   { operator: Operator.Implies, values: [
 *     { operator: Operator.Var, values: [['q']] },
 *     { operator: Operator.Var, values: [['r']] }
 *   ]}
 * ]};
 * const result = replaceAtomInFormula({ formula, atom: ['q'], substitute: { operator: Operator.Var, values: [['s']] } });
 * // Result: p => (s => r)
 */
export function replaceAtomInFormula({
	formula,
	atom,
	substitute,
}: {
	formula: PropFormula;
	atom: PropAtom;
	substitute: PropFormula | PropAtom;
}): PropFormula {
	function traverse(node: PropFormula): PropFormula {
		// If the node is a variable, check if it matches the atom
		if (node.operator === Operator.Var) {
			const nodeAtom = node.values as PropAtom;
			if (nodeAtom[0] === atom[0]) {
				// Replace with substitute
				if (
					Array.isArray(substitute) &&
					substitute.length === 1 &&
					typeof substitute[0] === "string"
				) {
					// substitute is a PropAtom
					return {
						operator: Operator.Var,
						values: substitute,
					};
				} else {
					// substitute is a PropFormula
					return substitute as PropFormula;
				}
			}
			// Atom doesn't match, return the node unchanged
			return node;
		}

		// If the node is a composite formula, recursively traverse its sub-formulas
		if (Array.isArray(node.values)) {
			const subFormulas = node.values as PropFormula[];
			const newValues = subFormulas.map((subFormula) => traverse(subFormula));

			return {
				operator: node.operator,
				values: newValues,
			};
		}

		// This shouldn't happen for well-formed formulas, but return node as fallback
		return node;
	}

	return traverse(formula);
}
