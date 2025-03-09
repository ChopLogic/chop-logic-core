import { PropFormula } from '../../common/types';
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
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, false] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, true] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [false, false] })).toBe(true);
  });

  it('should evaluate a NOT operation', () => {
    const formula: PropFormula = {
      operator: Operator.Not,
      values: [{ operator: Operator.Var, values: ['A'] }],
    };
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [false] })).toBe(true);
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
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, false, true] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, true, true] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, false, false] })).toBe(false);
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
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [false, false, false, false] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, true, true, true] })).toBe(true);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, false, false, true] })).toBe(false);
    expect(calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [true, true, false, true] })).toBe(true);
  });

  it('should throw an error for mismatched assignment length', () => {
    const formula: PropFormula = {
      operator: Operator.Var,
      values: ['A'],
    };
    expect(() => calculatePropFormulaValueOnTruthAssignment({ formula, assignment: [] })).toThrow(
      'Mismatch between formula variables (1) and assignment length (0).',
    );
  });
});
