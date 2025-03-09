import { PropFormula } from '../common/types';
import { extractPropVariables } from './extract-prop-variables';
import { Operator } from '../common/enums';
import { getUnaryOperationValue } from './get-unary-operation-value';
import { getBinaryOperationValue } from './get-binary-operation-value';

/**
 * Evaluates a propositional formula based on a given truth assignment.
 *
 * @param {Object} params - Function parameters.
 * @param {PropFormula} params.formula - The propositional formula in tree-like structure.
 * @param {boolean[]} params.assignment - The truth assignment for the variables.
 * @returns {boolean} - The boolean result of the evaluated formula.
 * @throws {Error} If the number of variables in the formula does not match the assignment length.
 */
export function calculatePropFormulaValueOnTruthAssignment({
  formula,
  assignment,
}: {
  formula: PropFormula;
  assignment: boolean[];
}): boolean {
  const variableMap = extractPropVariables(formula);

  if (variableMap.size !== assignment.length) {
    throw new Error(`Mismatch between formula variables (${variableMap.size}) and assignment length (${assignment.length}).`);
  }

  const variableValues = new Map<string, boolean>();

  variableMap.forEach((atom, index) => {
    variableValues.set(atom[0], assignment[index]);
  });

  function evaluate(node: PropFormula): boolean {
    if (node.operator === Operator.Var) {
      return variableValues.get(node.values[0] as string);
    }

    if (node.operator === Operator.Not) {
      const operand = node.values[0] as PropFormula;
      return getUnaryOperationValue({ operator: node.operator, operand: evaluate(operand) });
    }

    const [left, right] = node.values as PropFormula[];
    return getBinaryOperationValue({
      operator: node.operator,
      leftOperand: evaluate(left),
      rightOperand: evaluate(right),
    });
  }

  return evaluate(formula);
}
