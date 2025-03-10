import { PropFormula, PropFormulaVariablesMap } from '../../common/types';
import { Operator } from '../../common/enums';
import { calculatePropFormulaValueOnTruthAssignment } from '../calculate-prop-formula-truth-assignment';

describe('calculatePropFormulaValueOnTruthAssignment()', () => {
  it('should evaluate a simple AND operation', () => {
    const formula: PropFormula = {
      operator: Operator.Nor,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };
    const variables = new Map([
      [0, ['A']],
      [1, ['B']],
    ]) as PropFormulaVariablesMap;
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, false] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, true] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [false, false] })).toBe(true);
  });

  it('should evaluate a NOT operation', () => {
    const formula: PropFormula = {
      operator: Operator.Not,
      values: [{ operator: Operator.Var, values: ['A'] }],
    };
    const variables = new Map([[0, ['A']]]) as PropFormulaVariablesMap;
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [false] })).toBe(true);
  });

  it('should evaluate a more complex formula ((A & ~B) => C)', () => {
    const formula: PropFormula = {
      operator: Operator.Implies,
      values: [
        {
          operator: Operator.And,
          values: [
            { operator: Operator.Var, values: ['A'] },
            { operator: Operator.Not, values: [{ operator: Operator.Var, values: ['B'] }] },
          ],
        },
        { operator: Operator.Var, values: ['C'] },
      ],
    };
    const variables = new Map([
      [0, ['A']],
      [1, ['B']],
      [2, ['C']],
    ]) as PropFormulaVariablesMap;
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, false, true] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, true, true] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, false, false] })).toBe(false);
  });

  it('should evaluate a more complex formula ((A & B) <=> (C | D))', () => {
    const formula: PropFormula = {
      operator: Operator.Equiv,
      values: [
        {
          operator: Operator.And,
          values: [
            { operator: Operator.Var, values: ['A'] },
            { operator: Operator.Var, values: ['B'] },
          ],
        },
        {
          operator: Operator.Or,
          values: [
            { operator: Operator.Var, values: ['C'] },
            { operator: Operator.Var, values: ['D'] },
          ],
        },
      ],
    };
    const variables = new Map([
      [0, ['A']],
      [1, ['B']],
      [2, ['C']],
      [3, ['D']],
    ]) as PropFormulaVariablesMap;
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [false, false, false, false] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, true, true, true] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, false, false, true] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [true, true, false, true] })).toBe(true);
  });

  it('should throw an error for mismatched assignment length', () => {
    const formula: PropFormula = {
      operator: Operator.Var,
      values: ['A'],
    };
    const variables = new Map([[0, ['A']]]) as PropFormulaVariablesMap;
    expect(() => calculatePropFormulaValueOnTruthAssignment({ formula, variables, assignment: [] })).toThrow(
      'Mismatch between formula variables (1) and assignment length (0).',
    );
  });
});
