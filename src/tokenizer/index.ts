/**
 * Main tokenization functionality for parsing logical expressions.
 * @module Tokenizer
 */

import { getGlyphUnicode } from "./get-glyph-unicode";
import { getOperatorGlyph } from "./get-operator-glyph";
import { tokenizeString } from "./tokenize-string";

/**
 * Collection of tokenization utilities for processing logical expressions.
 * @namespace
 * @property {Function} getGlyphUnicode - Converts logical glyphs to their Unicode representations
 * @property {Function} getOperatorGlyph - Gets the corresponding glyph for a logical operator
 * @property {Function} tokenizeString - Tokenizes a logical expression string into individual components
 */
export const Tokenizer = Object.freeze({
	getGlyphUnicode,
	getOperatorGlyph,
	tokenizeString,
});
