import { PropExpression, PropSymbol } from '../../types';
import { Glyph, GlyphType } from '../../enums';

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
    if (isEndOfExpression()) return false;

    if (isVariable(expression[index])) {
      return parseVariable();
    }

    if (isNegation(expression[index])) {
      return parseNegation();
    }

    if (isParenthesizedExpression(expression[index])) {
      return parseParenthesizedExpression();
    }

    return false;
  }

  function parseVariable(): boolean {
    index++; // A single variable is a WFF
    return true;
  }

  function parseNegation(): boolean {
    index++; // Consume "~"
    return parseWFF(); // Negation must be followed by a valid WFF
  }

  function parseParenthesizedExpression(): boolean {
    index++; // Consume "("

    if (!parseWFF()) return false; // First WFF must exist

    if (isEndOfExpression() || !isBinaryOperator(expression[index])) return false;
    index++; // Consume operator

    if (!parseWFF()) return false; // Second WFF must exist

    if (isEndOfExpression() || !isClosingParenthesis(expression[index])) return false;
    index++; // Consume ")"

    return true;
  }

  function isEndOfExpression(): boolean {
    return index >= expression.length;
  }

  function isVariable(symbol: PropSymbol): boolean {
    return symbol.type === GlyphType.Variable;
  }

  function isNegation(symbol: PropSymbol): boolean {
    return symbol.atom[0] === Glyph.Negation;
  }

  function isParenthesizedExpression(symbol: PropSymbol): boolean {
    return symbol.atom[0] === Glyph.OpenParenthesis;
  }

  function isBinaryOperator(symbol: PropSymbol): boolean {
    return symbol.type === GlyphType.Operator && symbol.atom[0] !== Glyph.Negation;
  }

  function isClosingParenthesis(symbol: PropSymbol): boolean {
    return symbol.atom[0] === Glyph.CloseParenthesis;
  }

  const result = parseWFF();
  return result && index === expression.length; // Ensure full expression is parsed
}
