import searcher from "./searcher";
import {
  NaturalProofsTableItem,
  PropositionalExpression,
  PropositionalFormula,
  PropositionalSymbol,
} from "../types";
import { LogicalSymbolRawInput } from "../enums/logical-symbols";
import { PropositionalOperator } from "../enums/propositional-operator";
import { removeArrayItemByIndex } from "../utils/remove-array-item-by-index";
import { NPFormulaBase } from "../enums/np-formula-base";

const propositionalValidator = {
  isPropositionalExpression(array: any): array is PropositionalExpression {
    if (!array || !Array.isArray(array)) {
      return false;
    }

    for (const item of array) {
      if (item.input === undefined || item.type === undefined) {
        return false;
      }
    }

    return true;
  },

  isIncorrectMainSymbol(symbol: PropositionalSymbol): boolean {
    return !(symbol.type === "variable" || symbol.type === "operator");
  },

  isOpenParenthesisSymbol(symbol: PropositionalSymbol | undefined): boolean {
    if (!symbol) {
      return false;
    }

    return (
      symbol.type === "parentheses" &&
      symbol.input === LogicalSymbolRawInput.OpenParenthesis
    );
  },

  isCloseParenthesisSymbol(symbol: PropositionalSymbol | undefined): boolean {
    if (!symbol) {
      return false;
    }

    return (
      symbol.type === "parentheses" &&
      symbol.input === LogicalSymbolRawInput.CloseParenthesis
    );
  },

  isBinaryOperator(operator: PropositionalOperator): boolean {
    return !(
      operator === PropositionalOperator.Var ||
      operator === PropositionalOperator.Not
    );
  },

  isNegationSymbol(symbol: PropositionalSymbol): boolean {
    return (
      symbol.type === "operator" &&
      symbol.input === LogicalSymbolRawInput.Negation
    );
  },

  isBinarySymbol(symbol: PropositionalSymbol): boolean {
    const isBinaryInput =
      symbol.input === LogicalSymbolRawInput.Conjunction ||
      symbol.input === LogicalSymbolRawInput.Disjunction ||
      symbol.input === LogicalSymbolRawInput.Implication ||
      symbol.input === LogicalSymbolRawInput.Equivalence;

    return symbol.type === "operator" && isBinaryInput;
  },

  checkNumberOfParenthesis(
    openIndexes: number[],
    closeIndexes: number[]
  ): void {
    if (openIndexes.length !== closeIndexes.length) {
      throw new Error(
        "The number of open parenthesis does not match with the number of close parenthesis."
      );
    }
  },

  isVariableParenthesized(
    variable: PropositionalSymbol,
    expression: PropositionalExpression
  ): boolean {
    const leftSymbol = expression.find(
      (symbol) => symbol.position === variable.position - 1
    );
    const rightSymbol = expression.find(
      (symbol) => symbol.position === variable.position + 1
    );

    return (
      this.isOpenParenthesisSymbol(leftSymbol) &&
      this.isCloseParenthesisSymbol(rightSymbol)
    );
  },

  isNegationParenthesized(
    operator: PropositionalSymbol,
    expression: PropositionalExpression
  ): boolean {
    const leftSymbol = expression.find(
      (symbol) => symbol.position === operator.position - 1
    );
    if (!this.isOpenParenthesisSymbol(leftSymbol) || !leftSymbol) {
      return false;
    }

    const rightSymbol = searcher.findMatchingCloseParenthesis(
      expression,
      leftSymbol
    );

    if (this.isCloseParenthesisSymbol(rightSymbol) && rightSymbol) {
      return rightSymbol.position - leftSymbol.position <= 5;
    }

    return false;
  },

  isBinaryOperatorParenthesized(
    operator: PropositionalSymbol,
    expression: PropositionalExpression
  ): boolean {
    const leftSymbol = expression.find(
      (symbol) => symbol.position === operator.position - 1
    );
    if (!this.isCloseParenthesisSymbol(leftSymbol) || !leftSymbol) {
      return false;
    }

    const rightSymbol = expression.find(
      (symbol) => symbol.position === operator.position + 1
    );
    if (!this.isOpenParenthesisSymbol(rightSymbol) || !rightSymbol) {
      return false;
    }

    const leftOpenParenthesis = searcher.findMatchingOpenParenthesis(
      expression,
      leftSymbol
    );
    const rightCloseParenthesis = searcher.findMatchingCloseParenthesis(
      expression,
      rightSymbol
    );

    if (!leftOpenParenthesis || !rightCloseParenthesis) {
      return false;
    }

    const leftOpenSecondParenthesis = expression.find(
      (symbol) => symbol.position === leftOpenParenthesis.position - 1
    );
    const rightCloseSecondParenthesis = expression.find(
      (symbol) => symbol.position === rightCloseParenthesis.position + 1
    );

    return (
      this.isOpenParenthesisSymbol(leftOpenSecondParenthesis) &&
      this.isCloseParenthesisSymbol(rightCloseSecondParenthesis)
    );
  },

  isIEApplicable(
    first: PropositionalFormula,
    second: PropositionalFormula
  ): boolean {
    const isFirstImplication =
      first.operator === PropositionalOperator.Implies &&
      first.values.length === 2;
    const isSecondImplication =
      second.operator === PropositionalOperator.Implies &&
      second.values.length === 2;

    // One implication in the first formula
    if (isFirstImplication && !isSecondImplication) {
      const antecedent = first.values[0];

      return this.areTwoFormulasEqual(antecedent, second);
    }

    // One implication in the second formula
    if (!isFirstImplication && isSecondImplication) {
      const antecedent = second.values[0];

      return this.areTwoFormulasEqual(antecedent, first);
    }

    // Two implications
    if (isFirstImplication && isSecondImplication) {
      const firstAntecedent = first.values[0];
      const secondAntecedent = second.values[0];

      return (
        this.areTwoFormulasEqual(firstAntecedent, second) ||
        this.areTwoFormulasEqual(secondAntecedent, first)
      );
    }

    return false;
  },

  areTwoFormulasEqual(
    first: string | PropositionalFormula,
    second: string | PropositionalFormula
  ): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  },

  isDEApplicable(
    firstFormula: PropositionalFormula,
    secondFormula: PropositionalFormula,
    thirdFormula: PropositionalFormula
  ): boolean {
    // if F | G, F => H, G => H, then H
    const formulasArray = [firstFormula, secondFormula, thirdFormula];
    const disjunctionFormulaIndex = formulasArray.findIndex(
      (item) => item.operator === PropositionalOperator.Or
    );

    if (disjunctionFormulaIndex === -1) {
      return false;
    }

    const disjunction = formulasArray[disjunctionFormulaIndex];

    const [firstImplication, secondImplication] = removeArrayItemByIndex(
      formulasArray,
      disjunctionFormulaIndex
    );

    if (
      firstImplication.operator !== PropositionalOperator.Implies ||
      secondImplication.operator !== PropositionalOperator.Implies
    ) {
      return false;
    }

    const firstAntecedent = firstImplication.values[0];
    const secondAntecedent = secondImplication.values[0];
    const firstClose = disjunction.values[0];
    const secondClose = disjunction.values[1];

    const firstMatch =
      this.areTwoFormulasEqual(firstAntecedent, firstClose) &&
      this.areTwoFormulasEqual(secondAntecedent, secondClose);
    const secondMatch =
      this.areTwoFormulasEqual(firstAntecedent, secondClose) &&
      this.areTwoFormulasEqual(secondAntecedent, firstClose);

    if (!firstMatch && !secondMatch) {
      return false;
    }

    const firstConsequent = firstImplication.values[1];
    const secondConsequent = secondImplication.values[1];
    const areConsequencesDifferent = !this.areTwoFormulasEqual(
      firstConsequent,
      secondConsequent
    );

    return !areConsequencesDifferent;
  },

  isCEApplicable(formulas: PropositionalFormula[]): boolean {
    return formulas.every(
      (item) => item.operator === PropositionalOperator.And
    );
  },

  isNIApplicable(formulas: PropositionalFormula[]): boolean {
    // if F => G and F => ~G, then ~F
    const [firstFormula, secondFormula] = formulas;
    const isTwoImplications =
      firstFormula.operator === PropositionalOperator.Implies &&
      secondFormula.operator === PropositionalOperator.Implies;

    if (!isTwoImplications) {
      return false;
    }

    const firstAntecedent = firstFormula.values[0] as PropositionalFormula;
    const secondAntecedent = secondFormula.values[0] as PropositionalFormula;

    if (!this.areTwoFormulasEqual(firstAntecedent, secondAntecedent)) {
      return false;
    }

    const firstConsequent = firstFormula.values[1] as PropositionalFormula;
    const secondConsequent = secondFormula.values[1] as PropositionalFormula;

    if (firstConsequent.operator === PropositionalOperator.Not) {
      const firstSubFormula = firstConsequent.values[0] as PropositionalFormula;

      if (this.areTwoFormulasEqual(firstSubFormula, secondConsequent)) {
        return true;
      }
    }

    if (secondConsequent.operator === PropositionalOperator.Not) {
      const secondSubFormula = secondConsequent
        .values[0] as PropositionalFormula;

      if (this.areTwoFormulasEqual(secondSubFormula, firstConsequent)) {
        return true;
      }
    }

    return false;
  },

  isNEApplicable(formulas: PropositionalFormula[]): boolean {
    const formula = formulas[0];
    const subFormula = formula.values[0] as PropositionalFormula;

    return (
      formula.operator === PropositionalOperator.Not &&
      subFormula.operator === PropositionalOperator.Not
    );
  },

  isEIApplicable(formulas: PropositionalFormula[]): boolean {
    const [firstFormula, secondFormula] = formulas;

    if (
      firstFormula.operator !== PropositionalOperator.Implies ||
      secondFormula.operator !== PropositionalOperator.Implies
    ) {
      return false;
    }

    const firstAntecedent = firstFormula.values[0] as PropositionalFormula;
    const firstConsequent = firstFormula.values[1] as PropositionalFormula;
    const secondAntecedent = secondFormula.values[0] as PropositionalFormula;
    const secondConsequent = secondFormula.values[1] as PropositionalFormula;

    return (
      this.areTwoFormulasEqual(firstAntecedent, secondConsequent) &&
      this.areTwoFormulasEqual(firstConsequent, secondAntecedent)
    );
  },

  isEEApplicable(formulas: PropositionalFormula[]): boolean {
    return formulas.every(
      (formula) => formula.operator === PropositionalOperator.Equiv
    );
  },

  isIEforNPApplicable(formulas: PropositionalFormula[]): boolean {
    return this.isIEApplicable(formulas[0], formulas[1]);
  },

  isItemsLevelsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    const isAllOnOneLevel = items.every(
      (item) => item.level === items[0].level
    );
    const isAllInOneSubProof = items.every(
      (item) => item.assumptionId === items[0].assumptionId
    );

    if (isAllOnOneLevel && isAllInOneSubProof) {
      return true;
    } else if (isAllOnOneLevel && !isAllInOneSubProof) {
      return false;
    } else {
      return items.every((item) => item.level <= currentLevel);
    }
  },

  isDEItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (items.length !== 3) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isCEItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (!items.length) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isNIItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (items.length !== 2) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isNEItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (items.length !== 1) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isEIItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (items.length !== 2) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isEEItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (!items.length) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isIEItemsCompatible(
    items: NaturalProofsTableItem[],
    currentLevel: number
  ): boolean {
    if (items.length !== 2) {
      return false;
    }

    return this.isItemsLevelsCompatible(items, currentLevel);
  },

  isIIItemsCompatible(
    selectedItems: NaturalProofsTableItem[],
    lastItem?: NaturalProofsTableItem
  ): boolean {
    if (
      !selectedItems.length ||
      selectedItems.length > 2 ||
      selectedItems[0].level === 0
    ) {
      return false;
    }

    if (selectedItems.length === 1 && lastItem?.id === selectedItems[0].id) {
      return true;
    }

    return (
      selectedItems.length === 2 &&
      selectedItems[0].formulaBase === NPFormulaBase.Assumption &&
      lastItem?.id === selectedItems[1].id &&
      selectedItems[0].assumptionId === selectedItems[1].assumptionId
    );
  },
};

export default Object.freeze(propositionalValidator);
