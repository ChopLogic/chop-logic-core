import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';

/**
 * Checks if conjunction elimination is applicable.
 *
 * Conjunction elimination allows us to infer any conjunct from a conjunction.
 * This function verifies whether all provided formulas are conjunctions.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if all formulas are conjunctions, otherwise `false`.
 */
export function isConjunctionEliminationApplicable(formulas: PropFormula[]): boolean {
  if (formulas.length === 0) {
    return false;
  }

  return formulas.every((formula) => formula.operator === Operator.And);
}
