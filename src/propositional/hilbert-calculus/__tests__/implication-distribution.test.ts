import { Operator } from '../../../common/enums';
import { PropFormula } from '../../../common/types';
import { implicationDistribution } from '../implication-distribution';

describe('implicationDistribution', () => {
  const A: PropFormula = { operator: Operator.Var, values: ['A'] };
  const B: PropFormula = { operator: Operator.Var, values: ['B'] };
  const C: PropFormula = { operator: Operator.Var, values: ['C'] };
  const implicationAB: PropFormula = { operator: Operator.Implies, values: [A, B] };
  const negationA: PropFormula = { operator: Operator.Not, values: [A] };

  it('should create the correct implication distribution formula', () => {
    const expected: PropFormula = {
      operator: Operator.Implies,
      values: [
        {
          operator: Operator.Implies,
          values: [A, { operator: Operator.Implies, values: [B, C] }],
        },
        {
          operator: Operator.Implies,
          values: [
            { operator: Operator.Implies, values: [A, B] },
            { operator: Operator.Implies, values: [A, C] },
          ],
        },
      ],
    };

    expect(implicationDistribution({ A, B, C })).toEqual(expected);
  });

  it('should handle complex formulas correctly', () => {
    const expected: PropFormula = {
      operator: Operator.Implies,
      values: [
        {
          operator: Operator.Implies,
          values: [implicationAB, { operator: Operator.Implies, values: [negationA, negationA] }],
        },
        {
          operator: Operator.Implies,
          values: [
            { operator: Operator.Implies, values: [implicationAB, negationA] },
            { operator: Operator.Implies, values: [implicationAB, negationA] },
          ],
        },
      ],
    };

    expect(implicationDistribution({ A: implicationAB, B: negationA, C: negationA })).toEqual(expected);
  });
});
