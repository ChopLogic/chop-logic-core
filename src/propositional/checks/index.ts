import { isWellFormedFormula } from './is-well-formed-formula';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';
import { isImplicationEliminationApplicable } from './is-implication-elimination-applicable';

export const PropositionalChecks = {
  isStructurallyEqual: arePropFormulasStructurallyEqual,
  isWellFormed: isWellFormedFormula,
  isIE: isImplicationEliminationApplicable,
};
