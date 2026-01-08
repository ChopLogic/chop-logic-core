import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationCreationApplicable } from "../../validators/is-implication-creation-applicable";

/**
 * Applies the rule of Implication Creation.
 *
 * Given a proven formula F and an arbitrary formula G,
 * it derives the implication G => F.
 *
 * This rule allows the introduction of implications in Hilbert-style calculus,
 * enabling the creation of conditional statements from established facts.
 *
 * @param formulas - An array containing [provenFormula, newFormula].
 *                   - provenFormula: The formula that has been proven
 *                   - newFormula: The arbitrary formula to be the antecedent
 * @returns The implication (newFormula => provenFormula)
 * @throws {Error} if implication creation is not applicable.
 */
export function implicationCreation(formulas: PropFormula[]): PropFormula {
	if (!isImplicationCreationApplicable(formulas)) {
		throw new Error(
			"Implication creation requires exactly two formulas: the proven formula and the new antecedent formula.",
		);
	}

	const [provenFormula, newFormula] = formulas;

	return {
		operator: Operator.Implies,
		values: [newFormula, provenFormula],
	};
}
