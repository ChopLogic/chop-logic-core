import { PREPARED_SYMBOLS } from "../constants";
import { PropositionalOperator } from "../enums/propositional-operator";
import { PropositionalExpression, PropositionalFormula } from "../types";
import parenthesizer from "./parenthesizer";
import factory from "./factory";
import parser from "./parser";
import validator from "./validator";

const convertToICExpression = (
  firstVariable: string,
  secondVariable: string
): PropositionalExpression => {
  if (!firstVariable.length || !secondVariable.length) {
    return [];
  }

  const firstExpression = convertStringToExpression(firstVariable);
  const secondExpression = convertStringToExpression(secondVariable);
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
};

const convertToIDExpression = (
  firstVariable: string,
  secondVariable: string,
  thirdVariable: string
): PropositionalExpression => {
  if (
    !firstVariable.length ||
    !secondVariable.length ||
    !thirdVariable.length
  ) {
    return [];
  }

  const firstExpression = convertStringToExpression(firstVariable);
  const secondExpression = convertStringToExpression(secondVariable);
  const thirdExpression = convertStringToExpression(thirdVariable);

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
};

const convertToCRExpression = (
  firstVariable: string,
  secondVariable: string
): PropositionalExpression => {
  if (!firstVariable.length || !secondVariable.length) {
    return [];
  }

  const firstExpression = convertStringToExpression(firstVariable);
  const secondExpression = convertStringToExpression(secondVariable);
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
};

const convertToDisjunctionExpression = (
  firstExpression: PropositionalExpression,
  secondExpression: PropositionalExpression
): PropositionalExpression => {
  const output = [
    PREPARED_SYMBOLS.openParenthesis,
    ...firstExpression,
    PREPARED_SYMBOLS.disjunction,
    ...secondExpression,
    PREPARED_SYMBOLS.closeParenthesis,
  ];

  return parenthesizer.renumberPositions(output);
};

const convertToConjunctionExpression = (
  firstExpression: PropositionalExpression,
  secondExpression: PropositionalExpression
): PropositionalExpression => {
  const output = [
    PREPARED_SYMBOLS.openParenthesis,
    ...firstExpression,
    PREPARED_SYMBOLS.conjunction,
    ...secondExpression,
    PREPARED_SYMBOLS.closeParenthesis,
  ];

  return parenthesizer.renumberPositions(output);
};

const convertFormulaToDraftExpression = (
  formula: PropositionalFormula
): PropositionalExpression => {
  let output: PropositionalExpression = [];

  if (formula.operator === PropositionalOperator.Not) {
    output = parenthesizer.wrapWithParenthesis([
      PREPARED_SYMBOLS.negation,
      ...convertFormulaToDraftExpression(
        formula.values[0] as PropositionalFormula
      ),
    ]);
  } else if (validator.isBinaryOperator(formula.operator)) {
    const operator = factory.createBinarySymbol(formula.operator);
    const leftOperand = convertFormulaToDraftExpression(
      formula.values[0] as PropositionalFormula
    );
    const rightOperand = convertFormulaToDraftExpression(
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
};

const convertFormulaToDraftFriendlyExpression = (
  formula: PropositionalFormula
): PropositionalExpression => {
  let output: PropositionalExpression = [];

  if (formula.operator === PropositionalOperator.Not) {
    output = [
      PREPARED_SYMBOLS.negation,
      ...convertFormulaToDraftFriendlyExpression(
        formula.values[0] as PropositionalFormula
      ),
    ];
  } else if (validator.isBinaryOperator(formula.operator)) {
    const operator = factory.createBinarySymbol(formula.operator);
    const leftOperand = convertFormulaToDraftFriendlyExpression(
      formula.values[0] as PropositionalFormula
    );
    const rightOperand = convertFormulaToDraftFriendlyExpression(
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
};

const convertStringToExpression = (input: string): PropositionalExpression => {
  const charsArray = parser.getCharsArray(input);
  const preparedArray = parser.joinLogicalSymbols(charsArray);
  const expression = preparedArray.map((char, index) =>
    factory.createPropositionalSymbol(char, index)
  );
  const withVariables = parenthesizer.parenthesizeVariables(expression);
  const withNegations = parenthesizer.parenthesizeNegations(withVariables);

  return parenthesizer.parenthesizeBinaryOperators(withNegations);
};

const convertExpressionToFormula = (
  expression: PropositionalExpression
): PropositionalFormula => {
  const mainSymbol = parser.findMainOperator(expression);
  if (validator.isIncorrectMainSymbol(mainSymbol)) {
    throw new Error("Cannot convert this expression to a formula.");
  }
  const operator = factory.createOperator(mainSymbol);

  if (validator.isBinaryOperator(operator)) {
    const { firstArgument, secondArgument } = parser.splitExpressionByPosition(
      mainSymbol.position,
      expression
    );

    return factory.createBinary(
      operator,
      convertExpressionToFormula(firstArgument),
      convertExpressionToFormula(secondArgument)
    );
  } else if (operator === PropositionalOperator.Not) {
    const argument = expression.slice(2, expression.length - 1);

    return factory.createNegation(convertExpressionToFormula(argument));
  } else {
    return factory.createAtom(mainSymbol);
  }
};

const convertFormulaToExpression = (
  formula: PropositionalFormula
): PropositionalExpression => {
  const expression = convertFormulaToDraftExpression(formula);

  return parenthesizer.renumberPositions(expression);
};

const convertStringToUserFriendlyExpression = (
  input: string
): PropositionalExpression => {
  const convertedInput = convertStringToExpression(input);
  const formula = convertExpressionToFormula(convertedInput);

  return convertFormulaToUserFriendlyExpression(formula);
};

const convertFormulaToUserFriendlyExpression = (
  formula: PropositionalFormula
): PropositionalExpression => {
  let expression = convertFormulaToDraftFriendlyExpression(formula);

  if (
    validator.isOpenParenthesisSymbol(expression[0]) &&
    validator.isCloseParenthesisSymbol(expression[expression.length - 1])
  ) {
    expression = parser.removeSurroundingElements(expression);
  }

  return parenthesizer.renumberPositions(expression);
};

const convertUserFriendlyExpressionToString = (
  expression: PropositionalExpression
): string => {
  const symbolsArray = expression.map(
    (item) => item.representation || item.input
  );

  return symbolsArray.join(" ");
};

const propositionalConverter = {
  convertToICExpression,
  convertToIDExpression,
  convertToCRExpression,
  convertToDisjunctionExpression,
  convertToConjunctionExpression,
  convertStringToExpression,
  convertExpressionToFormula,
  convertFormulaToExpression,
  convertFormulaToUserFriendlyExpression,
  convertStringToUserFriendlyExpression,
  convertUserFriendlyExpressionToString,
};

export default Object.freeze(propositionalConverter);
