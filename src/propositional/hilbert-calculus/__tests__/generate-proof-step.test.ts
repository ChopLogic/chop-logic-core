import { createPropFormula } from '../../factory/create-prop-formula';
import { generateProofStep } from '../generate-proof-step';
import { HilbertCalculusSchema, Step } from '../../../enums';
import { createPropExpression } from '../../factory/create-prop-expression';

describe('generateProofStep', () => {
  const A = createPropFormula(createPropExpression('A'));
  // const B = createPropFormula(createPropExpression('B'));
  // const C = createPropFormula(createPropExpression('C'));

  // Implication A => B
  const AimpB = createPropFormula(createPropExpression('(A => B)'));

  // Not derived step
  it('should generate a not derived proof step', () => {
    const result = generateProofStep({
      index: 1,
      step: Step.Assumption,
      payload: { formula: A },
    });

    expect(result).toMatchObject({
      index: 1,
      step: Step.Assumption,
      formula: A,
      comment: 'Assumption',
    });
  });

  // // Derived step: Implication Introduction
  // it('should generate a derived step using implication introduction', () => {
  //   const result = generateProofStep<Step.Derivation>({
  //     index: 2,
  //     step: Step.Derivation,
  //     payload: {
  //       formulas: [A, B],
  //       schema: HilbertCalculusSchema.II,
  //       derivedFrom: [1, 2],
  //     },
  //   });
  //
  //   expect(result.comment).toBe('II: 1, 2');
  //   expect(result.stringView).toBe('(A => (B => A))');
  // });
  //
  // // Derived step: Implication Distribution
  // it('should generate a derived step using implication distribution', () => {
  //   const result = generateProofStep<Step.Derivation>({
  //     index: 3,
  //     step: Step.Derivation,
  //     payload: {
  //       formulas: [A, B, C],
  //       schema: HilbertCalculusSchema.ID,
  //       derivedFrom: [1, 2, 3],
  //     },
  //   });
  //
  //   expect(result.comment).toBe('ID: 1, 2, 3');
  //   expect(result.stringView).toBe('((A => (B => C)) => ((A => B) => (A => C)))');
  // });
  //
  // // Derived step: Implication Reversal
  // it('should generate a derived step using implication reversal', () => {
  //   const notA = createPropFormula(createPropExpression('~A'));
  //   const notB = createPropFormula(createPropExpression('~B'));
  //   const result = generateProofStep<Step.Derivation>({
  //     index: 4,
  //     step: Step.Derivation,
  //     payload: {
  //       formulas: [notA, notB],
  //       schema: HilbertCalculusSchema.IR,
  //       derivedFrom: [3, 4],
  //     },
  //   });
  //
  //   expect(result.comment).toBe('IR: 3, 4');
  //   expect(result.stringView).toBe('((~A => ~B) => (B => A))');
  // });

  // Derived step: Implication Elimination
  it('should generate a derived step using implication elimination', () => {
    const result = generateProofStep<Step.Derivation>({
      index: 5,
      step: Step.Derivation,
      payload: {
        formulas: [AimpB, A],
        schema: HilbertCalculusSchema.IE,
        derivedFrom: [1, 2],
      },
    });

    expect(result.comment).toBe('IE: 1, 2');
    expect(result.stringView).toBe('B');
  });
});
