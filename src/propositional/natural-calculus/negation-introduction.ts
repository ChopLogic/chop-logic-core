import { PropFormula } from '../../common/types';
import { isNegationCreationApplicable } from '../checks/is-negation-creation-applicable';
import { Operator } from '../../common/enums';

/**
 * Applies negation introduction rule.
 *
 * If A => B and A => ~B, then we can infer ~A.
 *
 * @param formulas - An array of propositional formulas.
 * @returns The inferred negation formula.
 * @throws {Error} if negation introduction is not applicable.
 */
export function negationIntroduction(formulas: PropFormula[]): PropFormula {
  if (!isNegationCreationApplicable(formulas)) {
    throw new Error('Negation introduction is not applicable to the given formulas.');
  }

  // Extract antecedent from the input formulas (both must have the same antecedent)
  const antecedent = formulas[0].values[0] as PropFormula;

  return {
    operator: Operator.Not,
    values: [antecedent],
  };
}
