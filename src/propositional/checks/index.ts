import { isWellFormedFormula } from './is-well-formed-formula';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';
import { isImplicationEliminationApplicable } from './is-implication-elimination-applicable';
import { isDisjunctionEliminationApplicable } from './is-disjunction-elimination-applicable';
import { isConjunctionEliminationApplicable } from './is-conjunction-elimination-applicable';
import { isEquivalenceEliminationApplicable } from './is-equivalence-elimination-applicable';
import { isNegationEliminationApplicable } from './is-negation-elimination-applicable';

export const PropositionalChecks = {
  areStructurallyEqual: arePropFormulasStructurallyEqual,
  isWellFormed: isWellFormedFormula,
  // Elimination rules
  isIE: isImplicationEliminationApplicable,
  isDE: isDisjunctionEliminationApplicable,
  isCE: isConjunctionEliminationApplicable,
  isEE: isEquivalenceEliminationApplicable,
  isNE: isNegationEliminationApplicable,
};
