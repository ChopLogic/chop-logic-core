import { isWellFormedFormula } from './is-well-formed-formula';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';
import { isImplicationEliminationApplicable } from './is-implication-elimination-applicable';
import { isDisjunctionEliminationApplicable } from './is-disjunction-elimination-applicable';

export const PropositionalChecks = {
  areStructurallyEqual: arePropFormulasStructurallyEqual,
  isWellFormed: isWellFormedFormula,
  isIE: isImplicationEliminationApplicable,
  isDE: isDisjunctionEliminationApplicable,
};
