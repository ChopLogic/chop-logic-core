import { PropFormula } from '../../../common/types';
import { Operator } from '../../../common/enums';
import { isConjunctionCreationApplicable } from '../is-conjunction-creation-applicable';

describe('isConjunctionCreationApplicable', () => {
  it('should return true when exactly two formulas are provided', () => {
    const formula1: PropFormula = { operator: Operator.Var, values: ['P'] };
    const formula2: PropFormula = { operator: Operator.Var, values: ['Q'] };

    expect(isConjunctionCreationApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false when no formulas are provided', () => {
    expect(isConjunctionCreationApplicable([])).toBe(false);
  });

  it('should return false when only one formula is provided', () => {
    const formula: PropFormula = { operator: Operator.Var, values: ['P'] };

    expect(isConjunctionCreationApplicable([formula])).toBe(false);
  });

  it('should return false when more than two formulas are provided', () => {
    const formula1: PropFormula = { operator: Operator.Var, values: ['P'] };
    const formula2: PropFormula = { operator: Operator.Var, values: ['Q'] };
    const formula3: PropFormula = { operator: Operator.Var, values: ['R'] };

    expect(isConjunctionCreationApplicable([formula1, formula2, formula3])).toBe(false);
  });
});
