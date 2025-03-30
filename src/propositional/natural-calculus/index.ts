import { negationIntroduction } from './negation-introduction';
import { negationElimination } from './negation-elimination';
import { equivalenceIntroduction } from './equivalence-introduction';

export const NaturalCalculus = Object.freeze({
  // Introduction rules
  NI: negationIntroduction,
  EI: equivalenceIntroduction,
  // Elimination rules
  NE: negationElimination,
});
