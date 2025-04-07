import { PropFormula } from '../../../types';
import { Operator } from '../../../enums';
import { isConjunctionEliminationApplicable } from '../is-conjunction-elimination-applicable';

describe('isConjunctionEliminationApplicable', () => {
  it('should return true if all formulas are conjunctions', () => {
    const formula1: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['R'] },
        { operator: Operator.Var, values: ['S'] },
      ],
    };

    expect(isConjunctionEliminationApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false if at least one formula is not a conjunction', () => {
    const formula1: PropFormula = {
      operator: Operator.And,
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

    expect(isConjunctionEliminationApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if the input array is empty', () => {
    expect(isConjunctionEliminationApplicable([])).toBe(false);
  });

  it('should return true for a single conjunction formula', () => {
    const formula: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    expect(isConjunctionEliminationApplicable([formula])).toBe(true);
  });

  it('should return false for a single non-conjunction formula', () => {
    const formula: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    expect(isConjunctionEliminationApplicable([formula])).toBe(false);
  });
});
