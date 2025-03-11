import { PropFormula, PropFormulaVariablesMap } from '../common/types';
import { Operator } from '../common/enums';
import { getUnaryOperationValue } from '../common/utils/get-unary-operation-value';
import { getBinaryOperationValue } from '../common/utils/get-binary-operation-value';
import { extractPropVariables } from './extract-prop-variables';

/**
 * Evaluates a propositional formula based on a given truth assignment.
 *
 * @param {Object} params - Function parameters.
 * @param {PropFormula} params.formula - The propositional formula in tree-like structure.
 * @param {boolean[]} params.assignment - The truth assignment for the variables.
 * @param {variablesMap} [params.variablesMap] -  The map of formula variables ordered alphabetically
 * @returns {boolean} - The boolean result of the evaluated formula.
 * @throws {Error} If the number of variables in the formula does not match the assignment length.
 */
export function calculatePropFormula({
  formula,
  assignment,
  variablesMap,
}: {
  formula: PropFormula;
  assignment: boolean[];
  variablesMap?: PropFormulaVariablesMap;
}): boolean {
  const variables = variablesMap ?? extractPropVariables(formula);

  if (variables.size !== assignment.length) {
    throw new Error(`Mismatch between formula variables (${variables.size}) and assignment length (${assignment.length}).`);
  }

  const variableValues = new Map<string, boolean>();

  variables.forEach((atom, index) => {
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
