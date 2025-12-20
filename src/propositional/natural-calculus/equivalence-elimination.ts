import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { isEquivalenceEliminationApplicable } from "../validators/is-equivalence-elimination-applicable";

/**
 * Performs equivalence elimination on the given formulas.
 *
 * If A <=> B, then we derive (A => B) and (B => A).
 *
 * @param formulas An array of propositional formulas.
 * @returns {PropFormula[]} An array containing the inferred formulas.
 * @throws {Error} if the formulas are not all equivalences.
 */
export function equivalenceElimination(formulas: PropFormula[]): PropFormula[] {
	if (!isEquivalenceEliminationApplicable(formulas)) {
		throw new Error(
			"Equivalence elimination is not applicable. All formulas must be equivalences.",
		);
	}

	return formulas.flatMap((formula) => {
		const [A, B] = formula.values as PropFormula[];
		return [
			{ operator: Operator.Implies, values: [A, B] },
			{ operator: Operator.Implies, values: [B, A] },
		];
	});
}
