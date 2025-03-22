import { PropFormula } from '../../common/types';
import { Operator } from '../../common/enums';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';

/**
 * Checks if negation creation is applicable.
 *
 * Negation creation allows us to infer ¬A from two implications:
 *  1) A => B
 *  2) A => ¬B
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if we can infer negation, otherwise `false`.
 */
export function isNegationCreationApplicable(formulas: PropFormula[]): boolean {
  if (formulas.length !== 2) {
    return false;
  }

  const [formula1, formula2] = formulas;

  if (formula1.operator !== Operator.Implies || formula2.operator !== Operator.Implies) {
    return false;
  }

  const [antecedent1, consequent1] = formula1.values as PropFormula[];
  const [antecedent2, consequent2] = formula2.values as PropFormula[];

  if (!arePropFormulasStructurallyEqual([antecedent1, antecedent2])) {
    return false;
  }

  return (
    (consequent1.operator === Operator.Not && arePropFormulasStructurallyEqual([consequent1.values[0] as PropFormula, consequent2])) ||
    (consequent2.operator === Operator.Not && arePropFormulasStructurallyEqual([consequent2.values[0] as PropFormula, consequent1]))
  );
}
