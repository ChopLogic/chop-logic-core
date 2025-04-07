import { PropFormula } from '../../types';
import { Operator } from '../../enums';

/**
 * Extracts all true sub-formulas from a given propositional formula.
 * This function does not include atomic formulas (Operator.Var) as sub-formulas,
 * nor does it include the input formula itself.
 *
 * @param {PropFormula} formula - The propositional formula to extract sub-formulas from.
 * @returns {PropFormula[]} An array of unique sub-formulas, sorted in evaluation order.
 */
export function extractPropSubFormulas(formula: PropFormula): PropFormula[] {
  if (formula.operator === Operator.Var) return [];

  const subFormulas = new Set<string>();
  const result: PropFormula[] = [];

  function traverse(subFormula: PropFormula): void {
    if (subFormula.operator === Operator.Var) {
      return;
    }

    const key = JSON.stringify(subFormula);
    if (!subFormulas.has(key)) {
      subFormulas.add(key);
      result.push(subFormula);
    }

    if (Array.isArray(subFormula.values)) {
      for (const value of subFormula.values) {
        traverse(value as PropFormula);
      }
    }
  }

  if (Array.isArray(formula.values)) {
    for (const value of formula.values) {
      traverse(value as PropFormula);
    }
  }

  return result;
}
