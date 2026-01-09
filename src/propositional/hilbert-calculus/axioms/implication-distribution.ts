import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";

/**
 * Constructs a formula based on the Implication Distribution axiom schema:
 * ((A => (B => C)) => ((A => B) => (A => C)))
 *
 * @param formulas - An array of propositional formulas.
 * @returns A new propositional formula representing the axiom schema.
 */
export function implicationDistributionSchema(
	formulas: PropFormula[],
): PropFormula {
	const [A, B, C] = formulas;

	return {
		operator: Operator.Implies,
		values: [
			{
				operator: Operator.Implies,
				values: [A, { operator: Operator.Implies, values: [B, C] }],
			},
			{
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Implies, values: [A, B] },
					{ operator: Operator.Implies, values: [A, C] },
				],
			},
		],
	};
}
