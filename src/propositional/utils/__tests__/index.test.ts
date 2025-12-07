import { calculatePropFormula } from "../calculate-prop-formula";
import { convertPropFormulaToExpression } from "../convert-prop-formula-to-expression";
import { convertPropFormulaToString } from "../convert-prop-formula-to-string";
import { extractPropSubFormulas } from "../extract-prop-sub-formulas";
import { extractPropVariables } from "../extract-prop-variables";
import { generatePropTruthTable } from "../generate-prop-truth-table";
import { generateTruthAssignments } from "../generate-truth-assignments";
import { getBinaryOperationValue } from "../get-binary-operation-value";
import { getUnaryOperationValue } from "../get-unary-operation-value";
import * as utils from "../index";

describe("Propositional utils module", () => {
	it("should have all expected static methods available", () => {
		expect(typeof utils.calculatePropFormula).toBe("function");
		expect(utils.calculatePropFormula).toBe(calculatePropFormula);

		expect(typeof utils.convertPropFormulaToExpression).toBe("function");
		expect(utils.convertPropFormulaToExpression).toBe(
			convertPropFormulaToExpression,
		);

		expect(typeof utils.convertPropFormulaToString).toBe("function");
		expect(utils.convertPropFormulaToString).toBe(convertPropFormulaToString);

		expect(typeof utils.extractPropSubFormulas).toBe("function");
		expect(utils.extractPropSubFormulas).toBe(extractPropSubFormulas);

		expect(typeof utils.extractPropVariables).toBe("function");
		expect(utils.extractPropVariables).toBe(extractPropVariables);

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
