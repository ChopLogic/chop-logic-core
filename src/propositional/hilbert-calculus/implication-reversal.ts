import { Operator } from "../../enums";
import type { PropFormula } from "../../models";

/**
 * Constructs a formula based on the Implication Reversal axiom schema:
 * ((~A => ~B) => (B => A))
 *
 * @param formulas - An array of propositional formulas.
 * @returns A new propositional formula representing the implication reversal.
 */
export function implicationReversal(formulas: PropFormula[]): PropFormula {
	const [A, B] = formulas;

	return {
		operator: Operator.Implies,
		values: [
			{
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Not, values: [A] },
					{ operator: Operator.Not, values: [B] },
				],
			},
			{
				operator: Operator.Implies,
				values: [B, A],
			},
		],
	};
}
