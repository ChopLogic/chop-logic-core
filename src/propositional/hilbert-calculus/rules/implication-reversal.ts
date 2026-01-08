import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationReversalApplicable } from "../../validators/is-implication-reversal-applicable";

/**
 * Applies the rule of Implication Reversal.
 *
 * Given a formula of the form ¬F => ¬G,
 * it derives the implication G => F.
 *
 * This rule allows contraposition in Hilbert-style calculus,
 * enabling the derivation of equivalent implications with reversed arguments.
 *
 * @param formulas - An array of propositional formulas, each with form ¬F => ¬G.
 * @returns An array of derived implications, each with form G => F.
 * @throws {Error} if implication reversal is not applicable.
 */
export function implicationReversal(formulas: PropFormula[]): PropFormula[] {
	if (!isImplicationReversalApplicable(formulas)) {
		throw new Error(
			"Implication reversal requires each formula to have the form ¬F => ¬G.",
		);
	}

	return formulas.map((formula) => {
		// Extract F and G from the formula ¬F => ¬G
		const antecedent = (formula.values as PropFormula[])[0];
		const consequent = (formula.values as PropFormula[])[1];

		const F = (antecedent.values as PropFormula[])[0];
		const G = (consequent.values as PropFormula[])[0];

		// Create G => F
		return {
			operator: Operator.Implies,
			values: [G, F],
		};
	});
}
