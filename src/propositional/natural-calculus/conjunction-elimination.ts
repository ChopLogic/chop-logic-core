import type { PropFormula } from "../../models";
import { isConjunctionEliminationApplicable } from "../validators/is-conjunction-elimination-applicable";

/**
 * Applies Conjunction Elimination rule to an array of conjunction formulas.
 *
 * Given (A ∧ B), this rule allows us to infer A and B separately.
 *
 * @param formulas An array of conjunction formulas to eliminate.
 * @returns {PropFormula[]} An array of inferred formulas after applying conjunction elimination.
 * @throws {Error} if any formula is not a conjunction.
 */
export function conjunctionElimination(formulas: PropFormula[]): PropFormula[] {
	if (!isConjunctionEliminationApplicable(formulas)) {
		throw new Error(
			"Conjunction Elimination is not applicable for the given formulas.",
		);
	}

	return formulas.flatMap((formula) => {
		const conjunct1 = formula.values[0] as PropFormula;
		const conjunct2 = formula.values[1] as PropFormula;

		return [conjunct1, conjunct2];
	});
}
