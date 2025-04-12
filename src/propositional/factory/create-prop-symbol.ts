import { PropSymbol } from '../../models';
import { Glyph, GlyphType } from '../../enums';
import { getGlyphUnicode } from '../../tokenizer/get-glyph-unicode';

/**
 * Creates a `PropSymbol` representing a propositional logic symbol.
 *
 * - If the character is a parenthesis, it is classified as `GlyphType.Parenthesis`.
 * - If the character is a known logical glyph, it is classified as `GlyphType.Operator`.
 * - If the character is a Latin letter, it is classified as `GlyphType.Variable`, and its view is the lowercase letter.
 * - Throws an error if the character is unrecognized.
 *
 * @param char - A single character representing a logical symbol.
 * @param position - The position of the symbol in the input expression.
 * @returns A `PropSymbol` containing the atom, type, position, and view.
 * @throws {Error} If the character is not a recognized logical symbol or a Latin letter.
 */
export function createPropSymbol(char: string, position: number): PropSymbol {
  const knownGlyphs = Object.values(Glyph);
  const onlyLatinLetters = /^[a-zA-Z]+$/;

  if (char === Glyph.OpenParenthesis || char === Glyph.CloseParenthesis) {
    return {
      position,
      atom: [char],
      type: GlyphType.Parenthesis,
      view: getGlyphUnicode(char),
    };
  } else if (knownGlyphs.includes(char as Glyph)) {
    return {
      position,
      atom: [char],
      type: GlyphType.Operator,
      view: getGlyphUnicode(char),
    };
  } else if (onlyLatinLetters.test(char)) {
    const firstLetter = char[0].toLowerCase();

    return {
      position,
      atom: [char],
      type: GlyphType.Variable,
      view: firstLetter,
    };
  } else {
    throw new Error(`Cannot create a propositional symbol from the character "${char}".`);
  }
}
