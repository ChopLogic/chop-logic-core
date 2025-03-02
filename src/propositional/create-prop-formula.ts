import { isWellFormedFormula } from './is-well-formed-formula';
import { PropExpression, PropFormula } from '../common/types';
import { Glyph, GlyphType, Operator } from '../common/enums';
import { createOperator } from './create-operator';

/**
 * Converts a well-formed propositional expression into a tree-like PropFormula.
 *
 * @param expression - A validated propositional expression.
 * @returns The corresponding PropFormula.
 * @throws Error if the expression is not a well-formed formula.
 */
export function createPropFormula(expression: PropExpression): PropFormula {
  if (!isWellFormedFormula(expression)) {
    throw new Error('Invalid propositional expression: Not a well-formed formula (WFF).');
  }

  function parseExpression(start: number, end: number): PropFormula {
    if (start > end) {
      throw new Error(`Unexpected expression boundaries: start=${start}, end=${end}`);
    }

    // Single variable case
    if (start === end) {
      const symbol = expression[start];
      if (symbol.type === GlyphType.Variable) {
        return {
          operator: Operator.Var,
          values: symbol.atom,
        };
      }
      throw new Error(`Unexpected non-variable at position ${start}: ${symbol.atom[0]}`);
    }

    // Negation case (~WFF)
    if (expression[start].atom[0] === Glyph.Negation) {
      return {
        operator: Operator.Not,
        values: [parseExpression(start + 1, end)],
      };
    }

    // Parentheses case: Find main operator
    if (expression[start].atom[0] === Glyph.OpenParenthesis && expression[end].atom[0] === Glyph.CloseParenthesis) {
      let balance = 0;
      for (let i = start; i <= end; i++) {
        const symbol = expression[i];

        if (symbol.atom[0] === Glyph.OpenParenthesis) balance++;
        if (symbol.atom[0] === Glyph.CloseParenthesis) balance--;

        // Detect the main operator at the top level (outside nested parentheses)
        if (
          balance === 1 && // Ensure it's at the outermost level
          symbol.type === GlyphType.Operator &&
          symbol.atom[0] !== Glyph.Negation
        ) {
          return {
            operator: createOperator(symbol),
            values: [parseExpression(start + 1, i - 1), parseExpression(i + 1, end - 1)],
          };
        }
      }
    }

    throw new Error('Invalid formula structure.');
  }

  return parseExpression(0, expression.length - 1);
}
