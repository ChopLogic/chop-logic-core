import { PropFormula } from '../../common/types';

/**
 * Checks whether two propositional formulas are structurally equivalent.
 * Two formulas are considered structurally equivalent if they have the exact same structure,
 * operators, and variable names in the same positions.
 *
 * @param formula1 - The first propositional formula.
 * @param formula2 - The second propositional formula.
 * @returns True if the formulas are structurally equivalent, otherwise false.
 */
export function arePropFormulasStructurallyEqual(formula1: PropFormula, formula2: PropFormula): boolean {
  const firstArgument = JSON.stringify(formula1);
  const secondArgument = JSON.stringify(formula2);

  return firstArgument === secondArgument;
}
