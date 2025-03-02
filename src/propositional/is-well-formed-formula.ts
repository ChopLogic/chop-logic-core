import { PropExpression } from '../common/types';
import { Glyph, GlyphType } from '../common/enums';

/**
 * Checks whether a given propositional expression is a well-formed formula (WFF).
 *
 * A WFF follows these rules:
 * 1) Any single variable itself is a WFF.
 * 2) Any WFF can be prefixed with "~" to form another WFF.
 * 3) Any two WFFs can be combined with "&", "|", "=>", or "<=>" inside parentheses to form another WFF.
 *
 * Parentheses are mandatory when joining two WFFs using binary operators.
 *
 * @param expression - The propositional expression as an array of PropSymbols.
 * @returns `true` if the expression is a valid WFF, otherwise `false`.
 */
export function isWellFormedFormula(expression: PropExpression): boolean {
  if (expression.length === 0) return false;

  let index = 0;

  function parseWFF(): boolean {
    if (index >= expression.length) return false;
    const symbol = expression[index];

    if (symbol.type === GlyphType.Variable) {
      index++; // A single variable is a WFF
      return true;
    }

    if (symbol.atom[0] === Glyph.Negation) {
      index++; // Consume "~"
      return parseWFF(); // Negation must be followed by a valid WFF
    }

    if (symbol.atom[0] === Glyph.OpenParenthesis) {
      index++; // Consume "("
      if (!parseWFF()) return false; // First WFF

      if (index >= expression.length) return false;
      const operator = expression[index];
      if (operator.type !== GlyphType.Operator || operator.atom[0] === Glyph.Negation) return false;
      index++; // Consume operator

      if (!parseWFF()) return false; // Second WFF

      if (index >= expression.length || expression[index].atom[0] !== Glyph.CloseParenthesis) {
        return false; // Expect closing ")"
      }
      index++; // Consume ")"
      return true;
    }

    return false;
  }

  const result = parseWFF();
  return result && index === expression.length; // Ensure full expression is parsed
}
