import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';

/**
 * Checks whether the Disjunction Elimination rule is applicable to three given formulas.
 *
 * Conditions for applicability:
 * - Two formulas must be implications with the same consequent.
 * - The third formula must be a disjunction of the antecedents of the other two implications.
 *
 * @param formula1 - First propositional formula
 * @param formula2 - Second propositional formula
 * @param formula3 - Third propositional formula
 * @returns boolean indicating whether the rule is applicable
 */
export function isDisjunctionEliminationApplicable(formula1: PropFormula, formula2: PropFormula, formula3: PropFormula): boolean {
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
  if (!arePropFormulasStructurallyEqual(consequent1, consequent2)) {
    return false;
  }

  // Check if the disjunction consists of the antecedents of the two implications
  return (
    (arePropFormulasStructurallyEqual(disjunct1, antecedent1) && arePropFormulasStructurallyEqual(disjunct2, antecedent2)) ||
    (arePropFormulasStructurallyEqual(disjunct1, antecedent2) && arePropFormulasStructurallyEqual(disjunct2, antecedent1))
  );
}
