import { PropFormula } from '../../../common/types';
import { Operator } from '../../../common/enums';
import { isEquivalenceEliminationApplicable } from '../is-equivalence-elimination-applicable';

describe('isEquivalenceEliminationApplicable', () => {
  it('should return true if all formulas are equivalences', () => {
    const formula1: PropFormula = {
      operator: Operator.Equiv,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Equiv,
      values: [
        { operator: Operator.Var, values: ['R'] },
        { operator: Operator.Var, values: ['S'] },
      ],
    };

    expect(isEquivalenceEliminationApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false if at least one formula is not an equivalence', () => {
    const formula1: PropFormula = {
      operator: Operator.Equiv,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Or,
      values: [
        { operator: Operator.Var, values: ['R'] },
        { operator: Operator.Var, values: ['S'] },
      ],
    };

    expect(isEquivalenceEliminationApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if the input array is empty', () => {
    expect(isEquivalenceEliminationApplicable([])).toBe(false);
  });

  it('should return true for a single equivalence formula', () => {
    const formula: PropFormula = {
      operator: Operator.Equiv,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    expect(isEquivalenceEliminationApplicable([formula])).toBe(true);
  });

  it('should return false for a single non-equivalence formula', () => {
    const formula: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    expect(isEquivalenceEliminationApplicable([formula])).toBe(false);
  });
});
