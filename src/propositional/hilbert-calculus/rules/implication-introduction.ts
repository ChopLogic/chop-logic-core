import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isImplicationIntroductionApplicable } from "../../validators";

/**
 * Applies the rule of Implication Introduction.
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
export function implicationIntroductionRule(
	formulas: PropFormula[],
): PropFormula[] {
	if (!isImplicationIntroductionApplicable(formulas)) {
		throw new Error(
			"Implication introduction requires exactly two formulas: the proven formula and the new antecedent formula.",
		);
	}

	const [provenFormula, newFormula] = formulas;

	return [
		{
			operator: Operator.Implies,
			values: [newFormula, provenFormula],
		},
	];
}
