import { NPFormulaBase } from "../enums/np-formula-base";
import { PropositionalOperator } from "../enums/propositional-operator";

export type PropositionalSymbolType = "variable" | "operator" | "parentheses";

export type PropositionalSymbol = {
  input: string;
  type: PropositionalSymbolType;
  position: number;
  representation?: string;
};

export type PropositionalExpression = PropositionalSymbol[];

// NB: Recursive Type
export type PropositionalFormula = {
  operator: PropositionalOperator;
  values: PropositionalFormula[] | string;
};

export type ProofTableItem = {
  id: string;
  step: number;
  rawInput: string;
  comment: string;
  dependentOn: string[] | null;
};

export type NaturalProofsTableItem = ProofTableItem & {
  formula: PropositionalFormula;
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  level: number;
  formulaBase: NPFormulaBase;
  assumptionId: string | null;
};

export type DirectProofsTableItem = ProofTableItem & {
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  formula: PropositionalFormula;
};

export type NPExecutorData = {
  level: number;
  dataLength: number;
  selectedItems: NaturalProofsTableItem[];
  assumptionId: string | null;
};

export type TableColumn = {
  field?: string;
  title?: string;
};

export interface TruthTableColumn extends TableColumn {
  depth: number;
  operator: PropositionalOperator;
  operands: string[];
}

export type TableItem = {
  id: string;
  [key: string]: unknown;
};

export type TruthSet = {
  [key: string]: boolean;
};

export type LocalText = { [key in string]: string };
