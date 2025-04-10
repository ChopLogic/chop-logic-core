import { PropFormula } from '../../../models';
import { Operator } from '../../../enums';
import { isNegationEliminationApplicable } from '../is-negation-elimination-applicable';

describe('isNegationEliminationApplicable', () => {
  it('should return true if all formulas contain exactly two negations', () => {
    const formula1: PropFormula = {
      operator: Operator.Not,
      values: [
        {
          operator: Operator.Not,
          values: [{ operator: Operator.Var, values: ['A'] }],
        },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Not,
      values: [
        {
          operator: Operator.Not,
          values: [{ operator: Operator.Var, values: ['B'] }],
        },
      ],
    };

    expect(isNegationEliminationApplicable([formula1, formula2])).toBe(true);
  });

  it('should return false if at least one formula does not have exactly two negations', () => {
    const formula1: PropFormula = {
      operator: Operator.Not,
      values: [
        {
          operator: Operator.Not,
          values: [{ operator: Operator.Var, values: ['A'] }],
        },
      ],
    };

    const formula2: PropFormula = {
      operator: Operator.Not,
      values: [{ operator: Operator.Var, values: ['B'] }],
    };

    expect(isNegationEliminationApplicable([formula1, formula2])).toBe(false);
  });

  it('should return true if a formula has more than two negations', () => {
    const formula: PropFormula = {
      operator: Operator.Not,
      values: [
        {
          operator: Operator.Not,
          values: [
            {
              operator: Operator.Not,
              values: [{ operator: Operator.Var, values: ['A'] }],
            },
          ],
        },
      ],
    };

    expect(isNegationEliminationApplicable([formula])).toBe(true);
  });

  it('should return false if the input array is empty', () => {
    expect(isNegationEliminationApplicable([])).toBe(false);
  });

  it('should return false for a single non-negation formula', () => {
    const formula: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['P'] },
        { operator: Operator.Var, values: ['Q'] },
      ],
    };

    expect(isNegationEliminationApplicable([formula])).toBe(false);
  });
});
