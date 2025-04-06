import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { getGlyphUnicode } from '../../tokenizer/get-glyph-unicode';
import { getOperatorGlyph } from '../../tokenizer/get-operator-glyph';

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

  return `(${values.join(` ${glyph} `)})`;
}
