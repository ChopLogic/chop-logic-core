import { getOperatorGlyph } from '../get-operator-glyph';
import { Glyph, Operator } from '../../common/enums';

describe('getOperatorGlyph', () => {
  it('should return the correct glyph for logical operators', () => {
    expect(getOperatorGlyph(Operator.Not)).toBe(Glyph.Negation);
    expect(getOperatorGlyph(Operator.And)).toBe(Glyph.Conjunction);
    expect(getOperatorGlyph(Operator.Or)).toBe(Glyph.Disjunction);
    expect(getOperatorGlyph(Operator.Implies)).toBe(Glyph.Implication);
    expect(getOperatorGlyph(Operator.ReversedImplies)).toBe(Glyph.ReversedImplication);
    expect(getOperatorGlyph(Operator.Equiv)).toBe(Glyph.Equivalence);
    expect(getOperatorGlyph(Operator.Xor)).toBe(Glyph.ExclusiveConjunction);
    expect(getOperatorGlyph(Operator.Nand)).toBe(Glyph.ShefferStroke);
    expect(getOperatorGlyph(Operator.Nor)).toBe(Glyph.WebbOperation);
    expect(getOperatorGlyph(Operator.AntiImplies)).toBe(Glyph.AntiImplication);
    expect(getOperatorGlyph(Operator.ReversedAntiImplies)).toBe(Glyph.ReversedAntiImplication);
    expect(getOperatorGlyph(Operator.Contradiction)).toBe(Glyph.Contradiction);
    expect(getOperatorGlyph(Operator.Tautology)).toBe(Glyph.Tautology);
  });

  it('should throw an error for an unrecognized operator', () => {
    expect(() => getOperatorGlyph(Operator.Var)).toThrow('Cannot convert operator "VAR" to a glyph.');
  });
});
