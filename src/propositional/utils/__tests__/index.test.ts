import { calculatePropFormula } from "../calculate-prop-formula";
import { generatePropTruthTable } from "../generate-prop-truth-table";
import { generateTruthAssignments } from "../generate-truth-assignments";
import { getBinaryOperationValue } from "../get-binary-operation-value";
import { getUnaryOperationValue } from "../get-unary-operation-value";
import * as utils from "../index";

describe("Propositional utils module", () => {
	it("should have all expected static methods available", () => {
		expect(typeof utils.calculatePropFormula).toBe("function");
		expect(utils.calculatePropFormula).toBe(calculatePropFormula);

		expect(typeof utils.generatePropTruthTable).toBe("function");
		expect(utils.generatePropTruthTable).toBe(generatePropTruthTable);

		expect(typeof utils.generateTruthAssignments).toBe("function");
		expect(utils.generateTruthAssignments).toBe(generateTruthAssignments);

		expect(typeof utils.getBinaryOperationValue).toBe("function");
		expect(utils.getBinaryOperationValue).toBe(getBinaryOperationValue);

		expect(typeof utils.getUnaryOperationValue).toBe("function");
		expect(utils.getUnaryOperationValue).toBe(getUnaryOperationValue);
	});
});
