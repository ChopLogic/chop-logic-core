import { PropFormula } from '../../../models';
import { generateNaturalProofSteps } from '../generate-natural-proof-steps';
import { NaturalCalculusRule, Operator, Step } from '../../../enums';

describe('generateNaturalProofSteps', () => {
  const atomP: PropFormula = { operator: Operator.Var, values: ['P'] };
  const atomQ: PropFormula = { operator: Operator.Var, values: ['Q'] };

  it('should generate a base step for Assumption', () => {
    const steps = generateNaturalProofSteps({
      index: 1,
      level: 0,
      step: Step.Assumption,
      payload: { formula: atomP },
    });

    expect(steps).toHaveLength(1);
    expect(steps[0]).toMatchObject({
      index: 1,
      level: 0,
      step: Step.Assumption,
      comment: 'Assumption',
      formula: atomP,
    });
  });

  it('should generate a base step for Reiteration with assumptionIndex', () => {
    const steps = generateNaturalProofSteps({
      index: 2,
      level: 1,
      assumptionIndex: 1,
      step: Step.Reiteration,
      payload: { formula: atomQ },
    });

    expect(steps[0].assumptionIndex).toBe(1);
    expect(steps[0].comment).toBe('Reiteration');
  });

  it('should generate derived step(s) from conjunction introduction', () => {
    const steps = generateNaturalProofSteps<Step.Derivation>({
      index: 2,
      level: 1,
      assumptionIndex: 1,
      step: Step.Derivation,
      payload: {
        formulas: [atomP, atomQ],
        rule: NaturalCalculusRule.CI,
        derivedFrom: [1, 2],
      },
    });

    expect(steps).toHaveLength(2);
    expect(steps[0]).toMatchObject({
      index: 3,
      level: 1,
      step: Step.Derivation,
      derivedFrom: [1, 2],
      comment: 'CI: 1, 2',
    });
  });

  it('should support implication elimination rule', () => {
    const implicationFormula: PropFormula = {
      operator: Operator.Implies,
      values: [atomP, atomQ],
    };

    const steps = generateNaturalProofSteps<Step.Derivation>({
      index: 5,
      level: 0,
      step: Step.Derivation,
      payload: {
        formulas: [implicationFormula, atomP],
        rule: NaturalCalculusRule.IE,
        derivedFrom: [2, 3],
      },
    });

    expect(steps[0].comment).toBe('IE: 2, 3');
    expect(steps[0].index).toBe(6);
    expect(steps[0].step).toBe(Step.Derivation);
  });
});
