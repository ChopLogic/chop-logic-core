import { GlyphType, Operator, StepReason } from './enums';

export type PropAtom = [string];

export type PropSymbol = {
  atom: PropAtom;
  type: GlyphType;
  position: number;
  view: string;
};

export type PropExpression = PropSymbol[];

export type PropFormula = {
  operator: Operator;
  values: PropFormula[] | PropAtom;
};

export type ProofStep = {
  id: string;
  index: number;
  input: string;
  comment: string;
  dependentOn: string[];
};

export type NaturalProofStep = ProofStep & {
  formula: PropFormula;
  expression: PropExpression;
  level: number;
  reason: StepReason;
  assumptionId: string | null;
};

export type DirectProofStep = ProofStep & {
  expression: PropExpression;
  formula: PropFormula;
};
