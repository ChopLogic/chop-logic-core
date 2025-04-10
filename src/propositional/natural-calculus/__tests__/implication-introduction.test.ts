import { PropFormula } from '../../../models';
import { Operator } from '../../../enums';
import { implicationIntroduction } from '../implication-introduction';

describe('implicationIntroduction', () => {
  it('should return two disjunctions for given formulas', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };

    const result = implicationIntroduction([A, B]);

    expect(result).toEqual([{ operator: Operator.Implies, values: [A, B] }]);
  });

  it('should work for more complex formulas', () => {
    const A: PropFormula = { operator: Operator.Not, values: [{ operator: Operator.Var, values: ['A'] }] };
    const B: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['B'] },
        { operator: Operator.Var, values: ['C'] },
      ],
    };

    const result = implicationIntroduction([A, B]);

    expect(result).toEqual([{ operator: Operator.Implies, values: [A, B] }]);
  });

  it('should throw an error if CI is not applicable', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };
    const C: PropFormula = { operator: Operator.Var, values: ['B'] };

    expect(() => implicationIntroduction([A, B, C])).toThrow('Implication introduction is not applicable to the given formulas.');
  });
});
