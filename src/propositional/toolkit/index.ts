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

export const PropositionalToolkit = Object.freeze({
  calculateFormula: calculatePropFormula,
  convertToString: convertPropFormulaToString,
  getVariables: extractPropVariables,
  getSubFormulas: extractPropSubFormulas,
  isWFF: isWellFormedFormula,
  getUnaryValue: getUnaryOperationValue,
  getBinaryValue: getBinaryOperationValue,
  generateTT: generatePropTruthTable,
  generateAssignments: generateTruthAssignments,
  applyChecks: applyPropFormulaChecks,
});
