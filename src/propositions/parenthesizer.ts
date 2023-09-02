import { PREPARED_SYMBOLS } from "../constants";
import { PropositionalExpression, PropositionalSymbol } from "../types";
import searcher from "./searcher";
import validator from "./validator";

const propositionalParenthesizer = {
  parenthesizeVariables(
    expression: PropositionalExpression
  ): PropositionalExpression {
    const output: PropositionalExpression = [];

    for (const symbol of expression) {
      const isParenthesizingNeeded =
        symbol.type === "variable" &&
        !validator.isVariableParenthesized(symbol, expression);
      if (isParenthesizingNeeded) {
        output.push(
          PREPARED_SYMBOLS.openParenthesis,
          symbol,
          PREPARED_SYMBOLS.closeParenthesis
        );
      } else {
        output.push(symbol);
      }
    }

    return this.renumberPositions(output);
  },

  parenthesizeNegations(
    expression: PropositionalExpression
  ): PropositionalExpression {
    const allNegations = expression
      .filter((item) => validator.isNegationSymbol(item))
      .reverse();
    if (!allNegations.length) {
      return expression;
    }

    let output = [...expression];

    for (const negation of allNegations) {
      try {
        const { openIndex, closeIndex } = this.getNegationParenthesisPositions(
          negation,
          output
        );
        output = this.insertOpenAndCloseParenthesis(
          output,
          openIndex,
          closeIndex
        );
      } catch (e: unknown) {
        continue;
      }
    }

    return output;
  },

  parenthesizeBinaryOperators(
    expression: PropositionalExpression
  ): PropositionalExpression {
    const binariesCount = expression.filter((item) =>
      validator.isBinarySymbol(item)
    ).length;
    if (!binariesCount) {
      return expression;
    }

    let output = [...expression];

    for (let i = 0; i < binariesCount; i++) {
      try {
        const allBinaries = output.filter((item) =>
          validator.isBinarySymbol(item)
        );
        const operator = allBinaries[i];
        const { openIndex, closeIndex } = this.getBinaryParenthesisPositions(
          operator,
          output
        );
        output = this.insertOpenAndCloseParenthesis(
          output,
          openIndex,
          closeIndex
        );
      } catch (e: unknown) {
        continue;
      }
    }

    return output;
  },

  insertOpenAndCloseParenthesis(
    expression: PropositionalExpression,
    openPosition: number,
    closePosition: number
  ): PropositionalExpression {
    const output: PropositionalExpression = [];
    const open = PREPARED_SYMBOLS.openParenthesis;
    const close = PREPARED_SYMBOLS.closeParenthesis;

    for (const symbol of expression) {
      if (symbol.position === openPosition) {
        output.push(open, symbol);
      } else if (symbol.position === closePosition) {
        output.push(symbol, close);
      } else {
        output.push(symbol);
      }
    }

    return this.renumberPositions(output);
  },

  getNegationParenthesisPositions(
    negation: PropositionalSymbol,
    expression: PropositionalExpression
  ): { openIndex: number; closeIndex: number } {
    if (validator.isNegationParenthesized(negation, expression)) {
      throw new Error(
        "The given negation expression is already parenthesized."
      );
    }
    const nextSymbol = expression[negation.position + 1];

    if (!nextSymbol) {
      throw new Error("Cannot find the next symbol after the negation symbol.");
    }

    const closeParenthesis = searcher.findMatchingCloseParenthesis(
      expression,
      nextSymbol
    );

    if (!closeParenthesis) {
      throw new Error(
        "Cannot find the close parenthesis for the negation expression."
      );
    }

    return {
      openIndex: negation.position === 0 ? 0 : negation.position,
      closeIndex: closeParenthesis.position,
    };
  },

  getBinaryParenthesisPositions(
    operator: PropositionalSymbol,
    expression: PropositionalExpression
  ): { openIndex: number; closeIndex: number } {
    if (validator.isBinaryOperatorParenthesized(operator, expression)) {
      throw new Error("The given binary operator is already parenthesized.");
    }

    const previousSymbol = expression[operator.position - 1];
    const nextSymbol = expression[operator.position + 1];
    const openParenthesis = searcher.findMatchingOpenParenthesis(
      expression,
      previousSymbol
    );
    const closeParenthesis = searcher.findMatchingCloseParenthesis(
      expression,
      nextSymbol
    );

    if (!openParenthesis) {
      throw new Error(
        "Cannot find an open parenthesis for the binary operator."
      );
    }

    if (!closeParenthesis) {
      throw new Error(
        "Cannot find a close parenthesis for the binary operator."
      );
    }

    return {
      openIndex: openParenthesis.position,
      closeIndex: closeParenthesis.position,
    };
  },

  wrapWithParenthesis(input: PropositionalExpression): PropositionalExpression {
    return this.renumberPositions([
      PREPARED_SYMBOLS.openParenthesis,
      ...input,
      PREPARED_SYMBOLS.closeParenthesis,
    ]);
  },

  renumberPositions(input: PropositionalExpression): PropositionalExpression {
    return input.map((item, index) => {
      return { ...item, position: index };
    });
  },
};

export default Object.freeze(propositionalParenthesizer);
