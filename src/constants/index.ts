import {
  LogicalSymbolHexCode,
  LogicalSymbolRawInput,
} from "../enums/logical-symbols";
import { PropositionalSymbol } from "../types";

export const MAIN_LOGICAL_OPERATORS_LIST = [
  LogicalSymbolRawInput.Implication,
  LogicalSymbolRawInput.Conjunction,
  LogicalSymbolRawInput.Disjunction,
  LogicalSymbolRawInput.Negation,
  LogicalSymbolRawInput.Equivalence,
];

export const PARENTHESES_LIST = [
  LogicalSymbolRawInput.OpenParenthesis,
  LogicalSymbolRawInput.CloseParenthesis,
];

export const PREPARED_SYMBOLS: { [key in string]: PropositionalSymbol } = {
  openParenthesis: {
    input: LogicalSymbolRawInput.OpenParenthesis,
    representation: "(",
    type: "parentheses",
    position: 0,
  },

  closeParenthesis: {
    input: LogicalSymbolRawInput.CloseParenthesis,
    representation: ")",
    type: "parentheses",
    position: 0,
  },

  implication: {
    input: LogicalSymbolRawInput.Implication,
    representation: LogicalSymbolHexCode.Implication,
    type: "operator",
    position: 0,
  },

  conjunction: {
    input: LogicalSymbolRawInput.Conjunction,
    representation: LogicalSymbolHexCode.Conjunction,
    type: "operator",
    position: 0,
  },

  disjunction: {
    input: LogicalSymbolRawInput.Disjunction,
    representation: LogicalSymbolHexCode.Disjunction,
    type: "operator",
    position: 0,
  },

  equivalence: {
    input: LogicalSymbolRawInput.Equivalence,
    representation: LogicalSymbolHexCode.Equivalence,
    type: "operator",
    position: 0,
  },

  negation: {
    input: LogicalSymbolRawInput.Negation,
    representation: LogicalSymbolHexCode.Negation,
    type: "operator",
    position: 0,
  },
};
