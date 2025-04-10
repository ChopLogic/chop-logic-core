import { PropFormula } from '../../../models';
import { Operator } from '../../../enums';
import { implicationElimination } from '../implication-elimination';

describe('implicationElimination', () => {
  it('should apply modus ponens correctly', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };
    const implication: PropFormula = { operator: Operator.Implies, values: [A, B] };

    expect(implicationElimination([implication, A])).toEqual(B);
  });

  it('should throw an error if implication elimination is not applicable', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };
    const implication: PropFormula = { operator: Operator.Implies, values: [A, B] };

    expect(() => implicationElimination([implication])).toThrow('Implication elimination is not applicable to the given formulas.');
  });

  it('should throw an error if no matching antecedent is found', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };
    const C: PropFormula = { operator: Operator.Var, values: ['C'] };
    const implication: PropFormula = { operator: Operator.Implies, values: [A, B] };

    expect(() => implicationElimination([implication, C])).toThrow('Implication elimination is not applicable to the given formulas.');
  });
});
