import { Operator } from '../../../enums';
import { convertPropFormulaToString } from '../convert-prop-formula-to-string';
import { PropFormula } from '../../../types';

describe('convertPropFormulaToString', () => {
  it('should convert a single variable to a string', () => {
    const formula: PropFormula = { operator: Operator.Var, values: ['A'] };
    expect(convertPropFormulaToString(formula)).toBe('A');
  });

  it('should convert a negation formula to a string', () => {
    const formula: PropFormula = {
      operator: Operator.Not,
      values: [{ operator: Operator.Var, values: ['A'] }],
    };
    expect(convertPropFormulaToString(formula)).toBe(`¬A`);
  });

  it('should convert a conjunction formula to a string with parentheses', () => {
    const formula: PropFormula = {
      operator: Operator.And,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };
    expect(convertPropFormulaToString(formula)).toBe(`(A ∧ B)`);
  });

  it('should convert a complex nested formula correctly', () => {
    const formula: PropFormula = {
      operator: Operator.Or,
      values: [
        {
          operator: Operator.And,
          values: [
            { operator: Operator.Var, values: ['A'] },
            { operator: Operator.Var, values: ['B'] },
          ],
        },
        { operator: Operator.Var, values: ['C'] },
      ],
    };
    expect(convertPropFormulaToString(formula)).toBe(`((A ∧ B) ∨ C)`);
  });

  it('should handle NOR operation correctly', () => {
    const formula: PropFormula = {
      operator: Operator.Nor,
      values: [
        { operator: Operator.Var, values: ['A'] },
        { operator: Operator.Var, values: ['B'] },
      ],
    };
    expect(convertPropFormulaToString(formula)).toBe(`(A ↓ B)`);
  });

  it('should convert a more complex formula ', () => {
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

    expect(convertPropFormulaToString(formula)).toBe('((A ∧ B) ≡ (C ∨ D))');
  });
});
