import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { extractSubFormulas } from '../extract-sub-formulas';

describe('extractSubFormulas()', () => {
  it('should extract all sub-formulas in the correct order', () => {
    const formula: PropFormula = {
      operator: Operator.And,
      values: [
        {
          operator: Operator.Not,
          values: [{ operator: Operator.Var, values: ['A'] }],
        },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    const expectedSubFormulas: PropFormula[] = [{ operator: Operator.Not, values: [{ operator: Operator.Var, values: ['A'] }] }];

    expect(extractSubFormulas(formula)).toEqual(expectedSubFormulas);
  });

  it('should return an empty array for a variable formula', () => {
    const formula: PropFormula = { operator: Operator.Var, values: ['X'] };
    expect(extractSubFormulas(formula)).toEqual([]);
  });

  it('should extract all sub-formulas, excluding variables and the input formula', () => {
    const formula: PropFormula = {
      operator: Operator.Nand,
      values: [
        {
          operator: Operator.Nor,
          values: [
            { operator: Operator.Var, values: ['A'] },
            { operator: Operator.Var, values: ['B'] },
          ],
        },
        {
          operator: Operator.And,
          values: [
            { operator: Operator.Var, values: ['C'] },
            { operator: Operator.Var, values: ['D'] },
          ],
        },
      ],
    };

    const expectedSubFormulas: PropFormula[] = [
      {
        operator: Operator.Nor,
        values: [
          { operator: Operator.Var, values: ['A'] },
          { operator: Operator.Var, values: ['B'] },
        ],
      },
      {
        operator: Operator.And,
        values: [
          { operator: Operator.Var, values: ['C'] },
          { operator: Operator.Var, values: ['D'] },
        ],
      },
    ];

    expect(extractSubFormulas(formula)).toEqual(expectedSubFormulas);
  });
});
