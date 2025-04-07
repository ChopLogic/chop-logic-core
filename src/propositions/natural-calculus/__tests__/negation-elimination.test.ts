import { PropFormula } from '../../../types';
import { Operator } from '../../../enums';
import { negationElimination } from '../negation-elimination';

describe('negationElimination', () => {
  it('should return A when given ~(~A)', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const doubleNegation: PropFormula = { operator: Operator.Not, values: [{ operator: Operator.Not, values: [A] }] };

    expect(negationElimination([doubleNegation])).toEqual([A]);
  });

  it('should return ~A when given ~(~(~A))', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const notA: PropFormula = { operator: Operator.Not, values: [A] };
    const doubleNegation: PropFormula = { operator: Operator.Not, values: [{ operator: Operator.Not, values: [notA] }] };

    expect(negationElimination([doubleNegation])).toEqual([notA]);
  });

  it('should throw an error when input is empty', () => {
    expect(() => negationElimination([])).toThrow('Negation elimination is not applicable to the given formulas.');
  });

  it('should throw an error when input is not a double negation', () => {
    const singleNegation: PropFormula = { operator: Operator.Not, values: ['A'] };

    expect(() => negationElimination([singleNegation])).toThrow('Negation elimination is not applicable to the given formulas.');
  });
});
