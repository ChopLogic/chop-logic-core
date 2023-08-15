import { LogicalSymbolRawInput } from "../enums/logical-symbols";
import { PropositionalExpression, PropositionalSymbol } from "../types";

const propositionalSearcher = {
  findMatchingCloseParenthesis(
    expression: PropositionalExpression,
    openParenthesis: PropositionalSymbol
  ): PropositionalSymbol | undefined {
    let nextOpenParenthesisCounter = 0;

    for (const symbol of expression) {
      const isNextParenthesis =
        symbol.position > openParenthesis.position &&
        symbol.type === "parentheses";
      const isOpenParenthesisNext =
        isNextParenthesis &&
        symbol.input === LogicalSymbolRawInput.OpenParenthesis;
      const isCloseParenthesisNext =
        isNextParenthesis &&
        symbol.input === LogicalSymbolRawInput.CloseParenthesis;
      const isMatchingCloseParenthesis =
        isCloseParenthesisNext && nextOpenParenthesisCounter === 0;
      const isNotMatchingCloseParenthesis =
        isCloseParenthesisNext && nextOpenParenthesisCounter > 0;

      if (isOpenParenthesisNext) {
        nextOpenParenthesisCounter++;
      } else if (isMatchingCloseParenthesis) {
        return symbol;
      } else if (isNotMatchingCloseParenthesis) {
        nextOpenParenthesisCounter--;
      }
    }

    return undefined;
  },

  findMatchingOpenParenthesis(
    expression: PropositionalExpression,
    closeParenthesis: PropositionalSymbol
  ): PropositionalSymbol | undefined {
    const previousOpenParenthesis: number[] = [];

    for (const symbol of expression) {
      const isPreviousParenthesis =
        symbol.position < closeParenthesis.position &&
        symbol.type === "parentheses";
      const isOpenParenthesisPrevious =
        isPreviousParenthesis &&
        symbol.input === LogicalSymbolRawInput.OpenParenthesis;
      const isCloseParenthesisPrevious =
        isPreviousParenthesis &&
        symbol.input === LogicalSymbolRawInput.CloseParenthesis;
      const isTargetCloseParenthesis =
        symbol.position === closeParenthesis.position;

      if (isOpenParenthesisPrevious) {
        previousOpenParenthesis.push(symbol.position);
      } else if (isCloseParenthesisPrevious) {
        previousOpenParenthesis.pop();
      } else if (isTargetCloseParenthesis) {
        const index =
          previousOpenParenthesis[previousOpenParenthesis.length - 1];

        return expression[index] || undefined;
      }
    }

    return undefined;
  },

  findClosestParenthesisIndexes(openIndex: number, array: number[]): number {
    const closestIndex = Math.min(...array.filter((item) => item > openIndex));
    if (
      Number.isFinite(closestIndex) &&
      Number.isSafeInteger(closestIndex) &&
      closestIndex >= 0
    ) {
      return closestIndex;
    } else {
      throw new Error(
        `Cannot find the closest parenthesis index to the index "${openIndex}".`
      );
    }
  },
};

export default Object.freeze(propositionalSearcher);
