import { PropFormula } from '../../models';
import { Operator } from '../../enums';
import { arePropFormulasStructurallyEqual } from './are-prop-formulas-structurally-equal';

/**
 * Checks if equivalence introduction is applicable.
 *
 * Equivalence introduction allows us to infer an equivalence (A ≡ B)
 * if we have both implications (A → B) and (B → A).
 *
 * @param formulas - An array of propositional formulas to check.
 * @returns `true` if we can infer equivalence, otherwise `false`.
 */
export function isEquivalenceIntroductionApplicable(formulas: PropFormula[]): boolean {
  if (formulas.length !== 2) {
    return false;
  }

  const [formula1, formula2] = formulas;

  if (formula1.operator !== Operator.Implies || formula2.operator !== Operator.Implies) {
    return false;
  }

  const [antecedent1, consequent1] = formula1.values as PropFormula[];
  const [antecedent2, consequent2] = formula2.values as PropFormula[];

  return arePropFormulasStructurallyEqual([antecedent1, consequent2]) && arePropFormulasStructurallyEqual([antecedent2, consequent1]);
}
