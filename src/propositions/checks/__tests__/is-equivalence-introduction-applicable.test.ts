import { PropFormula } from '../../../types';
import { Operator } from '../../../enums';
import { isEquivalenceIntroductionApplicable } from '../is-equivalence-introduction-applicable';

describe('isEquivalenceIntroductionApplicable', () => {
  it('should return true for two implications that form an equivalence', () => {
    const formula1: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['B'] },
        { operator: Operator.Var, values: ['A'] },
      ],
    };

    expect(isEquivalenceIntroductionApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false if there are not exactly two formulas', () => {
    const formula: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    expect(isEquivalenceIntroductionApplicable([formula])).toBe(false);
    expect(isEquivalenceIntroductionApplicable([])).toBe(false);
  });

  it('should return false if at least one formula is not an implication', () => {
    const formula1: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.And, // Not an implication
      values: [
        { operator: Operator.Var, values: ['B'] },
        { operator: Operator.Var, values: ['A'] },
      ],
    };

    expect(isEquivalenceIntroductionApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if implications do not form an equivalence', () => {
    const formula1: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['C'] }, // Different antecedent
        { operator: Operator.Var, values: ['A'] },
      ],
    };

    expect(isEquivalenceIntroductionApplicable([formula1, formula2])).toBe(false);
  });
});
