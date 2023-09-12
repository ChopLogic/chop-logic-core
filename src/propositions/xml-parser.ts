import { LANGUAGE_OPTIONS } from "../constants";
import { NPFormulaBase } from "../enums/np-formula-base";
import { XMLTag } from "../enums/xml-tags";
import { regularExpressions } from "../reg-exp";
import {
  DirectProofsTableItem,
  NaturalProofsTableItem,
  PropositionalExpression,
  PropositionalSymbol,
  PropositionalSymbolType,
} from "../types";
import converter from "./converter";

const removeDeclaration = (input: string): string =>
  input.replace(regularExpressions.xmlDeclaration, "");

const parseStep = (input: string): number => {
  const value = +input
    .replace(XMLTag.StepOpen, "")
    .replace(XMLTag.StepClose, "");

  if (isNaN(value)) {
    throw new Error("Cannot convert the step value from XML tag.");
  }

  return value;
};

const parseLevel = (input: string): number => {
  const value = +input
    .replace(XMLTag.LevelOpen, "")
    .replace(XMLTag.LevelClose, "");

  if (isNaN(value)) {
    throw new Error("Cannot convert the step value from XML tag.");
  }

  return value;
};

const parseFormulaBase = (input: string): NPFormulaBase =>
  input
    .replace(XMLTag.FBaseOpen, "")
    .replace(XMLTag.FBaseClose, "") as NPFormulaBase;

const parseAssumptionId = (input: string): string | null => {
  const value = input.replace(XMLTag.AIDOpen, "").replace(XMLTag.AIDClose, "");

  if (value === "null") {
    return null;
  } else {
    return value;
  }
};

const parseRawInput = (input: string): string =>
  input.replace(XMLTag.RInputOpen, "").replace(XMLTag.RInputClose, "");

const parseId = (input: string): string =>
  input.replace(XMLTag.IdOpen, "").replace(XMLTag.IdClose, "");

const parseDependentId = (input: string): string =>
  input.replace(XMLTag.DIDOpen, "").replace(XMLTag.DIDClose, "");

const parseExpressionInput = (input: string): string =>
  input.replace(XMLTag.InputOpen, "").replace(XMLTag.InputClose, "");

const parseExpressionRepresentation = (input: string): string =>
  input.replace(XMLTag.RepresentOpen, "").replace(XMLTag.RepresentClose, "");

const parseExpressionType = (input: string): string =>
  input.replace(XMLTag.TypeOpen, "").replace(XMLTag.TypeClose, "");

const parseExpressionPosition = (input: string): number => {
  const value = +input
    .replace(XMLTag.PositionOpen, "")
    .replace(XMLTag.PositionClose, "");

  if (isNaN(value)) {
    throw new Error("Cannot convert the step value from XML tag.");
  }

  return value;
};

const parsePropositionalSymbol = (input: string): PropositionalSymbol => {
  const values = input
    .replace(XMLTag.PSymbolOpen, "")
    .replace(XMLTag.PSymbolClose, "");

  const inputMatch = values.match(
    new RegExp(XMLTag.InputOpen + ".*" + XMLTag.InputClose, "i")
  )![0];
  const representationMatch = values.match(
    new RegExp(XMLTag.RepresentOpen + ".*" + XMLTag.RepresentClose, "i")
  )![0];
  const typeMatch = values.match(
    new RegExp(XMLTag.TypeOpen + ".*" + XMLTag.TypeClose, "i")
  )![0];
  const positionMatch = values.match(
    new RegExp(XMLTag.PositionOpen + ".*" + XMLTag.PositionClose, "i")
  )![0];

  return {
    input: parseExpressionInput(inputMatch),
    representation: parseExpressionRepresentation(representationMatch),
    type: parseExpressionType(typeMatch) as PropositionalSymbolType,
    position: parseExpressionPosition(positionMatch),
  };
};

const parsePropositionalExpression = (
  input: string
): PropositionalExpression => {
  const value = input
    .replace(XMLTag.PExpressionOpen, "")
    .replace(XMLTag.PExpressionClose, "");
  const symbolsStrings = value.split(
    new RegExp("(?=" + XMLTag.PSymbolOpen + ")", "g")
  );
  const result: PropositionalExpression = [];

  for (const item of symbolsStrings) {
    try {
      const symbol = parsePropositionalSymbol(item);
      result.push(symbol);
    } catch (error: unknown) {
      throw new Error(`Cannot convert the propositional symbol from "${item}"`);
    }
  }

  return result;
};

const parseComment = (input: string): string => {
  const value = input
    .replace(XMLTag.CommentOpen, "")
    .replace(XMLTag.CommentClose, "");
  const localTextResult: any = {};

  for (const lang of LANGUAGE_OPTIONS) {
    // Check if value is a simple string
    if (value.indexOf(lang) === -1) {
      return value;
    } else {
      // Extract the local comment text
      const localComment = value.match(
        new RegExp(`<${lang}>` + ".*" + `</${lang}>`, "i")
      )![0];
      const text = localComment
        .replace(`<${lang}>`, "")
        .replace(`</${lang}>`, "");

      localTextResult[lang] = text;
    }
  }

  return localTextResult;
};

const parseDependentOn = (input: string): string[] | null => {
  const value = input.replace(XMLTag.DepOpen, "").replace(XMLTag.DepClose, "");
  const idMatches = value.match(
    new RegExp(XMLTag.DIDOpen + ".*" + XMLTag.DIDClose, "i")
  );

  if (value === "" || !idMatches || !idMatches.length) {
    return null;
  }

  const result: string[] = [];

  idMatches.forEach((match) => {
    result.push(parseDependentId(match));
  });

  return result;
};

