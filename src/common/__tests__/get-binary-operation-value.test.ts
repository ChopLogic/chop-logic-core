import { getBinaryOperationValue } from '../utils/get-binary-operation-value';
import { Operator } from '../enums';

describe('getBinaryOperationValue', () => {
  it('should return correct values for binary logical operators', () => {
    expect(getBinaryOperationValue({ operator: Operator.And, leftOperand: true, rightOperand: false })).toBe(false);
    expect(getBinaryOperationValue({ operator: Operator.Or, leftOperand: true, rightOperand: false })).toBe(true);
    expect(getBinaryOperationValue({ operator: Operator.Implies, leftOperand: true, rightOperand: false })).toBe(false);
    expect(getBinaryOperationValue({ operator: Operator.ReversedImplies, leftOperand: true, rightOperand: false })).toBe(true);
    expect(getBinaryOperationValue({ operator: Operator.Equiv, leftOperand: true, rightOperand: true })).toBe(true);
    expect(getBinaryOperationValue({ operator: Operator.Xor, leftOperand: true, rightOperand: true })).toBe(false);
    expect(getBinaryOperationValue({ operator: Operator.Nand, leftOperand: true, rightOperand: true })).toBe(false);
    expect(getBinaryOperationValue({ operator: Operator.Nor, leftOperand: false, rightOperand: false })).toBe(true);
    expect(getBinaryOperationValue({ operator: Operator.AntiImplies, leftOperand: true, rightOperand: false })).toBe(true);
    expect(getBinaryOperationValue({ operator: Operator.ReversedAntiImplies, leftOperand: false, rightOperand: true })).toBe(true);
    expect(getBinaryOperationValue({ operator: Operator.Contradiction, leftOperand: true, rightOperand: true })).toBe(false);
    expect(getBinaryOperationValue({ operator: Operator.Tautology, leftOperand: false, rightOperand: false })).toBe(true);
  });

  it('should throw an error for non-binary operators', () => {
    expect(() => getBinaryOperationValue({ operator: Operator.Var, leftOperand: true, rightOperand: false })).toThrow();
    expect(() => getBinaryOperationValue({ operator: Operator.Not, leftOperand: true, rightOperand: false })).toThrow();
  });
});
