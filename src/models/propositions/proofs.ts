import { PropExpression, PropFormula } from './base';
import { StepReason } from '../../enums';

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
