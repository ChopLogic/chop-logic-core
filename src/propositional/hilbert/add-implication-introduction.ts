import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Generates a formula based on the Implication Introduction axiom schema.
 *
 * Given two formulas A and B, this function returns the formula:
 * (A => (B => A)).
 *
 * @param firstFormula - The first propositional formula (A).
 * @param secondFormula - The second propositional formula (B).
 * @returns A new formula representing (A => (B => A)).
 */
export function addImplicationIntroduction(firstFormula: PropFormula, secondFormula: PropFormula): PropFormula {
  return {
    operator: Operator.Implies,
    values: [
      firstFormula,
      {
        operator: Operator.Implies,
        values: [secondFormula, firstFormula],
      },
    ],
  };
}
