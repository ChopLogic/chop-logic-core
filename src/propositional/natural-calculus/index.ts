import { negationIntroduction } from './negation-introduction';
import { negationElimination } from './negation-elimination';
import { equivalenceIntroduction } from './equivalence-introduction';
import { equivalenceElimination } from './equivalence-elimination';
import { implicationElimination } from './implication-elimination';
import { disjunctionIntroduction } from './disjunction-introduction';
import { implicationIntroduction } from './implication-introduction';
import { conjunctionIntroduction } from './conjunction-introduction';
import { conjunctionElimination } from './conjunction-elimination';
import { disjunctionElimination } from './disjunction-elimination';
import { generateNaturalProofSteps } from './generate-natural-proof-steps';

export const NaturalCalculus = Object.freeze({
  generateSteps: generateNaturalProofSteps,
  // Introduction rules
  NI: negationIntroduction,
  CI: conjunctionIntroduction,
  DI: disjunctionIntroduction,
  II: implicationIntroduction,
  EI: equivalenceIntroduction,
  // Elimination rules
  NE: negationElimination,
  CE: conjunctionElimination,
  DE: disjunctionElimination,
  IE: implicationElimination,
  EE: equivalenceElimination,
});
