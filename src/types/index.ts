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
