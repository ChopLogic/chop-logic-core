import { Operator } from "../../../enums";
import { getUnaryOperationValue } from "../get-unary-operation-value";

describe("getUnaryOperationValue", () => {
	it("should return the operand value for Operator.Var", () => {
		expect(
			getUnaryOperationValue({ operator: Operator.Var, operand: true }),
		).toBe(true);
		expect(
			getUnaryOperationValue({ operator: Operator.Var, operand: false }),
		).toBe(false);
	});

	it("should return the negation of operand for Operator.Not", () => {
		expect(
			getUnaryOperationValue({ operator: Operator.Not, operand: true }),
		).toBe(false);
		expect(
			getUnaryOperationValue({ operator: Operator.Not, operand: false }),
		).toBe(true);
	});

	it("should throw an error for unsupported unary operators", () => {
		expect(() =>
			getUnaryOperationValue({ operator: Operator.And, operand: true }),
		).toThrow('Operator "AND" is not a valid unary operator.');
		expect(() =>
			getUnaryOperationValue({ operator: Operator.Or, operand: false }),
		).toThrow('Operator "OR" is not a valid unary operator.');
	});
});
