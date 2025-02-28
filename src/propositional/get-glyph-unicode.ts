import { Glyph, GlyphUnicode } from '../common/enums';

/**
 * Converts a given logical glyph character into its corresponding Unicode representation.
 *
 * @param char - A string representing a logical glyph (e.g., '=>', '&', '|', '~', etc.).
 * @returns The corresponding Unicode character from the `GlyphUnicode` enum.
 * @throws Will throw an error if the character is not a recognized `Glyph`.
 */
export function getGlyphUnicode(char: string): GlyphUnicode {
  switch (char) {
    case Glyph.Implication: {
      return GlyphUnicode.Implication;
    }
    case Glyph.Conjunction: {
      return GlyphUnicode.Conjunction;
    }
    case Glyph.Disjunction: {
      return GlyphUnicode.Disjunction;
    }
    case Glyph.Negation: {
      return GlyphUnicode.Negation;
    }
    case Glyph.Equivalence: {
      return GlyphUnicode.Equivalence;
    }
    case Glyph.OpenParenthesis: {
      return GlyphUnicode.OpenParenthesis;
    }
    case Glyph.CloseParenthesis: {
      return GlyphUnicode.CloseParenthesis;
    }
    default: {
      throw new Error(`Cannot get a GlyphUnicode for the character "${char}".`);
    }
  }
}
