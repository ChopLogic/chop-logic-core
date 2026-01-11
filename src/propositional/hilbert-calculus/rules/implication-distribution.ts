import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationDistributionApplicable } from "../../validators/is-implication-distribution-applicable";

/**
 * Applies the rule of Implication Distribution.
 *
 * Given a formula of the form F => (G => H),
 * it derives the implication (F => G) => (F => H).
 *
 * This rule applies to each formula in the input array that satisfies the schema.
 *
 * @param formulas - An array of propositional formulas, each with form F => (G => H).
 * @returns An array of derived implications, each with form (F => G) => (F => H).
 * @throws {Error} if implication distribution is not applicable.
 */
export function implicationDistributionRule(
	formulas: PropFormula[],
): PropFormula[] {
	if (!isImplicationDistributionApplicable(formulas)) {
		throw new Error(
			"Implication distribution requires each formula to have the form F => (G => H).",
		);
	}

	return formulas.map((formula) => {
		// Extract F, G, H from the formula F => (G => H)
		const F = (formula.values as PropFormula[])[0];
		const consequent = (formula.values as PropFormula[])[1];
		const G = (consequent.values as PropFormula[])[0];
		const H = (consequent.values as PropFormula[])[1];

		// Create (F => G) => (F => H)
		return {
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Implies,
					values: [F, G],
				},
				{
					operator: Operator.Implies,
					values: [F, H],
				},
			],
		};
	});
}
