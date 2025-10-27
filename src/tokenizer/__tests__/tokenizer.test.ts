import { getGlyphUnicode } from "../get-glyph-unicode";
import { getOperatorGlyph } from "../get-operator-glyph";
import * as tokenizer from "../index";
import { tokenizeString } from "../tokenize-string";

describe("tokenizer module", () => {
	it("should have all expected static methods available", () => {
		expect(typeof tokenizer.getGlyphUnicode).toBe("function");
		expect(tokenizer.getGlyphUnicode).toBe(getGlyphUnicode);

		expect(typeof tokenizer.getOperatorGlyph).toBe("function");
		expect(tokenizer.getOperatorGlyph).toBe(getOperatorGlyph);

		expect(typeof tokenizer.tokenizeString).toBe("function");
		expect(tokenizer.tokenizeString).toBe(tokenizeString);
	});

	it("should allow individual function imports", () => {
		const { getGlyphUnicode, getOperatorGlyph, tokenizeString } = tokenizer;

		expect(getGlyphUnicode).toBe(tokenizer.getGlyphUnicode); // Methods should work when destructured

		expect(getOperatorGlyph).toBe(tokenizer.getOperatorGlyph);
		expect(getGlyphUnicode).toBe(tokenizer.getGlyphUnicode);

		expect(tokenizeString).toBe(tokenizer.tokenizeString);
		expect(getOperatorGlyph).toBe(tokenizer.getOperatorGlyph);
	});
});
