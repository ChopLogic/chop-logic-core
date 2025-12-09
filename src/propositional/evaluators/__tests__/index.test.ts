import { calculatePropFormula } from "../calculate-prop-formula";
import { getBinaryOperationValue } from "../get-binary-operation-value";
import { getUnaryOperationValue } from "../get-unary-operation-value";
import * as evaluators from "../index";

describe("Evaluators index", () => {
	it("should have all expected static methods available", () => {
		expect(typeof evaluators.calculatePropFormula).toBe("function");
		expect(evaluators.calculatePropFormula).toBe(calculatePropFormula);

		expect(typeof evaluators.getBinaryOperationValue).toBe("function");
		expect(evaluators.getBinaryOperationValue).toBe(getBinaryOperationValue);

		expect(typeof evaluators.getUnaryOperationValue).toBe("function");
		expect(evaluators.getUnaryOperationValue).toBe(getUnaryOperationValue);
	});
});
