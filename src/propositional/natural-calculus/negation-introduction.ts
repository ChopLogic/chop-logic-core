import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { isNegationIntroductionApplicable } from "../checks/is-negation-introduction-applicable";

/**
 * Applies negation introduction rule:
 * If (A => B) and (A => ~B), then we can infer ~A.
 *
 * @param formulas - An array of propositional formulas.
 * @returns {[PropFormula]} A tuple containing the inferred formula.
 * @throws {Error} if negation introduction rule is not applicable.
 */
export function negationIntroduction(formulas: PropFormula[]): [PropFormula] {
	if (!isNegationIntroductionApplicable(formulas)) {
		throw new Error(
			"Negation introduction is not applicable to the given formulas.",
		);
	}

	// Extract antecedent from the input formulas (both must have the same antecedent)
	const antecedent = formulas[0].values[0] as PropFormula;

	return [
		{
			operator: Operator.Not,
			values: [antecedent],
		},
	];
}
