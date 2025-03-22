import { isWellFormedFormula } from './is-well-formed-formula';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';
import { isImplicationEliminationApplicable } from './is-implication-elimination-applicable';
import { isDisjunctionEliminationApplicable } from './is-disjunction-elimination-applicable';
import { isConjunctionEliminationApplicable } from './is-conjunction-elimination-applicable';
import { isEquivalenceEliminationApplicable } from './is-equivalence-elimination-applicable';
import { isNegationEliminationApplicable } from './is-negation-elimination-applicable';
import { isDisjunctionCreationApplicable } from './is-dusjunction-creation-applicable';
import { isConjunctionCreationApplicable } from './is-conjunction-creation-applicable';
import { isEquivalenceCreationApplicable } from './is-equivalence-creation-applicable';

export const PropositionalChecks = {
  areStructurallyEqual: arePropFormulasStructurallyEqual,
  isWellFormed: isWellFormedFormula,
  // Elimination rules
  isIE: isImplicationEliminationApplicable,
  isDE: isDisjunctionEliminationApplicable,
  isCE: isConjunctionEliminationApplicable,
  isEE: isEquivalenceEliminationApplicable,
  isNE: isNegationEliminationApplicable,
  // Creation rules
  isDC: isDisjunctionCreationApplicable,
  isCC: isConjunctionCreationApplicable,
  isEC: isEquivalenceCreationApplicable,
};
