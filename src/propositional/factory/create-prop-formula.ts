import { PropExpression, PropFormula, PropSymbol } from '../../common/types';
import { Glyph, GlyphType, Operator } from '../../common/enums';
import { createOperator } from './create-operator';
import { isWellFormedFormula } from '../toolkit/is-well-formed-formula';

/**
 * Converts a well-formed propositional expression into a tree-like PropFormula.
 *
 * @param expression - A validated propositional expression.
 * @returns The corresponding PropFormula.
 * @throws {Error} If the expression is not a well-formed formula.
 */
export function createPropFormula(expression: PropExpression): PropFormula {
  if (!isWellFormedFormula(expression)) {
    throw new Error('Invalid propositional expression: Not a well-formed formula (WFF).');
  }

  return parseExpression({ expression, start: 0, end: expression.length - 1 });
}

function parseExpression({ expression, start, end }: { expression: PropExpression; start: number; end: number }): PropFormula {
  if (start > end) {
    throw new Error(`Unexpected expression boundaries: start=${start}, end=${end}`);
  }

  if (isSingleVariable(expression, start, end)) {
    return parseVariable(expression[start]);
  }

  if (isNegation(expression, start)) {
    return parseNegation(expression, start, end);
  }

  if (isParenthesized(expression, start, end)) {
    return parseBinaryExpression(expression, start, end);
  }

  throw new Error('Invalid formula structure.');
}

function isSingleVariable(expression: PropExpression, start: number, end: number): boolean {
  return start === end && expression[start].type === GlyphType.Variable;
}

function parseVariable(symbol: PropSymbol): PropFormula {
  return { operator: Operator.Var, values: symbol.atom };
}

function isNegation(expression: PropExpression, start: number): boolean {
  return expression[start].atom[0] === Glyph.Negation;
}

function parseNegation(expression: PropExpression, start: number, end: number): PropFormula {
  return {
    operator: Operator.Not,
    values: [parseExpression({ expression, start: start + 1, end })],
  };
}

function isParenthesized(expression: PropExpression, start: number, end: number): boolean {
  return expression[start].atom[0] === Glyph.OpenParenthesis && expression[end].atom[0] === Glyph.CloseParenthesis;
}

function parseBinaryExpression(expression: PropExpression, start: number, end: number): PropFormula {
  const mainOperatorIndex = findMainOperator(expression, start, end);
  if (mainOperatorIndex === -1) {
    throw new Error('Could not determine the main operator.');
  }

  return {
    operator: createOperator(expression[mainOperatorIndex]),
    values: [
      parseExpression({ expression, start: start + 1, end: mainOperatorIndex - 1 }),
      parseExpression({ expression, start: mainOperatorIndex + 1, end: end - 1 }),
    ],
  };
}

function findMainOperator(expression: PropExpression, start: number, end: number): number {
  let balance = 0;

  for (let i = start; i <= end; i++) {
    const symbol = expression[i];

    if (symbol.atom[0] === Glyph.OpenParenthesis) balance++;
    if (symbol.atom[0] === Glyph.CloseParenthesis) balance--;

    if (balance === 1 && symbol.type === GlyphType.Operator && symbol.atom[0] !== Glyph.Negation) {
      return i;
    }
  }

  return -1; // Main operator not found
}
