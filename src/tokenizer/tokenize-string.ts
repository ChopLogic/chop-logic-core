import { Glyph } from "../enums";

/**
 * Tokenizes an input string into an array of known logical glyphs and variable names.
 *
 * - Recognizes logical glyphs defined in `Glyph`.
 * - Groups consecutive English letters into variables.
 * - Ignores spaces in the input.
 * - Throws an error if the input contains unsupported characters.
 *
 * @param input - The logical expression as a string.
 * @returns An array of tokens (glyphs and variables).
 * @throws {Error} If the input contains unsupported characters.
 */
export function tokenizeString(input: string): string[] {
	if (!input.length) return [];
	// Sort by length to match longest first
	const glyphs = Object.values(Glyph).sort((a, b) => b.length - a.length);
	// Escape special chars
	const glyphPattern = glyphs
		.map((g) => g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|");
	// Variables: one or more English letters
	const variablePattern = "[a-zA-Z]+";
	const tokenizer = new RegExp(`(${glyphPattern})|(${variablePattern})`, "g");

	const tokens: string[] = [];
	let match: RegExpExecArray | null = tokenizer.exec(input);

	while (match !== null) {
		tokens.push(match[0]);
		match = tokenizer.exec(input);
	}

	if (!tokens.length || tokens.join("") !== input.replace(/\s+/g, "")) {
		throw new Error(`Invalid character(s) found in input: "${input}".`);
	}

	return tokens;
}
