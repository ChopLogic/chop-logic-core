import { PREPARED_SYMBOLS } from "../constants";
import { PropositionalOperator } from "../enums/propositional-operator";
import { PropositionalExpression, PropositionalFormula } from "../types";
import parenthesizer from "./parenthesizer";
import factory from "./factory";
import parser from "./parser";
import validator from "./validator";

const propositionalConverter = {
  convertToICExpression(
    firstVariable: string,
    secondVariable: string
  ): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const output = [
      PREPARED_SYMBOLS.openParenthesis,
      ...firstExpression,
      PREPARED_SYMBOLS.implication,
      PREPARED_SYMBOLS.openParenthesis,
      ...secondExpression,
      PREPARED_SYMBOLS.implication,
      ...firstExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToIDExpression(
    firstVariable: string,
    secondVariable: string,
    thirdVariable: string
  ): PropositionalExpression {
    if (
      !firstVariable.length ||
      !secondVariable.length ||
      !thirdVariable.length
    ) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const thirdExpression = this.convertStringToExpression(thirdVariable);

    const output = [
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.openParenthesis,
      ...firstExpression,
      PREPARED_SYMBOLS.implication,
      PREPARED_SYMBOLS.openParenthesis,
      ...secondExpression,
      PREPARED_SYMBOLS.implication,
      ...thirdExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.implication,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.openParenthesis,
      ...firstExpression,
      PREPARED_SYMBOLS.implication,
      ...secondExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.implication,
      PREPARED_SYMBOLS.openParenthesis,
      ...firstExpression,
      PREPARED_SYMBOLS.implication,
      ...thirdExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToCRExpression(
    firstVariable: string,
    secondVariable: string
  ): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const output = [
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.negation,
      ...firstExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.implication,
      ...secondExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.implication,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.negation,
      ...firstExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.implication,
      PREPARED_SYMBOLS.openParenthesis,
      PREPARED_SYMBOLS.negation,
      ...secondExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.implication,
      ...firstExpression,
      PREPARED_SYMBOLS.closeParenthesis,
      PREPARED_SYMBOLS.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToDisjunctionExpression(
    firstExpression: PropositionalExpression,
    secondExpression: PropositionalExpression
  ): PropositionalExpression {
    const output = [
      PREPARED_SYMBOLS.openParenthesis,
      ...firstExpression,
      PREPARED_SYMBOLS.disjunction,
      ...secondExpression,
      PREPARED_SYMBOLS.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToConjunctionExpression(
    firstExpression: PropositionalExpression,
    secondExpression: PropositionalExpression
  ): PropositionalExpression {
    const output = [
      PREPARED_SYMBOLS.openParenthesis,
      ...firstExpression,
      PREPARED_SYMBOLS.conjunction,
      ...secondExpression,
      PREPARED_SYMBOLS.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertFormulaToDraftExpression(
    formula: PropositionalFormula
  ): PropositionalExpression {
    let output: PropositionalExpression = [];

    if (formula.operator === PropositionalOperator.Not) {
      output = parenthesizer.wrapWithParenthesis([
        PREPARED_SYMBOLS.negation,
        ...this.convertFormulaToDraftExpression(
          formula.values[0] as PropositionalFormula
        ),
      ]);
    } else if (validator.isBinaryOperator(formula.operator)) {
      const operator = factory.createBinarySymbol(formula.operator);
      const leftOperand = this.convertFormulaToDraftExpression(
        formula.values[0] as PropositionalFormula
      );
      const rightOperand = this.convertFormulaToDraftExpression(
        formula.values[1] as PropositionalFormula
      );
      output = parenthesizer.wrapWithParenthesis([
        ...leftOperand,
        operator,
        ...rightOperand,
      ]);
    } else if (formula.operator === PropositionalOperator.Var) {
      output = parenthesizer.wrapWithParenthesis([
        {
          input: formula.values as string,
          representation: formula.values as string,
          type: "variable",
          position: 0,
        },
      ]);
    }

    return output;
  },

  convertFormulaToDraftFriendlyExpression(
    formula: PropositionalFormula
  ): PropositionalExpression {
    let output: PropositionalExpression = [];

    if (formula.operator === PropositionalOperator.Not) {
      output = [
        PREPARED_SYMBOLS.negation,
        ...this.convertFormulaToDraftFriendlyExpression(
          formula.values[0] as PropositionalFormula
        ),
      ];
    } else if (validator.isBinaryOperator(formula.operator)) {
      const operator = factory.createBinarySymbol(formula.operator);
      const leftOperand = this.convertFormulaToDraftFriendlyExpression(
        formula.values[0] as PropositionalFormula
      );
      const rightOperand = this.convertFormulaToDraftFriendlyExpression(
        formula.values[1] as PropositionalFormula
      );
      output = [
        PREPARED_SYMBOLS.openParenthesis,
        ...leftOperand,
        operator,
        ...rightOperand,
        PREPARED_SYMBOLS.closeParenthesis,
      ];
    } else if (formula.operator === PropositionalOperator.Var) {
      output = [
        {
          input: formula.values as string,
          representation: formula.values as string,
          type: "variable",
          position: 0,
        },
      ];
    }

    return output;
  },

  convertStringToExpression(input: string): PropositionalExpression {
    const charsArray = parser.getCharsArray(input);
    const preparedArray = parser.joinLogicalSymbols(charsArray);
    const expression = preparedArray.map((char, index) =>
      factory.createPropositionalSymbol(char, index)
    );
    const withVariables = parenthesizer.parenthesizeVariables(expression);
    const withNegations = parenthesizer.parenthesizeNegations(withVariables);

    return parenthesizer.parenthesizeBinaryOperators(withNegations);
  },

  convertExpressionToFormula(
    expression: PropositionalExpression
  ): PropositionalFormula {
    const mainSymbol = parser.findMainOperator(expression);
    if (validator.isIncorrectMainSymbol(mainSymbol)) {
      throw new Error("Cannot convert this expression to a formula.");
    }
    const operator = factory.createOperator(mainSymbol);

    if (validator.isBinaryOperator(operator)) {
      const { firstArgument, secondArgument } =
        parser.splitExpressionByPosition(mainSymbol.position, expression);

      return factory.createBinary(
        operator,
        this.convertExpressionToFormula(firstArgument),
        this.convertExpressionToFormula(secondArgument)
      );
    } else if (operator === PropositionalOperator.Not) {
      const argument = expression.slice(2, expression.length - 1);

      return factory.createNegation(this.convertExpressionToFormula(argument));
    } else {
      return factory.createAtom(mainSymbol);
    }
  },

  convertFormulaToExpression(
    formula: PropositionalFormula
  ): PropositionalExpression {
    const expression = this.convertFormulaToDraftExpression(formula);

    return parenthesizer.renumberPositions(expression);
  },

  convertStringToUserFriendlyExpression(
    input: string
  ): PropositionalExpression {
    const convertedInput = this.convertStringToExpression(input);
    const formula = this.convertExpressionToFormula(convertedInput);

    return this.convertFormulaToUserFriendlyExpression(formula);
  },

  convertFormulaToUserFriendlyExpression(
    formula: PropositionalFormula
  ): PropositionalExpression {
    let expression = this.convertFormulaToDraftFriendlyExpression(formula);

    if (
      validator.isOpenParenthesisSymbol(expression[0]) &&
      validator.isCloseParenthesisSymbol(expression[expression.length - 1])
    ) {
      expression = parser.removeSurroundingElements(expression);
    }

    return parenthesizer.renumberPositions(expression);
  },

  convertUserFriendlyExpressionToString(
    expression: PropositionalExpression
  ): string {
    const symbolsArray = expression.map(
      (item) => item.representation || item.input
    );

    return symbolsArray.join(" ");
  },
};

export default Object.freeze(propositionalConverter);
