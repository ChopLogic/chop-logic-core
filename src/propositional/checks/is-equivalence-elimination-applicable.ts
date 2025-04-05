import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Checks if equivalence elimination is applicable.
 *
 * Equivalence elimination allows us to infer any argument from an equivalence.
 * This function verifies whether all provided formulas are equivalences.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all formulas are equivalences, otherwise `false`.
 */
export function isEquivalenceEliminationApplicable(formulas: PropFormula[]): boolean {
  if (formulas.length === 0) {
    return false;
  }

  return formulas.every((formula) => formula.operator === Operator.Equiv);
}
