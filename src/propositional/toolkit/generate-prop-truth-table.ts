import { PropFormula, TruthAssignmentsMap } from '../../common/types';
import { extractPropVariables } from './extract-prop-variables';
import { generateTruthAssignments } from './generate-truth-assignments';
import { calculatePropFormula } from './calculate-prop-formula';

/**
 * Generates a truth table for the given propositional formula.
 *
 * @param {PropFormula} formula - The propositional formula.
 * @param {number} [limit=100] - The max number of variables in the formula.
 * @returns {TruthAssignmentsMap} - A map where keys are assignments, and values are truth values.
 * @throws {Error} If the formula has more variables than the limit allows.
 */
export function generatePropTruthTable(formula: PropFormula, limit = 100): TruthAssignmentsMap {
  // Step 1: Extract variables from the formula
  const variablesMap = extractPropVariables(formula);
  const variableCount = variablesMap.size;

  // Step 2: Generate truth assignments
  const truthAssignments = generateTruthAssignments(variableCount, limit);

  // Step 3: Compute formula truth values
  const truthTable: TruthAssignmentsMap = new Map();

  truthAssignments.forEach((assignment, index) => {
    const formulaValue = calculatePropFormula({
      formula,
      assignment,
      variablesMap,
    });

    truthTable.set(index, [...assignment, formulaValue]);
  });

  return truthTable;
}
