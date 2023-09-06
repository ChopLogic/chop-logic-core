import { NPFormulaBase } from "../enums/np-formula-base";
import { PropositionalOperator } from "../enums/propositional-operator";
import { XMLTag } from "../enums/xml-tags";
import {
  DirectProofsTableItem,
  LocalText,
  NaturalProofsTableItem,
  PropositionalExpression,
  PropositionalFormula,
  PropositionalSymbol,
} from "../types";

const idToXML = (id: string): string =>
  `${XMLTag.IdOpen}${id}${XMLTag.IdClose}`;

const stepToXML = (step: number): string =>
  `${XMLTag.StepOpen}${step}${XMLTag.StepClose}`;

const levelToXML = (level: number): string =>
  `${XMLTag.LevelOpen}${level}${XMLTag.LevelClose}`;

const formulaBaseToXML = (base: NPFormulaBase): string =>
  `${XMLTag.FBaseOpen}${base}${XMLTag.FBaseClose}`;

const assumptionIdToXML = (id: string | null): string =>
  `${XMLTag.AIDOpen}${id || "null"}${XMLTag.AIDClose}`;

const rawInputToXML = (rawInput: string): string =>
  `${XMLTag.RInputOpen}${rawInput}${XMLTag.RInputClose}`;

const operatorToXML = (operator: PropositionalOperator): string =>
  `${XMLTag.OperatorOpen}${operator.toString()}${XMLTag.OperatorClose}`;

const commentToXML = (comment: string | LocalText): string => {
  if (typeof comment === "string") {
    return `${XMLTag.CommentOpen}${comment}${XMLTag.CommentClose}`;
  } else {
    const pairs: string[] = [];

    for (const lang in comment) {
      const pair = `<${lang}>${comment[lang]}</${lang}>`;
      pairs.push(pair);
    }

    return `${XMLTag.CommentOpen}${pairs.join("")}${XMLTag.CommentClose}`;
  }
};

const dependentOnToXML = (dependentOn: string[] | null): string => {
  if (!dependentOn) {
    return `${XMLTag.DepOpen}${XMLTag.DepClose}`;
  } else {
    const ids = dependentOn.map(
      (id) => `${XMLTag.DIDOpen}${id}${XMLTag.DIDClose}`
    );

    return `${XMLTag.DepOpen}${ids.join("")}${XMLTag.DepClose}`;
  }
};

const symbolToXML = (symbol: PropositionalSymbol): string =>
  `${XMLTag.PSymbolOpen}${XMLTag.InputOpen}${symbol.input}${XMLTag.InputClose}${
    XMLTag.TypeOpen
  }${symbol.type}${XMLTag.TypeClose}${XMLTag.PositionOpen}${symbol.position}${
    XMLTag.PositionClose
  }${XMLTag.RepresentOpen}${symbol.representation || ""}${
    XMLTag.RepresentClose
  }${XMLTag.PSymbolClose}`;

const formulaToXML = (formula: PropositionalFormula): string => {
  if (
    Array.isArray(formula.values) &&
    formula.operator !== PropositionalOperator.Var
  ) {
    const nestedFormulas = formula.values
      .map((value) => formulaToXML(value))
      .join("");

    return `${XMLTag.PFormulaOpen}${operatorToXML(formula.operator)}${
      XMLTag.ValuesOpen
    }${nestedFormulas}${XMLTag.ValuesClose}${XMLTag.PFormulaClose}`;
  } else {
    return `${XMLTag.PFormulaOpen}${operatorToXML(formula.operator)}${
      XMLTag.ValuesOpen
    }${formula.values.toString()}${XMLTag.ValuesClose}${XMLTag.PFormulaClose}`;
  }
};

const expressionToXML = (expression: PropositionalExpression): string => {
  const symbols = expression.map((symbol) => symbolToXML(symbol));

  return `${XMLTag.PExpressionOpen}${symbols.join("")}${
    XMLTag.PExpressionClose
  }`;
};

const dpArrayToXML = (data: DirectProofsTableItem[]): string =>
  data.map((item) => dpItemToXML(item)).join("");

const npArrayToXML = (data: NaturalProofsTableItem[]): string =>
  data.map((item) => npItemToXML(item)).join("");

const dpItemToXML = (item: DirectProofsTableItem): string =>
  `${XMLTag.TItemOpen}${idToXML(item.id)}${stepToXML(item.step)}${rawInputToXML(
    item.rawInput
  )}${commentToXML(item.comment)}${dependentOnToXML(
    item.dependentOn
  )}${formulaToXML(item.formula)}${expressionToXML(item.expression)}${
    XMLTag.TItemClose
  }`;

const npItemToXML = (item: NaturalProofsTableItem): string =>
  `${XMLTag.TItemOpen}${idToXML(item.id)}${stepToXML(item.step)}${rawInputToXML(
    item.rawInput
  )}${commentToXML(item.comment)}${dependentOnToXML(
    item.dependentOn
  )}${formulaToXML(item.formula)}${expressionToXML(
    item.expression
  )}${levelToXML(item.level)}${formulaBaseToXML(
    item.formulaBase
  )}${assumptionIdToXML(item.assumptionId)}${XMLTag.TItemClose}`;

const npToXML = (tableData: NaturalProofsTableItem[]): string =>
  `${XMLTag.Declaration}\n${XMLTag.NPOpen}${npArrayToXML(tableData)}${
    XMLTag.NPClose
  }`;

const dpToXML = (tableData: DirectProofsTableItem[]): string =>
  `${XMLTag.Declaration}\n${XMLTag.DPOpen}${dpArrayToXML(tableData)}${
    XMLTag.DPClose
  }`;

const converterXML = {
  npToXML,
  dpToXML,
};

export default Object.freeze(converterXML);
