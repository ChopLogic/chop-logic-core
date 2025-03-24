import { PropFormula } from '../../../common/types';
import { Operator } from '../../../common/enums';
import { implicationIntroduction } from '../implication-introduction';

describe('implicationIntroduction', () => {
  const formulaA: PropFormula = { operator: Operator.Var, values: ['A'] };
  const formulaB: PropFormula = { operator: Operator.Var, values: ['B'] };
  const implicationAB: PropFormula = { operator: Operator.Implies, values: [formulaA, formulaB] };
  const negationA: PropFormula = { operator: Operator.Not, values: [formulaA] };

  it('should return the correct formula for A => (B => A)', () => {
    const result = implicationIntroduction({ A: formulaA, B: formulaB });

    expect(result).toEqual({
      operator: Operator.Implies,
      values: [
        formulaA,
        {
          operator: Operator.Implies,
          values: [formulaB, formulaA],
        },
      ],
    });
  });

  it('should handle identical formulas correctly', () => {
    const result = implicationIntroduction({ A: formulaA, B: formulaA });

    expect(result).toEqual({
      operator: Operator.Implies,
      values: [
        formulaA,
        {
          operator: Operator.Implies,
          values: [formulaA, formulaA],
        },
      ],
    });
  });

  it('should handle complex formulas correctly', () => {
    const result = implicationIntroduction({ A: implicationAB, B: negationA });

    expect(result).toEqual({
      operator: Operator.Implies,
      values: [
        implicationAB,
        {
          operator: Operator.Implies,
          values: [negationA, implicationAB],
        },
      ],
    });
  });
});
