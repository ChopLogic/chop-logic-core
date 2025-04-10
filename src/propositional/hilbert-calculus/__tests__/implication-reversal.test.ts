import { Operator } from '../../../enums';
import { PropFormula } from '../../../models';
import { implicationReversal } from '../implication-reversal';

describe('implicationReversal', () => {
  it('should create a formula matching the schema ((~A => ~B) => (B => A))', () => {
    const A: PropFormula = { operator: Operator.Var, values: ['F'] };
    const B: PropFormula = { operator: Operator.Var, values: ['G'] };

    const result = implicationReversal({ A, B });

    expect(result).toEqual({
      operator: Operator.Implies,
      values: [
        {
          operator: Operator.Implies,
          values: [
            { operator: Operator.Not, values: [A] },
            { operator: Operator.Not, values: [B] },
          ],
        },
        {
          operator: Operator.Implies,
          values: [B, A],
        },
      ],
    });
  });
});
