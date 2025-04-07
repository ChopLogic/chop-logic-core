import { PropFormula } from '../../types';
import { Operator } from '../../enums';

/**
 * Constructs a formula based on the Implication Distribution axiom schema:
 * ((A => (B => C)) => ((A => B) => (A => C)))
 *
 * @param {Object} params - Premises or prover formulas.
 * @param {PropFormula} params.A - The first propositional formula.
 * @param {PropFormula} params.B - The second propositional formula.
 * @param {PropFormula} params.C - The third propositional formula.
 * @returns A new propositional formula representing the axiom schema.
 */
export function implicationDistribution({ A, B, C }: { A: PropFormula; B: PropFormula; C: PropFormula }): PropFormula {
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
