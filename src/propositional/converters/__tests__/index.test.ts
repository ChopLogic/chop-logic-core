import { convertPropFormulaToExpression } from "../convert-prop-formula-to-expression";
import { convertPropFormulaToString } from "../convert-prop-formula-to-string";
import { extractPropSubFormulas } from "../extract-prop-sub-formulas";
import { extractPropVariables } from "../extract-prop-variables";
import * as converters from "../index";
import { replaceAtomInFormula } from "../replace-atom-in-formula";

describe("Converters index file", () => {
	it("should have all expected functions available", () => {
		expect(typeof converters.convertPropFormulaToExpression).toBe("function");
		expect(converters.convertPropFormulaToExpression).toBe(
			convertPropFormulaToExpression,
		);

		expect(typeof converters.convertPropFormulaToString).toBe("function");
		expect(converters.convertPropFormulaToString).toBe(
			convertPropFormulaToString,
		);

		expect(typeof converters.extractPropSubFormulas).toBe("function");
		expect(converters.extractPropSubFormulas).toBe(extractPropSubFormulas);

		expect(typeof converters.extractPropVariables).toBe("function");
		expect(converters.extractPropVariables).toBe(extractPropVariables);

		expect(typeof converters.replaceAtomInFormula).toBe("function");
		expect(converters.replaceAtomInFormula).toBe(replaceAtomInFormula);
	});
});
