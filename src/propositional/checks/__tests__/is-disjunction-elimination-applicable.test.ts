import { PropFormula } from '../../../common/types';
import { Operator } from '../../../common/enums';
import { isDisjunctionEliminationApplicable } from '../is-disjunction-elimination-applicable';

describe('isDisjunctionEliminationApplicable', () => {
  it('should return true for valid disjunction elimination', () => {
    const formula1: PropFormula = {
      operator: Operator.Or,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['R'] },
      ],
    };

    const formula3: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['Q'] },
        { operator: Operator.Var, values: ['R'] },
      ],
    };

    expect(isDisjunctionEliminationApplicable([formula1, formula2, formula3])).toBe(true);
  });

  it('should return false when implications have different consequents', () => {
    const formula1: PropFormula = {
      operator: Operator.Or,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['R'] },
      ],
    };

    const formula3: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['Q'] },
        { operator: Operator.Var, values: ['S'] },
      ],
    };

    expect(isDisjunctionEliminationApplicable([formula1, formula2, formula3])).toBe(false);
  });

  it('should return false when the disjunction does not match the antecedents', () => {
    const formula1: PropFormula = {
      operator: Operator.Or,
      values: [
        { operator: Operator.Var, values: ['X'] },
        { operator: Operator.Var, values: ['Y'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['R'] },
      ],
    };

    const formula3: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['Q'] },
        { operator: Operator.Var, values: ['R'] },
      ],
    };

    expect(isDisjunctionEliminationApplicable([formula1, formula2, formula3])).toBe(false);
  });

  it('should return false if there are not exactly two implications', () => {
    const formula1: PropFormula = {
      operator: Operator.Or,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['R'] },
      ],
    };

    const formula3: PropFormula = {
      operator: Operator.Var,
      values: ['R'],
    };

    expect(isDisjunctionEliminationApplicable([formula1, formula2, formula3])).toBe(false);
  });

  it('should return false for more that three formulas in the input array', () => {
    const formula1: PropFormula = {
      operator: Operator.Var,
      values: ['A'],
    };
    const formula2: PropFormula = {
      operator: Operator.Var,
      values: ['B'],
    };
    const formula3: PropFormula = {
      operator: Operator.Var,
      values: ['C'],
    };
    const formula4: PropFormula = {
      operator: Operator.Var,
      values: ['D'],
    };

    expect(isDisjunctionEliminationApplicable([formula1, formula2, formula3, formula4])).toBe(false);
  });
});
