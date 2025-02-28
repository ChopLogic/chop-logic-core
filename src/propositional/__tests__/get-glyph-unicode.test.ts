import { getGlyphUnicode } from '../get-glyph-unicode';
import { Glyph, GlyphUnicode } from '../../common/enums';

describe('getGlyphUnicode', () => {
  it('should return the correct Unicode for Implication', () => {
    expect(getGlyphUnicode(Glyph.Implication)).toBe(GlyphUnicode.Implication);
  });

  it('should return the correct Unicode for Conjunction', () => {
    expect(getGlyphUnicode(Glyph.Conjunction)).toBe(GlyphUnicode.Conjunction);
  });

  it('should return the correct Unicode for Disjunction', () => {
    expect(getGlyphUnicode(Glyph.Disjunction)).toBe(GlyphUnicode.Disjunction);
  });

  it('should return the correct Unicode for Negation', () => {
    expect(getGlyphUnicode(Glyph.Negation)).toBe(GlyphUnicode.Negation);
  });

  it('should return the correct Unicode for Equivalence', () => {
    expect(getGlyphUnicode(Glyph.Equivalence)).toBe(GlyphUnicode.Equivalence);
  });

  it('should return the correct Unicode for Open Parenthesis', () => {
    expect(getGlyphUnicode(Glyph.OpenParenthesis)).toBe(GlyphUnicode.OpenParenthesis);
  });

  it('should return the correct Unicode for Close Parenthesis', () => {
    expect(getGlyphUnicode(Glyph.CloseParenthesis)).toBe(GlyphUnicode.CloseParenthesis);
  });

  it('should throw an error for an unrecognized character', () => {
    expect(() => getGlyphUnicode('#')).toThrow('Cannot get a GlyphUnicode for the character "#"');
  });

  it('should throw an error for an empty string', () => {
    expect(() => getGlyphUnicode('')).toThrow('Cannot get a GlyphUnicode for the character ""');
  });
});
