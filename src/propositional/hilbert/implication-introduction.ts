import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Generates a formula based on the Implication Introduction axiom schema.
 *
 * Given two formulas A and B, this function returns the formula:
 * (A => (B => A)).
 *
 * @param {Object} params - Premises or prover formulas.
 * @param {PropFormula} params.A - The first propositional formula (A).
 * @param {PropFormula} params.B - The second propositional formula (B).
 * @returns A new formula representing (A => (B => A)).
 */
export function implicationIntroduction({ A, B }: { A: PropFormula; B: PropFormula }): PropFormula {
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
