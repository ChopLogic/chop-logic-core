import { Operator } from "../../enums";
import type { PropFormula } from "../../models";
import { getGlyphUnicode, getOperatorGlyph } from "../../tokenizer";

/**
 * Converts a propositional formula into a string representation using Unicode logical symbols.
 *
 * @param {PropFormula} formula - The propositional formula to convert.
 * @returns {string} The string representation of the formula using Unicode glyphs.
 */
export function convertPropFormulaToString(formula: PropFormula): string {
	if (formula.operator === Operator.Var) {
		return formula.values[0] as string;
	}

	const glyph = getGlyphUnicode(getOperatorGlyph(formula.operator));
	const subFormulas = formula.values as PropFormula[];
	const values = subFormulas.map(convertPropFormulaToString);

	if (formula.operator === Operator.Not) {
		return `${glyph}${values[0]}`;
	}

	const glyphSpace = ` ${glyph} `;

	return `(${values.join(glyphSpace)})`;
}
