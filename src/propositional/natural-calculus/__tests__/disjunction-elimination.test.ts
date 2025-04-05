import { Operator } from '../../../common/enums';
import { PropFormula } from '../../../common/types';
import { disjunctionElimination } from '../disjunction-elimination';

describe('disjunctionElimination', () => {
  it('should infer C from (A ∨ B), (A => C), and (B => C)', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };
    const C: PropFormula = { operator: Operator.Var, values: ['C'] };

    const disjunction: PropFormula = { operator: Operator.Or, values: [A, B] };
    const implication1: PropFormula = { operator: Operator.Implies, values: [A, C] };
    const implication2: PropFormula = { operator: Operator.Implies, values: [B, C] };

    expect(disjunctionElimination([implication1, disjunction, implication2])).toEqual([C]);
  });

  it('should throw an error if the rule is not applicable', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['A'] };
    const B: PropFormula = { operator: Operator.Var, values: ['B'] };
    const disjunction: PropFormula = { operator: Operator.Or, values: [A, B] };

    expect(() => disjunctionElimination([disjunction])).toThrow('Disjunction elimination is not applicable to the given formulas.');
  });
});
