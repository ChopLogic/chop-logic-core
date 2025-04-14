import { NaturalCalculus } from '../index';
import { negationIntroduction } from '../negation-introduction';
import { conjunctionIntroduction } from '../conjunction-introduction';
import { disjunctionIntroduction } from '../disjunction-introduction';
import { implicationIntroduction } from '../implication-introduction';
import { equivalenceIntroduction } from '../equivalence-introduction';
import { negationElimination } from '../negation-elimination';
import { conjunctionElimination } from '../conjunction-elimination';
import { disjunctionElimination } from '../disjunction-elimination';
import { implicationElimination } from '../implication-elimination';
import { equivalenceElimination } from '../equivalence-elimination';
import { generateNaturalProofSteps } from '../generate-natural-proof-steps';

describe('NaturalCalculus', () => {
  it('should have all expected rules with correct references', () => {
    expect(NaturalCalculus).toMatchObject({
      NI: negationIntroduction,
      CI: conjunctionIntroduction,
      DI: disjunctionIntroduction,
      II: implicationIntroduction,
      EI: equivalenceIntroduction,
      NE: negationElimination,
      CE: conjunctionElimination,
      DE: disjunctionElimination,
      IE: implicationElimination,
      EE: equivalenceElimination,
      generateSteps: generateNaturalProofSteps,
    });
  });

  it('should be immutable', () => {
    expect(Object.isFrozen(NaturalCalculus)).toBe(true);

    expect(() => {
      // @ts-expect-error checking that the object is frozen
      NaturalCalculus.NI = jest.fn();
    }).toThrow();
  });
});
