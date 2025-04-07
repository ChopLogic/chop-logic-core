import { PropFormula } from '../../../types';
import { Operator } from '../../../enums';
import { extractPropVariables } from '../extract-prop-variables';

describe('extractPropVariables', () => {
  test('extracts and sorts variables alphabetically', () => {
    const formula: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['X'] },
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['M'] },
      ],
    };

    expect(extractPropVariables(formula)).toEqual(
      new Map([
        [0, ['A']],
        [1, ['M']],
        [2, ['X']],
      ]),
    );
  });

  test('handles formulas with duplicate variables', () => {
    const formula: PropFormula = {
      operator: Operator.Or,
      values: [
        { operator: Operator.Var, values: ['B'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };

    expect(extractPropVariables(formula)).toEqual(new Map([[0, ['B']]]));
  });

  test('extracts variables from nested structures', () => {
    const formula: PropFormula = {
      operator: Operator.Implies,
      values: [
        {
          operator: Operator.And,
          values: [
            { operator: Operator.Var, values: ['C'] },
            { operator: Operator.Not, values: [{ operator: Operator.Var, values: ['B'] }] },
          ],
        },
        { operator: Operator.Var, values: ['A'] },
      ],
    };

    expect(extractPropVariables(formula)).toEqual(
      new Map([
        [0, ['A']],
        [1, ['B']],
        [2, ['C']],
      ]),
    );
  });

  test('returns an empty map if no variables are present', () => {
    const formula: PropFormula = {
      operator: Operator.Not,
      values: [
        {
          operator: Operator.And,
          values: [{ operator: Operator.Not, values: [{ operator: Operator.Not, values: [] }] }],
        },
      ],
    };

    expect(extractPropVariables(formula)).toEqual(new Map());
  });
});
