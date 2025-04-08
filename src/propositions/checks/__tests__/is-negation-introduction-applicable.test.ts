import { PropFormula } from '../../../models';
import { Operator } from '../../../enums';
import { isNegationIntroductionApplicable } from '../is-negation-introduction-applicable';

describe('isNegationIntroductionApplicable', () => {
  it('should return true for two implications with the same antecedent and negated consequents', () => {
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
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Not, values: [{ operator: Operator.Var, values: ['B'] }] },
      ],
    };

    expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
  });

  it('should return true when negation is in the first formula', () => {
    const formula1: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Not, values: [{ operator: Operator.Var, values: ['B'] }] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false if there are not exactly two formulas', () => {
    const formula: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    expect(isNegationIntroductionApplicable([formula])).toBe(false);
    expect(isNegationIntroductionApplicable([])).toBe(false);
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
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if antecedents are not structurally equal', () => {
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
        { operator: Operator.Not, values: [{ operator: Operator.Var, values: ['B'] }] },
      ],
    };

    expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if consequents are not exact negations of each other', () => {
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
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['C'] }, // Different variable, not a negation
      ],
    };

    expect(isNegationIntroductionApplicable([formula1, formula2])).toBe(false);
  });
});
