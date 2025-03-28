import { PropFormula } from '../../../common/types';
import { Operator, PropFormulaCheck } from '../../../common/enums';
import { applyPropFormulaChecks } from '../index';

describe('applyPropFormulaChecks', () => {
  const formulaA: PropFormula = { operator: Operator.Var, values: ['A'] };
  const formulaB: PropFormula = { operator: Operator.Var, values: ['B'] };
  const implicationAB: PropFormula = { operator: Operator.Implies, values: [formulaA, formulaB] };
  const negationA: PropFormula = { operator: Operator.Not, values: [formulaA] };
  const negationNegationA: PropFormula = { operator: Operator.Not, values: [negationA] };
  const conjunctionAB: PropFormula = { operator: Operator.And, values: [formulaA, formulaB] };

  it('applies all checks by default', () => {
    const results = applyPropFormulaChecks([formulaA, formulaB]);
    expect(results).toHaveProperty(PropFormulaCheck.areEqual, false);
    expect(results).toHaveProperty(PropFormulaCheck.isIE, false);
    expect(results).toHaveProperty(PropFormulaCheck.isCE, false);
  });

  it('applies selected checks only', () => {
    const results = applyPropFormulaChecks([implicationAB, formulaA], [PropFormulaCheck.isIE]);
    expect(results).toEqual({ isIE: true });
  });

  it('handles an empty formulas array', () => {
    const results = applyPropFormulaChecks([]);
    Object.values(results).forEach((value) => expect(value).toBe(false));
  });

  it('handles negation elimination correctly', () => {
    const results = applyPropFormulaChecks([negationNegationA], [PropFormulaCheck.isNE]);
    expect(results.isNE).toBe(true);
  });

  it('handles conjunction creation correctly', () => {
    const results = applyPropFormulaChecks([formulaA, formulaB], [PropFormulaCheck.isCI]);
    expect(results.isCI).toBe(true);
  });

  it('handles conjunction elimination correctly', () => {
    const results = applyPropFormulaChecks([conjunctionAB], [PropFormulaCheck.isCE]);
    expect(results.isCE).toBe(true);
  });

  it('handles invalid check names gracefully', () => {
    const results = applyPropFormulaChecks([formulaA, formulaB], ['invalidCheck' as PropFormulaCheck]);
    expect(results).toEqual({ invalidCheck: false });
  });

  it('applies all check by default', () => {
    const results = applyPropFormulaChecks([implicationAB, formulaA]);
    expect(results).toEqual({
      areEqual: false,
      isCI: true,
      isCE: false,
      isDI: false,
      isDE: false,
      isEI: false,
      isEE: false,
      isIE: true,
      isNI: false,
      isNE: false,
    });
  });

  it('allows check destructuring', () => {
    const { areEqual, isCI } = applyPropFormulaChecks([formulaB, formulaA], [PropFormulaCheck.areEqual, PropFormulaCheck.isCI]);
    expect(areEqual).toBe(false);
    expect(isCI).toBe(true);
  });
});
