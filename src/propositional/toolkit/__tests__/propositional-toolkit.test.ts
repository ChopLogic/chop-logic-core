import { PropositionalToolkit } from '../index';
import { calculatePropFormula } from '../calculate-prop-formula';
import { convertPropFormulaToString } from '../convert-prop-formula-to-string';
import { extractPropVariables } from '../extract-prop-variables';
import { extractPropSubFormulas } from '../extract-prop-sub-formulas';
import { generatePropTruthTable } from '../generate-prop-truth-table';
import { isWellFormedFormula } from '../is-well-formed-formula';

describe('PropositionalToolkit', () => {
  it('should have all expected rules with correct references', () => {
    expect(PropositionalToolkit).toMatchObject({
      calculateFormula: calculatePropFormula,
      convertFormulaToString: convertPropFormulaToString,
      extractVariables: extractPropVariables,
      extractSubFormulas: extractPropSubFormulas,
      generateTruthTable: generatePropTruthTable,
      isWFF: isWellFormedFormula,
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