const parseDPTableItem = (input: string): DirectProofsTableItem => {
  const value = input
    .replace(XMLTag.TItemOpen, "")
    .replace(XMLTag.TItemClose, "");

  try {
    const idMatch = value.match(
      new RegExp(XMLTag.IdOpen + ".*" + XMLTag.IdClose, "i")
    )![0];
    const stepMatch = value.match(
      new RegExp(XMLTag.StepOpen + ".*" + XMLTag.StepClose, "i")
    )![0];
    const rawInputMatch = value.match(
      new RegExp(XMLTag.RInputOpen + ".*" + XMLTag.RInputClose, "i")
    )![0];
    const expressionMatch = value.match(
      new RegExp(XMLTag.PExpressionOpen + ".*" + XMLTag.PExpressionClose, "i")
    )![0];
    const commentMatch = value.match(
      new RegExp(XMLTag.CommentOpen + ".*" + XMLTag.CommentClose, "i")
    )![0];
    const dependentOnMatch = value.match(
      new RegExp(XMLTag.DepOpen + ".*" + XMLTag.DepClose, "i")
    )![0];

    const id = parseId(idMatch);
    const step = parseStep(stepMatch);
    const rawInput = parseRawInput(rawInputMatch);
    const expression = parsePropositionalExpression(expressionMatch);
    const comment = parseComment(commentMatch);
    const dependentOn = parseDependentOn(dependentOnMatch);
    const formula = converter.convertExpressionToFormula(expression);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(formula);

    return {
      id,
      step,
      rawInput,
      expression,
      comment,
      formula,
      friendlyExpression,
      dependentOn,
    };
  } catch (error: unknown) {
    throw new Error("Cannot convert the table item from XML.");
  }
};

const parseNPTableItem = (input: string): NaturalProofsTableItem => {
  const value = input
    .replace(XMLTag.TItemOpen, "")
    .replace(XMLTag.TItemClose, "");

  try {
    const idMatch = value.match(
      new RegExp(XMLTag.IdOpen + ".*" + XMLTag.IdClose, "i")
    )![0];
    const stepMatch = value.match(
      new RegExp(XMLTag.StepOpen + ".*" + XMLTag.StepClose, "i")
    )![0];
    const rawInputMatch = value.match(
      new RegExp(XMLTag.RInputOpen + ".*" + XMLTag.RInputClose, "i")
    )![0];
    const expressionMatch = value.match(
      new RegExp(XMLTag.PExpressionOpen + ".*" + XMLTag.PExpressionClose, "i")
    )![0];
    const commentMatch = value.match(
      new RegExp(XMLTag.CommentOpen + ".*" + XMLTag.CommentClose, "i")
    )![0];
    const levelMatch = value.match(
      new RegExp(XMLTag.LevelOpen + ".*" + XMLTag.LevelClose, "i")
    )![0];
    const formulaBaseMatch = value.match(
      new RegExp(XMLTag.FBaseOpen + ".*" + XMLTag.FBaseClose, "i")
    )![0];
    const assumptionIdMatch = value.match(
      new RegExp(XMLTag.AIDOpen + ".*" + XMLTag.AIDClose, "i")
    )![0];
    const dependentOnMatch = value.match(
      new RegExp(XMLTag.DepOpen + ".*" + XMLTag.DepClose, "i")
    )![0];

    const id = parseId(idMatch);
    const step = parseStep(stepMatch);
    const rawInput = parseRawInput(rawInputMatch);
    const expression = parsePropositionalExpression(expressionMatch);
    const comment = parseComment(commentMatch);
    const level = parseLevel(levelMatch);
    const dependentOn = parseDependentOn(dependentOnMatch);
    const formulaBase = parseFormulaBase(formulaBaseMatch);
    const assumptionId = parseAssumptionId(assumptionIdMatch);
    const formula = converter.convertExpressionToFormula(expression);
    const friendlyExpression =
      converter.convertFormulaToUserFriendlyExpression(formula);

    return {
      id,
      step,
      rawInput,
      expression,
      comment,
      formula,
      friendlyExpression,
      level,
      formulaBase,
      assumptionId,
      dependentOn,
    };
  } catch (error: unknown) {
    throw new Error("Cannot convert the table item from XML.");
  }
};

const xmlToDPTableData = (input: string): DirectProofsTableItem[] => {
  const withoutDeclaration = removeDeclaration(input).trim();
  const withoutDPTag = withoutDeclaration
    .replace(XMLTag.DPOpen, "")
    .replace(XMLTag.DPClose, "");
  const tableItems = withoutDPTag.split(
    new RegExp("(?=" + XMLTag.TItemOpen + ")", "g")
  );

  return tableItems.map((item) => parseDPTableItem(item));
};

const xmlToNPTableData = (input: string): NaturalProofsTableItem[] => {
  const withoutDeclaration = removeDeclaration(input).trim();
  const withoutNPTag = withoutDeclaration
    .replace(XMLTag.NPOpen, "")
    .replace(XMLTag.NPClose, "");
  const tableItems = withoutNPTag.split(
    new RegExp("(?=" + XMLTag.TItemOpen + ")", "g")
  );

  return tableItems.map((item) => parseNPTableItem(item));
};

const parserXML = {
  xmlToDPTableData,
  xmlToNPTableData,
};

export default Object.freeze(parserXML);
