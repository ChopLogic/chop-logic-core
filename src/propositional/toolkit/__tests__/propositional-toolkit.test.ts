import { PropositionalToolkit } from '../index';
import { calculatePropFormula } from '../calculate-prop-formula';
import { convertPropFormulaToString } from '../convert-prop-formula-to-string';
import { extractPropVariables } from '../extract-prop-variables';
import { extractPropSubFormulas } from '../extract-prop-sub-formulas';
import { generatePropTruthTable } from '../generate-prop-truth-table';
import { isWellFormedFormula } from '../is-well-formed-formula';
import { getUnaryOperationValue } from '../get-unary-operation-value';
import { getBinaryOperationValue } from '../get-binary-operation-value';
import { generateTruthAssignments } from '../generate-truth-assignments';

describe('PropositionalToolkit', () => {
  it('should have all expected rules with correct references', () => {
    expect(PropositionalToolkit).toMatchObject({
      calculateFormula: calculatePropFormula,
      convertToString: convertPropFormulaToString,
      getVariables: extractPropVariables,
      getSubFormulas: extractPropSubFormulas,
      isWFF: isWellFormedFormula,
      getUnaryValue: getUnaryOperationValue,
      getBinaryValue: getBinaryOperationValue,
      generateTT: generatePropTruthTable,
      generateAssignments: generateTruthAssignments,
    });
  });

  it('should be immutable', () => {
    expect(Object.isFrozen(PropositionalToolkit)).toBe(true);

    expect(() => {
      // @ts-expect-error checking that the object is frozen
      PropositionalToolkit.isWFF = jest.fn();
    }).toThrow();
  });
});
