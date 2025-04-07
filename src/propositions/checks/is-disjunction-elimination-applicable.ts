import { PropFormula } from '../../types';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';
import { Operator } from '../../enums';

/**
 * Checks whether the Disjunction Elimination rule is applicable to three given formulas.
 *
 * Conditions for applicability:
 * - Exactly three formulas in the input array
 * - Two formulas must be implications with the same consequent.
 * - The third formula must be a disjunction of the antecedents of the other two implications.
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns boolean indicating whether the rule is applicable
 */
export function isDisjunctionEliminationApplicable(formulas: PropFormula[]): boolean {
  if (formulas.length !== 3) return false;

  const [formula1, formula2, formula3] = formulas;

  // Identify the disjunction formula
  let disjunction: PropFormula | null = null;
  let implication1: PropFormula | null = null;
  let implication2: PropFormula | null = null;

  for (const formula of [formula1, formula2, formula3]) {
    if (formula.operator === Operator.Or && Array.isArray(formula.values) && formula.values.length === 2) {
      disjunction = formula;
    } else if (formula.operator === Operator.Implies && Array.isArray(formula.values) && formula.values.length === 2) {
      if (!implication1) {
        implication1 = formula;
      } else {
        implication2 = formula;
      }
    }
  }

  // Ensure we have exactly one disjunction and two implications
  if (!disjunction || !implication1 || !implication2) {
    return false;
  }

  const [disjunct1, disjunct2] = disjunction.values as PropFormula[];
  const [antecedent1, consequent1] = implication1.values as PropFormula[];
  const [antecedent2, consequent2] = implication2.values as PropFormula[];

  // Check if the implications have the same consequent
  if (!arePropFormulasStructurallyEqual([consequent1, consequent2])) {
    return false;
  }

  // Check if the disjunction consists of the antecedents of the two implications
  return (
    (arePropFormulasStructurallyEqual([disjunct1, antecedent1]) && arePropFormulasStructurallyEqual([disjunct2, antecedent2])) ||
    (arePropFormulasStructurallyEqual([disjunct1, antecedent2]) && arePropFormulasStructurallyEqual([disjunct2, antecedent1]))
  );
}
