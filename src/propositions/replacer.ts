import {
  DirectProofsTableItem,
  NaturalProofsTableItem,
  PropositionalExpression,
  PropositionalSymbol,
} from "../types";
import converter from "./converter";

const propositionalReplacer = {
  replacePropositionalVariableInDPTableItems(
    data: DirectProofsTableItem[],
    newVariable: string,
    oldVariable: string
  ): DirectProofsTableItem[] {
    return data.map((item) =>
      this.replacePropositionalVariableInDPItem(item, newVariable, oldVariable)
    );
  },

  replacePropositionalVariableInNPTableItems(
    data: NaturalProofsTableItem[],
    newVariable: string,
    oldVariable: string
  ): NaturalProofsTableItem[] {
    return data.map((item) =>
      this.replacePropositionalVariableInNPItem(item, newVariable, oldVariable)
    );
  },

  replacePropositionalVariableInNPItem(
    item: NaturalProofsTableItem,
    newVariable: string,
    oldVariable: string
  ): NaturalProofsTableItem {
    const newExpression = this.replaceVariableInPropositionalExpression(
      item.expression,
      newVariable,
      oldVariable
    );
    const newFormula = converter.convertExpressionToFormula(newExpression);
    const newFriendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      ...item,
      rawInput: this.replaceVariableInRawInput(
        item.rawInput,
        newVariable,
        oldVariable
      ),
      expression: newExpression,
      formula: newFormula,
      friendlyExpression: newFriendlyExpression,
    };
  },

  replacePropositionalVariableInDPItem(
    item: DirectProofsTableItem,
    newVariable: string,
    oldVariable: string
  ): DirectProofsTableItem {
    const newExpression = this.replaceVariableInPropositionalExpression(
      item.expression,
      newVariable,
      oldVariable
    );
    const newFormula = converter.convertExpressionToFormula(newExpression);
    const newFriendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      ...item,
      rawInput: this.replaceVariableInRawInput(
        item.rawInput,
        newVariable,
        oldVariable
      ),
      expression: newExpression,
      formula: newFormula,
      friendlyExpression: newFriendlyExpression,
    };
  },

  replaceVariableInRawInput(
    input: string,
    newVariable: string,
    oldVariable: string
  ): string {
    return (input as any).replaceAll(oldVariable, newVariable);
  },

  replaceVariableInPropositionalExpression(
    input: PropositionalExpression,
    newVariable: string,
    oldVariable: string
  ): PropositionalExpression {
    return input.map((symbol) =>
      this.replaceVariableInPropositionalSymbol(
        symbol,
        newVariable,
        oldVariable
      )
    );
  },

  replaceVariableInPropositionalSymbol(
    symbol: PropositionalSymbol,
    newVariable: string,
    oldVariable: string
  ): PropositionalSymbol {
    if (symbol.type !== "variable") {
      return symbol;
    }

    if (symbol.input.toUpperCase() !== oldVariable.toUpperCase()) {
      return symbol;
    }

    return {
      ...symbol,
      input: newVariable,
      representation: newVariable.toUpperCase(),
    };
  },
};

export default Object.freeze(propositionalReplacer);
