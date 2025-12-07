import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { isConjunctionIntroductionApplicable } from "../validators/is-conjunction-introduction-applicable";

/**
 * Applies the conjunction introduction rule.
 *
 * Given two formulas A and B, it returns two conjunctions: (A ∧ B) and (B ∧ A)
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula, PropFormula]} A tuple containing the two inferred formulas.
 * @throws {Error} if the formulas do not satisfy conjunction introduction conditions.
 */
export function conjunctionIntroduction(
	formulas: PropFormula[],
): [PropFormula, PropFormula] {
	if (!isConjunctionIntroductionApplicable(formulas)) {
		throw new Error(
			"Conjunction introduction is not applicable to the given formulas.",
		);
	}

	const conjunct1 = formulas[0];
	const conjunct2 = formulas[1];

	return [
		{
			operator: Operator.And,
			values: [conjunct1, conjunct2],
		},
		{
			operator: Operator.And,
			values: [conjunct2, conjunct1],
		},
	];
}
