import { getGlyphUnicode } from "../get-glyph-unicode";
import { getOperatorGlyph } from "../get-operator-glyph";
import { Tokenizer } from "../index";
import { tokenizeString } from "../tokenize-string";

describe("Tokenizer", () => {
	it("should have all expected rules with correct references", () => {
		expect(Tokenizer).toMatchObject({
			getGlyphUnicode: getGlyphUnicode,
			getOperatorGlyph: getOperatorGlyph,
			tokenizeString: tokenizeString,
		});
	});

	it("should be immutable", () => {
		expect(Object.isFrozen(Tokenizer)).toBe(true);

		expect(() => {
			// @ts-expect-error checking that the object is frozen
			Tokenizer.tokenizeString = jest.fn();
		}).toThrow();
	});
});
