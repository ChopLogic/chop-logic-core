import { PropFormula } from '../../../types';
import { Operator } from '../../../enums';
import { extractPropSubFormulas } from '../extract-prop-sub-formulas';

describe('extractPropSubFormulas()', () => {
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

    expect(extractPropSubFormulas(formula)).toEqual(expectedSubFormulas);
  });

  it('should return an empty array for a variable formula', () => {
    const formula: PropFormula = { operator: Operator.Var, values: ['X'] };
    expect(extractPropSubFormulas(formula)).toEqual([]);
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

    expect(extractPropSubFormulas(formula)).toEqual(expectedSubFormulas);
  });
});
