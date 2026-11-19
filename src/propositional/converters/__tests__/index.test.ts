import { convertPropFormulaToClauses } from "../convert-prop-formula-to-clauses";
import { convertPropFormulaToCNF } from "../convert-prop-formula-to-cnf";
import { convertPropFormulaToExpression } from "../convert-prop-formula-to-expression";
import { convertPropFormulaToNNF } from "../convert-prop-formula-to-nnf";
import { convertPropFormulaToString } from "../convert-prop-formula-to-string";
import { eliminatePropImplications } from "../eliminate-prop-implications";
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

		expect(typeof converters.eliminatePropImplications).toBe("function");
		expect(converters.eliminatePropImplications).toBe(
			eliminatePropImplications,
		);

		expect(typeof converters.convertPropFormulaToNNF).toBe("function");
		expect(converters.convertPropFormulaToNNF).toBe(convertPropFormulaToNNF);

		expect(typeof converters.convertPropFormulaToCNF).toBe("function");
		expect(converters.convertPropFormulaToCNF).toBe(convertPropFormulaToCNF);

		expect(typeof converters.convertPropFormulaToClauses).toBe("function");
		expect(converters.convertPropFormulaToClauses).toBe(
			convertPropFormulaToClauses,
		);
	});
});
