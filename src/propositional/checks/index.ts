import { isWellFormedFormula } from './is-well-formed-formula';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';

export const PropositionalChecks = {
  isStructurallyEqual: arePropFormulasStructurallyEqual,
  isWellFormed: isWellFormedFormula,
};
