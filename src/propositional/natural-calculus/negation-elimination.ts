import { PropFormula } from '../../common/types';
import { isNegationEliminationApplicable } from '../checks/is-negation-elimination-applicable';

export function negationElimination(formulas: PropFormula[]): PropFormula {
  if (!isNegationEliminationApplicable(formulas)) {
    throw new Error('Negation elimination is not applicable to the given formulas.');
  }

  const firstNegationFormula = formulas[0];
  const secondNegationFormula = firstNegationFormula.values[0] as PropFormula;

  return secondNegationFormula.values[0] as PropFormula;
}
