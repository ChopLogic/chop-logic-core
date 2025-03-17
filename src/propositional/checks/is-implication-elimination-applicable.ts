import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';

/**
 * Checks if implication elimination (modus ponens) is applicable to two given formulas.
 *
 * The rule states:
 * 1) If P, then Q.
 * 2) P.
 * 3) Therefore, Q.
 *
 * This function verifies that:
 * - One of the formulas is an implication (Operator.Implies).
 * - The other formula is structurally equal to the antecedent of the implication.
 *
 * @param formula1 - The first propositional formula.
 * @param formula2 - The second propositional formula.
 * @returns True if implication elimination can be applied, false otherwise.
 */
export function isImplicationEliminationApplicable(formula1: PropFormula, formula2: PropFormula): boolean {
  const checkImplication = (implication: PropFormula, antecedent: PropFormula) =>
    implication.operator === Operator.Implies &&
    Array.isArray(implication.values) &&
    implication.values.length === 2 &&
    arePropFormulasStructurallyEqual(implication.values[0], antecedent);

  return checkImplication(formula1, formula2) || checkImplication(formula2, formula1);
}
