import { applyPropFormulaChecks } from "../../checks";
import { calculatePropFormula } from "../calculate-prop-formula";
import { convertPropFormulaToExpression } from "../convert-prop-formula-to-expression";
import { convertPropFormulaToString } from "../convert-prop-formula-to-string";
import { extractPropSubFormulas } from "../extract-prop-sub-formulas";
import { extractPropVariables } from "../extract-prop-variables";
import { generatePropTruthTable } from "../generate-prop-truth-table";
import { generateTruthAssignments } from "../generate-truth-assignments";
import { getBinaryOperationValue } from "../get-binary-operation-value";
import { getUnaryOperationValue } from "../get-unary-operation-value";
import { PropositionalUtils } from "../index";
import { isWellFormedFormula } from "../is-well-formed-formula";

describe("PropositionalUtils", () => {
	it("should have all expected rules with correct references", () => {
		expect(PropositionalUtils).toMatchObject({
			calculateFormula: calculatePropFormula,
			convertToString: convertPropFormulaToString,
			convertToExpression: convertPropFormulaToExpression,
			getVariables: extractPropVariables,
			getSubFormulas: extractPropSubFormulas,
			isWFF: isWellFormedFormula,
			getUnaryValue: getUnaryOperationValue,
			getBinaryValue: getBinaryOperationValue,
			generateTT: generatePropTruthTable,
			generateAssignments: generateTruthAssignments,
			applyChecks: applyPropFormulaChecks,
		});
	});

	it("should be immutable", () => {
		expect(Object.isFrozen(PropositionalUtils)).toBe(true);

		expect(() => {
			// @ts-expect-error checking that the object is frozen
			PropositionalUtils.isWFF = jest.fn();
		}).toThrow();
	});
});
