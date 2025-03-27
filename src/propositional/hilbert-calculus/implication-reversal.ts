import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Constructs a formula based on the Implication Reversal axiom schema:
 * ((~A => ~B) => (B => A))
 *
 * @param {Object} params - Premises or prover formulas.
 * @param {PropFormula} params.A - The first propositional formula (A).
 * @param {PropFormula} params.B - The second propositional formula (B).
 * @returns A new propositional formula representing the implication reversal.
 */
export function implicationReversal({ A, B }: { A: PropFormula; B: PropFormula }): PropFormula {
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
