import { calculatePropFormula } from './calculate-prop-formula';
import { convertPropFormulaToString } from './convert-prop-formula-to-string';
import { extractPropVariables } from './extract-prop-variables';
import { extractPropSubFormulas } from './extract-prop-sub-formulas';
import { generatePropTruthTable } from './generate-prop-truth-table';
import { isWellFormedFormula } from './is-well-formed-formula';
import { getUnaryOperationValue } from './get-unary-operation-value';
import { getBinaryOperationValue } from './get-binary-operation-value';
import { generateTruthAssignments } from './generate-truth-assignments';
import { applyPropFormulaChecks } from '../checks';
import { convertPropFormulaToExpression } from './convert-prop-formula-to-expression';

export const PropositionalUtils = Object.freeze({
  calculateFormula: calculatePropFormula,
  convertToString: convertPropFormulaToString,
  convertToExpression: convertPropFormulaToExpression,
  getVariables: extractPropVariables,
  getSubFormulas: extractPropSubFormulas,
  isWFF: isWellFormedFormula,
  getUnaryValue: getUnaryOperationValue,
  getBinaryValue: getBinaryOperationValue,
  generateTT: generatePropTruthTable,
  generateAssignments: generateTruthAssignments,
  applyChecks: applyPropFormulaChecks,
});
