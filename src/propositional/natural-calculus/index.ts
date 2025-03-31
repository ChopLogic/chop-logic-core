import { negationIntroduction } from './negation-introduction';
import { negationElimination } from './negation-elimination';
import { equivalenceIntroduction } from './equivalence-introduction';
import { equivalenceElimination } from './equivalence-elimination';

export const NaturalCalculus = Object.freeze({
  // Introduction rules
  NI: negationIntroduction,
  EI: equivalenceIntroduction,
  // Elimination rules
  NE: negationElimination,
  EE: equivalenceElimination,
});
