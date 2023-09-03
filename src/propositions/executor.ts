import { NPFormulaBase } from "../enums/np-formula-base";
import { PropositionalOperator } from "../enums/propositional-operator";
import {
  NPExecutorData,
  NaturalProofsTableItem,
  PropositionalFormula,
} from "../types";
import { removeArrayItemByIndex } from "../utils/remove-array-item-by-index";
import converter from "./converter";
import factory from "./factory";
import validator from "./validator";
import crypto from "crypto";

const propositionalExecutor = {
  performIE(
    firstFormula: PropositionalFormula,
    secondFormula: PropositionalFormula
  ): PropositionalFormula {
    const isFirstImplication =
      firstFormula.operator === PropositionalOperator.Implies &&
      firstFormula.values.length === 2;
    const isSecondImplication =
      secondFormula.operator === PropositionalOperator.Implies &&
      secondFormula.values.length === 2;

    if (isFirstImplication && !isSecondImplication) {
      const antecedent = firstFormula.values[0] as PropositionalFormula;
      const consequent = firstFormula.values[1] as PropositionalFormula;

      if (validator.areTwoFormulasEqual(antecedent, secondFormula)) {
        return consequent;
      }
    }

    if (!isFirstImplication && isSecondImplication) {
      const antecedent = secondFormula.values[0] as PropositionalFormula;
      const consequent = secondFormula.values[1] as PropositionalFormula;

      if (validator.areTwoFormulasEqual(antecedent, firstFormula)) {
        return consequent;
      }
    }

    const firstAntecedent = firstFormula.values[0] as PropositionalFormula;
    const firstConsequent = firstFormula.values[1] as PropositionalFormula;
    const secondAntecedent = secondFormula.values[0] as PropositionalFormula;
    const secondConsequent = secondFormula.values[1] as PropositionalFormula;

    if (validator.areTwoFormulasEqual(firstAntecedent, secondFormula)) {
      return firstConsequent;
    } else if (validator.areTwoFormulasEqual(secondAntecedent, firstFormula)) {
      return secondConsequent;
    } else {
      throw new Error("Cannot perform the implication elimination.");
    }
  },

  performDI({
    rawInput,
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData & { rawInput: string }): NaturalProofsTableItem[] {
    const newItems: NaturalProofsTableItem[] = [];
    let itemsCounter = dataLength + 1;
    const operand = converter.convertStringToExpression(rawInput);

    for (const item of selectedItems) {
      const firstExpression = converter.convertToDisjunctionExpression(
        operand,
        item.expression
      );
      const secondExpression = converter.convertToDisjunctionExpression(
        item.expression,
        operand
      );
      const firstFormula =
        converter.convertExpressionToFormula(firstExpression);
      const secondFormula =
        converter.convertExpressionToFormula(secondExpression);
      const firstFriendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(firstFormula);
      const secondFriendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(secondFormula);

      const firstNewItem: NaturalProofsTableItem = {
        level,
        assumptionId,
        rawInput: `${rawInput}, ${item.rawInput}`,
        step: itemsCounter,
        id: crypto.randomUUID(),
        expression: firstExpression,
        formula: firstFormula,
        friendlyExpression: firstFriendlyExpression,
        comment: `DI: ${item.step}`,
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.DI,
      };

      const secondNewItem: NaturalProofsTableItem = {
        level,
        assumptionId,
        rawInput: `${item.rawInput}, ${rawInput}`,
        step: itemsCounter + 1,
        id: crypto.randomUUID(),
        expression: secondExpression,
        formula: secondFormula,
        friendlyExpression: secondFriendlyExpression,
        comment: `DI: ${item.step}`,
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.DI,
      };

      newItems.push(firstNewItem, secondNewItem);
      itemsCounter += 2;
    }

    return newItems;
  },

  performCI({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem[] {
    let itemsCounter = dataLength + 1;
    const isOneItemSelected = selectedItems.length === 1;
    const isEqualItemsSelected =
      selectedItems.length === 2 &&
      validator.areTwoFormulasEqual(
        selectedItems[0].formula,
        selectedItems[1].formula
      );

    if (isOneItemSelected || isEqualItemsSelected) {
      const operand = selectedItems[0].expression;
      const expression = converter.convertToConjunctionExpression(
        operand,
        operand
      );
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(formula);

      return [
        {
          level,
          assumptionId,
          rawInput: `${selectedItems[0].rawInput}, ${selectedItems[0].rawInput}`,
          step: itemsCounter,
          id: crypto.randomUUID(),
          expression,
          formula,
          friendlyExpression,
          comment: `CI: ${selectedItems[0].step}`,
          dependentOn: [selectedItems[0].id],
          formulaBase: NPFormulaBase.CI,
        },
      ];
    } else {
      const newItems: NaturalProofsTableItem[] = [];

      for (const item of selectedItems) {
        const restItems = selectedItems.filter((x) => x.id !== item.id);

        for (const restItem of restItems) {
          const expression = converter.convertToConjunctionExpression(
            restItem.expression,
            item.expression
          );
          const formula = converter.convertExpressionToFormula(expression);
          const friendlyExpression =
            converter.convertFormulaToUserFriendlyExpression(formula);

          newItems.push({
            level,
            assumptionId,
            rawInput: `${restItem.rawInput}, ${item.rawInput}`,
            step: itemsCounter,
            id: crypto.randomUUID(),
            expression,
            formula,
            friendlyExpression,
            comment: `CI: ${item.step}, ${restItem.step}`,
            dependentOn: [item.id, restItem.id],
            formulaBase: NPFormulaBase.CI,
          });

          itemsCounter += 1;
        }
      }

      return newItems;
    }
  },

  performDE({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const [item1, item2, item3] = selectedItems;
    const firstFormula = item1.formula;
    const secondFormula = item2.formula;
    const thirdFormula = item3.formula;
    if (!firstFormula || !secondFormula || !thirdFormula) {
      throw new Error("Cannot perform Disjunction Introduction.");
    }

    const formulasArray = [firstFormula, secondFormula, thirdFormula];
    const disjunctionFormulaIndex = formulasArray.findIndex(
      (item) => item.operator === PropositionalOperator.Or
    );
    const implications = removeArrayItemByIndex(
      formulasArray,
      disjunctionFormulaIndex
    );
    const newFormula = implications[0].values[1] as PropositionalFormula;
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      assumptionId,
      step,
      id: crypto.randomUUID(),
      rawInput: `${item1.rawInput}, ${item2.rawInput}, ${item3.rawInput}`,
      formulaBase: NPFormulaBase.DE,
      dependentOn: [item1.id, item2.id, item3.id],
      comment: `DE: ${item1.step}, ${item2.step}, ${item3.step}`,
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performCE({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem[] {
    const newItems: NaturalProofsTableItem[] = [];
    let itemsCounter = dataLength + 1;

    for (const item of selectedItems) {
      if (item.formula.operator !== PropositionalOperator.And) {
        throw new Error("Cannot perform Conjunction Elimination.");
      }

      const firstConjunct = item.formula.values[0] as PropositionalFormula;
      const secondConjunct = item.formula.values[1] as PropositionalFormula;

      const firstExpression =
        converter.convertFormulaToExpression(firstConjunct);
      const secondExpression =
        converter.convertFormulaToExpression(secondConjunct);
      const firstFriendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(firstConjunct);
      const secondFriendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(secondConjunct);

      const firstNewItem: NaturalProofsTableItem = {
        level,
        assumptionId,
        rawInput: `${item.rawInput}`,
        step: itemsCounter,
        id: crypto.randomUUID(),
        expression: firstExpression,
        formula: firstConjunct,
        friendlyExpression: firstFriendlyExpression,
        comment: `CE: ${item.step}`,
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.CE,
      };

      const secondNewItem: NaturalProofsTableItem = {
        level,
        assumptionId,
        rawInput: `${item.rawInput}`,
        step: itemsCounter + 1,
        id: crypto.randomUUID(),
        expression: secondExpression,
        formula: secondConjunct,
        friendlyExpression: secondFriendlyExpression,
        comment: `CE: ${item.step}`,
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.CE,
      };

      newItems.push(firstNewItem, secondNewItem);
      itemsCounter += 2;
    }

    return newItems;
  },

  performNI({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const [item1, item2] = selectedItems;
    const firstFormula = item1.formula;
    const secondFormula = item2.formula;

    if (!firstFormula || !secondFormula) {
      throw new Error("Cannot perform Negation Introduction.");
    }

    if (!validator.isNIApplicable([firstFormula, secondFormula])) {
      throw new Error("Cannot perform Negation Introduction.");
    }

    // if F => G and F => ~G, then ~F
    const antecedent = firstFormula.values[0] as PropositionalFormula;
    const newFormula = factory.createNegation(antecedent);
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      assumptionId,
      step,
      id: crypto.randomUUID(),
      rawInput: `${item1.rawInput}, ${item2.rawInput}`,
      formulaBase: NPFormulaBase.NI,
      dependentOn: [item1.id, item2.id],
      comment: `NI: ${item1.step}, ${item2.step}`,
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performNE({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const item = selectedItems[0];
    const selectedFormula = item.formula;

    if (!selectedFormula) {
      throw new Error("Cannot perform Negation Elimination.");
    }

    if (!validator.isNEApplicable([selectedFormula])) {
      throw new Error("Cannot perform Negation Elimination.");
    }

    const newFormula = (selectedFormula.values[0] as PropositionalFormula)
      .values[0] as PropositionalFormula;
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      assumptionId,
      step,
      id: crypto.randomUUID(),
      rawInput: `${item.rawInput}`,
      formulaBase: NPFormulaBase.NE,
      dependentOn: [item.id],
      comment: `NE: ${item.step}`,
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performEI({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem[] {
    // If F=>G and G=>F then F<=>G
    const step = dataLength + 1;
    const firstSelectedFormula = selectedItems[0].formula;
    const secondSelectedFormula = selectedItems[1].formula;

    if (
      !validator.isEIApplicable([firstSelectedFormula, secondSelectedFormula])
    ) {
      throw new Error("Cannot perform Equivalence Introduction.");
    }

    const firstOperand = firstSelectedFormula.values[0] as PropositionalFormula;
    const secondOperand = firstSelectedFormula
      .values[1] as PropositionalFormula;

    const firstEquivalence = factory.createBinary(
      PropositionalOperator.Equiv,
      firstOperand,
      secondOperand
    );
    const secondEquivalence = factory.createBinary(
      PropositionalOperator.Equiv,
      secondOperand,
      firstOperand
    );
    const firstExpression =
      converter.convertFormulaToExpression(firstEquivalence);
    const secondExpression =
      converter.convertFormulaToExpression(secondEquivalence);
    const firstFriendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(firstEquivalence);
    const secondFriendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(secondEquivalence);
    const comment = `EI: ${selectedItems[0].step}, ${selectedItems[1].step}`;
    const dependentOn = [selectedItems[0].id, selectedItems[1].id];

    const firstNewItem: NaturalProofsTableItem = {
      level,
      assumptionId,
      rawInput: `${selectedItems[0].rawInput}, ${selectedItems[1].rawInput}`,
      step: step,
      id: crypto.randomUUID(),
      expression: firstExpression,
      formula: firstEquivalence,
      friendlyExpression: firstFriendlyExpression,
      comment,
      dependentOn,
      formulaBase: NPFormulaBase.EI,
    };

    const secondNewItem: NaturalProofsTableItem = {
      level,
      assumptionId,
      rawInput: `${selectedItems[1].rawInput}, ${selectedItems[0].rawInput}`,
      step: step + 1,
      id: crypto.randomUUID(),
      expression: secondExpression,
      formula: secondEquivalence,
      friendlyExpression: secondFriendlyExpression,
      comment,
      dependentOn,
      formulaBase: NPFormulaBase.EI,
    };

    return [firstNewItem, secondNewItem];
  },

  performEE({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem[] {
    const newItems: NaturalProofsTableItem[] = [];
    let itemsCounter = dataLength + 1;

    for (const item of selectedItems) {
      if (item.formula.operator !== PropositionalOperator.Equiv) {
        throw new Error("Cannot perform Equivalence Elimination.");
      }

      const firstOperand = item.formula.values[0] as PropositionalFormula;
      const secondOperand = item.formula.values[1] as PropositionalFormula;

      const firstFormula = factory.createBinary(
        PropositionalOperator.Implies,
        firstOperand,
        secondOperand
      );
      const secondFormula = factory.createBinary(
        PropositionalOperator.Implies,
        secondOperand,
        firstOperand
      );

      const firstExpression =
        converter.convertFormulaToExpression(firstFormula);
      const secondExpression =
        converter.convertFormulaToExpression(secondFormula);
      const firstFriendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(firstFormula);
      const secondFriendlyExpression =
        converter.convertFormulaToUserFriendlyExpression(secondFormula);
      const comment = `EE: ${item.step}`;
      const dependentOn = [item.id];
      const formulaBase = NPFormulaBase.EE;
      const rawInput = `${item.rawInput}`;

      const firstNewItem: NaturalProofsTableItem = {
        step: itemsCounter,
        assumptionId,
        id: crypto.randomUUID(),
        formula: firstFormula,
        expression: firstExpression,
        friendlyExpression: firstFriendlyExpression,
        level,
        rawInput,
        comment,
        dependentOn,
        formulaBase,
      };

      const secondNewItem: NaturalProofsTableItem = {
        step: itemsCounter + 1,
        assumptionId,
        id: crypto.randomUUID(),
        formula: secondFormula,
        expression: secondExpression,
        friendlyExpression: secondFriendlyExpression,
        level,
        rawInput,
        comment,
        dependentOn,
        formulaBase,
      };

      newItems.push(firstNewItem, secondNewItem);
      itemsCounter += 2;
    }

    return newItems;
  },

  performIEforNP({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const firstFormula = selectedItems[0].formula;
    const secondFormula = selectedItems[1].formula;

    const newFormula = this.performIE(firstFormula, secondFormula);
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      step,
      assumptionId,
      id: crypto.randomUUID(),
      rawInput: `${selectedItems[0].rawInput}, ${selectedItems[1].rawInput}`,
      formulaBase: NPFormulaBase.IE,
      dependentOn: [selectedItems[0].id, selectedItems[1].id],
      comment: `IE: ${selectedItems[0].step}, ${selectedItems[1].step}`,
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performII({
    level,
    dataLength,
    selectedItems,
    assumptionId,
  }: NPExecutorData): NaturalProofsTableItem {
    const firstSubProofItem = selectedItems[0];
    const lastSubProofItem = selectedItems[selectedItems.length - 1];
    const firstSubProofFormula = firstSubProofItem.formula;
    const lastSubProofFormula = lastSubProofItem.formula;
    const step = dataLength + 1;

    if (!firstSubProofFormula || !lastSubProofFormula) {
      throw new Error("Cannot perform Implication Introduction.");
    }

    const newFormula = factory.createBinary(
      PropositionalOperator.Implies,
      firstSubProofFormula,
      lastSubProofFormula
    );
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(newFormula);
    const dependentOn =
      selectedItems.length > 1
        ? [firstSubProofItem.id, lastSubProofItem.id]
        : [firstSubProofItem.id];
    const newLevel = level - 1;
    const comment =
      selectedItems.length > 1
        ? `II: ${firstSubProofItem.step}, ${lastSubProofItem.step}`
        : `II: ${firstSubProofItem.step}`;

    return {
      level: newLevel,
      step,
      assumptionId,
      id: crypto.randomUUID(),
      rawInput: `${firstSubProofItem.rawInput}, ${lastSubProofItem.rawInput}`,
      formulaBase: NPFormulaBase.II,
      dependentOn,
      comment,
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },
};

export default Object.freeze(propositionalExecutor);
