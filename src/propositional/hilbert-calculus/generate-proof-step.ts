import { ProofStep, PropFormula } from '../../models';
import { HilbertCalculusSchema, Step } from '../../enums';
import { convertPropFormulaToString } from '../toolkit/convert-prop-formula-to-string';
import { createPropExpression } from '../factory/create-prop-expression';
import { implicationIntroduction } from './implication-introduction';
import { implicationDistribution } from './implication-distribution';
import { implicationReversal } from './implication-reversal';
import { implicationElimination } from './implication-elimination';

type DerivedStepPayload = {
  formulas: PropFormula[];
  schema: HilbertCalculusSchema;
  derivedFrom: number[];
};

type NotDerivedStepPayload = {
  formula: PropFormula;
};

interface HilbertProofStepInput<T> {
  index: number;
  step: T extends Step.Derivation ? Step.Derivation : Exclude<Step, Step.Derivation>;
  payload: T extends Step.Derivation ? DerivedStepPayload : NotDerivedStepPayload;
}

export function generateProofStep<T>(input: HilbertProofStepInput<T>): ProofStep {
  const { index, step } = input;

  if (step === Step.Derivation) {
    const payload = input.payload as DerivedStepPayload;
    const { formulas, schema, derivedFrom } = payload;
    const ruleFunction = getRuleFunction(schema);
    const formula = ruleFunction(formulas);
    const stringView = convertPropFormulaToString(formula);
    const expression = createPropExpression(stringView);
    const comment = `${schema}: ${derivedFrom.join(', ')}`;

    return {
      index,
      step,
      formula,
      expression,
      stringView,
      comment,
      derivedFrom,
    };
  } else {
    const payload = input.payload as NotDerivedStepPayload;
    const stringView = convertPropFormulaToString(payload.formula);
    const expression = createPropExpression(stringView);
    const comment = `${step}`;

    return {
      index,
      step,
      formula: payload.formula,
      stringView,
      expression,
      comment,
    };
  }
}

function getRuleFunction(schema: HilbertCalculusSchema) {
  switch (schema) {
    case HilbertCalculusSchema.II:
      return implicationIntroduction;
    case HilbertCalculusSchema.ID:
      return implicationDistribution;
    case HilbertCalculusSchema.IR:
      return implicationReversal;
    case HilbertCalculusSchema.IE:
      return implicationElimination;
  }
}
