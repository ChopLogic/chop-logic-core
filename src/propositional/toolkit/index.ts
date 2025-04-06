import { calculatePropFormula } from './calculate-prop-formula';
import { convertPropFormulaToString } from './convert-prop-formula-to-string';
import { extractPropVariables } from './extract-prop-variables';
import { extractPropSubFormulas } from './extract-prop-sub-formulas';
import { generatePropTruthTable } from './generate-prop-truth-table';
import { isWellFormedFormula } from './is-well-formed-formula';

export const PropositionalToolkit = Object.freeze({
  calculateFormula: calculatePropFormula,
  convertFormulaToString: convertPropFormulaToString,
  extractVariables: extractPropVariables,
  extractSubFormulas: extractPropSubFormulas,
  generateTruthTable: generatePropTruthTable,
  isWFF: isWellFormedFormula,
});
