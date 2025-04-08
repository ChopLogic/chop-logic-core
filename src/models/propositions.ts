import { GlyphType, Operator, StepReason } from '../enums';

type PropAtom = [string];

export interface PropSymbol {
  atom: PropAtom;
  type: GlyphType;
  position: number;
  view: string;
}

export type PropExpression = PropSymbol[];

export interface PropFormula {
  operator: Operator;
  values: PropFormula[] | PropAtom;
}

export type TruthAssignmentsMap = Map<number, boolean[]>;

export type PropFormulaVariablesMap = Map<number, PropAtom>;

export interface ProofStep {
  id: string;
  index: number;
  input: string;
  comment: string;
  dependentOn: string[];
}

export interface NaturalProofStep extends ProofStep {
  formula: PropFormula;
  expression: PropExpression;
  level: number;
  reason: StepReason;
  assumptionId: string | null;
}

export interface DirectProofStep extends ProofStep {
  expression: PropExpression;
  formula: PropFormula;
}

export type TruthTableRow = Record<string, boolean>;

export type TruthTable = TruthTableRow[];
