import { isDisjunctionIntroductionApplicable } from '../is-dusjunction-introduction-applicable';
import { PropFormula } from '../../../types';
import { Operator } from '../../../enums';

describe('isDisjunctionIntroductionApplicable', () => {
  it('should return false when one formula is provided', () => {
    const formula: PropFormula = { operator: Operator.Var, values: ['P'] };

    expect(isDisjunctionIntroductionApplicable([formula])).toBe(false);
  });

  it('should return false when no formulas are provided', () => {
    expect(isDisjunctionIntroductionApplicable([])).toBe(false);
  });

  it('should return true when two formulas are provided', () => {
    const formula1: PropFormula = { operator: Operator.Var, values: ['P'] };
    const formula2: PropFormula = { operator: Operator.Var, values: ['Q'] };

    expect(isDisjunctionIntroductionApplicable([formula1, formula2])).toBe(true);
  });
});
