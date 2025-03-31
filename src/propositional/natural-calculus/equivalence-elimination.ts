import { PropFormula } from '../../common/types';
import { isEquivalenceEliminationApplicable } from '../checks/is-equivalence-elimination-applicable';
import { Operator } from '../../common/enums';

/**
 * Performs equivalence elimination on the given formulas.
 *
 * If A <=> B, then we derive (A => B) and (B => A).
 *
 * @param formulas - An array of propositional formulas.
 * @returns An array of derived implications.
 * @throws Error if the formulas are not all equivalences.
 */
export function equivalenceElimination(formulas: PropFormula[]): PropFormula[] {
  if (!isEquivalenceEliminationApplicable(formulas)) {
    throw new Error('Equivalence elimination is not applicable. All formulas must be equivalences.');
  }

  return formulas.flatMap((formula) => {
    const [A, B] = formula.values as PropFormula[];
    return [
      { operator: Operator.Implies, values: [A, B] },
      { operator: Operator.Implies, values: [B, A] },
    ];
  });
}
