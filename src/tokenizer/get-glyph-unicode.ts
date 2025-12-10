import { Glyph, GlyphUnicode } from "../enums";

const GlyphsDictionary: Record<Glyph, GlyphUnicode> = {
	[Glyph.Implication]: GlyphUnicode.Implication,
	[Glyph.ReversedImplication]: GlyphUnicode.ReversedImplication,
	[Glyph.Conjunction]: GlyphUnicode.Conjunction,
	[Glyph.Disjunction]: GlyphUnicode.Disjunction,
	[Glyph.Negation]: GlyphUnicode.Negation,
	[Glyph.Equivalence]: GlyphUnicode.Equivalence,
	[Glyph.ExclusiveConjunction]: GlyphUnicode.ExclusiveConjunction,
	[Glyph.ShefferStroke]: GlyphUnicode.ShefferStroke,
	[Glyph.WebbOperation]: GlyphUnicode.WebbOperation,
	[Glyph.AntiImplication]: GlyphUnicode.AntiImplication,
	[Glyph.ReversedAntiImplication]: GlyphUnicode.ReversedAntiImplication,
	[Glyph.Contradiction]: GlyphUnicode.Contradiction,
	[Glyph.Tautology]: GlyphUnicode.Tautology,
	[Glyph.OpenParenthesis]: GlyphUnicode.OpenParenthesis,
	[Glyph.CloseParenthesis]: GlyphUnicode.CloseParenthesis,
};

/**
 * Converts a given logical glyph character into its corresponding Unicode representation.
 *
 * @param char - A string representing a logical glyph (e.g., '=>', '&', '|', '~', etc.).
 * @returns The corresponding Unicode character from the `GlyphUnicode` enum.
 * @throws {Error} If the character is not a recognized {@link Glyph}.
 */
export function getGlyphUnicode(char: string): GlyphUnicode {
	if (char in GlyphsDictionary) {
		return GlyphsDictionary[char as Glyph];
	} else {
		throw new Error(`Cannot get a GlyphUnicode for the character "${char}".`);
	}
}
