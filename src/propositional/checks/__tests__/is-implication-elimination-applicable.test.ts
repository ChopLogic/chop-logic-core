import { PropFormula } from '../../../common/types';
import { Operator } from '../../../common/enums';
import { isImplicationEliminationApplicable } from '../is-implication-elimination-applicable';

describe('isImplicationEliminationApplicable', () => {
  it('should return true for direct modus ponens application', () => {
    const formula1: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };
    const formula2: PropFormula = { operator: Operator.Var, values: ['P'] };
    expect(isImplicationEliminationApplicable([formula1, formula2])).toBe(true);
  });

  it('should return true when implication and antecedent positions are swapped', () => {
    const formula1: PropFormula = { operator: Operator.Var, values: ['P'] };
    const formula2: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };
    expect(isImplicationEliminationApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false if there is no implication', () => {
    const formula1: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };
    const formula2: PropFormula = { operator: Operator.Var, values: ['P'] };
    expect(isImplicationEliminationApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if antecedent does not match implication', () => {
    const formula1: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['X'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };
    const formula2: PropFormula = { operator: Operator.Var, values: ['P'] };
    expect(isImplicationEliminationApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false if both formulas are implications but unrelated', () => {
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
        { operator: Operator.Var, values: ['C'] },
        { operator: Operator.Var, values: ['D'] },
      ],
    };
    expect(isImplicationEliminationApplicable([formula1, formula2])).toBe(false);
  });

  it('should return false for more that two formulas in the input array', () => {
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
        { operator: Operator.Var, values: ['C'] },
        { operator: Operator.Var, values: ['D'] },
      ],
    };
    const formula3: PropFormula = {
      operator: Operator.Implies,
      values: [
        { operator: Operator.Var, values: ['F'] },
        { operator: Operator.Var, values: ['G'] },
      ],
    };
    expect(isImplicationEliminationApplicable([formula1, formula2, formula3])).toBe(false);
  });
});
