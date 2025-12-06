import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { isEquivalenceIntroductionApplicable } from "../validator/is-equivalence-introduction-applicable";

/**
 * Introduces an equivalence (A <=> B) given two implications (A => B) and (B => A).
 *
 * @param formulas An array of propositional formulas.
 * @returns {[PropFormula]} A tuple containing the inferred formula.
 * @throws {Error} if the input formulas do not satisfy the equivalence introduction conditions.
 */
export function equivalenceIntroduction(
	formulas: PropFormula[],
): [PropFormula] {
	if (!isEquivalenceIntroductionApplicable(formulas)) {
		throw new Error(
			"Equivalence introduction is not applicable to the given formulas.",
		);
	}

	const [implication1, implication2] = formulas;
	const firstAntecedent = implication1.values[0] as PropFormula;
	const secondAntecedent = implication2.values[0] as PropFormula;

	return [
		{
			operator: Operator.Equiv,
			values: [firstAntecedent, secondAntecedent],
		},
	];
}
