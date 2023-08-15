import {
  MAIN_LOGICAL_OPERATORS_LIST,
  PARENTHESES_LIST,
  PREPARED_SYMBOLS,
} from "../constants";
import {
  LogicalSymbolHexCode,
  LogicalSymbolRawInput,
} from "../enums/logical-symbols";
import { PropositionalOperator } from "../enums/propositional-operator";
import { regularExpressions } from "../reg-exp";
import { PropositionalFormula, PropositionalSymbol } from "../types";

const propositionalFactory = {
  createOperator(symbol: PropositionalSymbol): PropositionalOperator {
    switch (symbol.input) {
      case LogicalSymbolRawInput.Negation: {
        return PropositionalOperator.Not;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return PropositionalOperator.And;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return PropositionalOperator.Or;
      }
      case LogicalSymbolRawInput.Implication: {
        return PropositionalOperator.Implies;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return PropositionalOperator.Equiv;
      }
      default: {
        if (symbol.type === "variable") {
          return PropositionalOperator.Var;
        } else {
          throw new Error(
            `Cannot create an operator from input "${symbol.input}".`
          );
        }
      }
    }
  },

  getSymbolRepresentation(char: string): LogicalSymbolHexCode {
    switch (char) {
      case LogicalSymbolRawInput.Implication: {
        return LogicalSymbolHexCode.Implication;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return LogicalSymbolHexCode.Conjunction;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return LogicalSymbolHexCode.Disjunction;
      }
      case LogicalSymbolRawInput.Negation: {
        return LogicalSymbolHexCode.Negation;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return LogicalSymbolHexCode.Equivalence;
      }
      default: {
        throw new Error(
          `Cannot get a logical representation of the symbol "${char}".`
        );
      }
    }
  },

  createPropositionalSymbol(
    char: string,
    position: number
  ): PropositionalSymbol {
    if (MAIN_LOGICAL_OPERATORS_LIST.includes(char as LogicalSymbolRawInput)) {
      return {
        input: char,
        representation: this.getSymbolRepresentation(char),
        type: "operator",
        position,
      };
    } else if (PARENTHESES_LIST.includes(char as LogicalSymbolRawInput)) {
      return {
        input: char,
        representation: char,
        type: "parentheses",
        position,
      };
    } else if (regularExpressions.onlyLatinLetters.test(char)) {
      return {
        input: char,
        representation: char.toLocaleUpperCase(),
        type: "variable",
        position,
      };
    } else {
      throw new Error(
        `Cannot create a propositional symbol from the input "${char}".`
      );
    }
  },

  createAtom(symbol: PropositionalSymbol): PropositionalFormula {
    return {
      operator: PropositionalOperator.Var,
      values: symbol.representation || symbol.input.toLocaleUpperCase(),
    };
  },

  createBinary(
    operator: PropositionalOperator,
    firstArgument: PropositionalFormula,
    secondArgument: PropositionalFormula
  ): PropositionalFormula {
    return {
      operator,
      values: [firstArgument, secondArgument],
    };
  },

  createNegation(argument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Not,
      values: [argument],
    };
  },

  createBinarySymbol(input: PropositionalOperator): PropositionalSymbol {
    switch (input) {
      case "OR": {
        return PREPARED_SYMBOLS.disjunction;
      }
      case "AND": {
        return PREPARED_SYMBOLS.conjunction;
      }
      case "IMPLIES": {
        return PREPARED_SYMBOLS.implication;
      }
      case "EQUIV": {
        return PREPARED_SYMBOLS.equivalence;
      }
      default: {
        throw new Error(
          `Cannot convert the given propositional operator to a user friendly expression: ${input}`
        );
      }
    }
  },
};

export default Object.freeze(propositionalFactory);
