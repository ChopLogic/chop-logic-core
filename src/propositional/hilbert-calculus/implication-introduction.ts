import { PropFormula } from '../../models';
import { Operator } from '../../enums';

/**
 * Generates a formula based on the Implication Introduction axiom schema.
 *
 * Given two formulas A and B, this function returns the formula:
 * (A => (B => A)).
 *
 * @param formulas - An array of propositional formulas.
 * @returns A new formula representing (A => (B => A)).
 */
export function implicationIntroduction(formulas: PropFormula[]): PropFormula {
  const [A, B] = formulas;

  return {
    operator: Operator.Implies,
    values: [
      A,
      {
        operator: Operator.Implies,
        values: [B, A],
      },
    ],
  };
}
