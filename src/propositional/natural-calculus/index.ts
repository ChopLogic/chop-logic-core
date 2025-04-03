import { negationIntroduction } from './negation-introduction';
import { negationElimination } from './negation-elimination';
import { equivalenceIntroduction } from './equivalence-introduction';
import { equivalenceElimination } from './equivalence-elimination';
import { implicationElimination } from './implication-elimination';
import { disjunctionIntroduction } from './disjunction-introduction';
import { implicationIntroduction } from './implication-introduction';
import { conjunctionIntroduction } from './conjunction-introduction';

export const NaturalCalculus = Object.freeze({
  // Introduction rules
  NI: negationIntroduction,
  EI: equivalenceIntroduction,
  DI: disjunctionIntroduction,
  II: implicationIntroduction,
  CI: conjunctionIntroduction,
  // Elimination rules
  NE: negationElimination,
  EE: equivalenceElimination,
  IE: implicationElimination,
});
