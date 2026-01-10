import { Operator, PropFormulaCheck } from "../../../enums";
import type { PropFormula } from "../../../models";
import { validatePropFormulas } from "../validate-prop-formulas";

describe("validatePropFormulas", () => {
	const formulaA: PropFormula = { operator: Operator.Var, values: ["A"] };
	const formulaB: PropFormula = { operator: Operator.Var, values: ["B"] };
	const implicationAB: PropFormula = {
		operator: Operator.Implies,
		values: [formulaA, formulaB],
	};
	const negationA: PropFormula = { operator: Operator.Not, values: [formulaA] };
	const negationNegationA: PropFormula = {
		operator: Operator.Not,
		values: [negationA],
	};
	const conjunctionAB: PropFormula = {
		operator: Operator.And,
		values: [formulaA, formulaB],
	};

	it("applies all checks by default", () => {
		const results = validatePropFormulas([formulaA, formulaB]);
		expect(results).toHaveProperty(PropFormulaCheck.areEqual, false);
		expect(results).toHaveProperty(PropFormulaCheck.isIE, false);
		expect(results).toHaveProperty(PropFormulaCheck.isCE, false);
	});

	it("applies selected checks only", () => {
		const results = validatePropFormulas(
			[implicationAB, formulaA],
			[PropFormulaCheck.isIE],
		);
		expect(results).toEqual({ isIE: true });
	});

	it("handles an empty formulas array", () => {
		const results = validatePropFormulas([]);
		Object.values(results).forEach((value) => {
			expect(value).toBe(false);
		});
	});

	it("handles negation elimination correctly", () => {
		const results = validatePropFormulas(
			[negationNegationA],
			[PropFormulaCheck.isNE],
		);
		expect(results.isNE).toBe(true);
	});

	it("handles conjunction creation correctly", () => {
		const results = validatePropFormulas(
			[formulaA, formulaB],
			[PropFormulaCheck.isCI],
		);
		expect(results.isCI).toBe(true);
	});

	it("handles conjunction elimination correctly", () => {
		const results = validatePropFormulas(
			[conjunctionAB],
			[PropFormulaCheck.isCE],
		);
		expect(results.isCE).toBe(true);
	});

	it("handles invalid check names gracefully", () => {
		const results = validatePropFormulas(
			[formulaA, formulaB],
			["invalidCheck" as PropFormulaCheck],
		);
		expect(results).toEqual({ invalidCheck: false });
	});

	it("applies all check by default", () => {
		const results = validatePropFormulas([implicationAB, formulaA]);
		expect(results).toEqual({
			areEqual: false,
			isCI: true,
			isCE: false,
			isDI: true,
			isDE: false,
			isEI: false,
			isID: false,
			isEE: false,
			isIE: true,
			isNI: false,
			isNE: false,
			isII: true,
			isIR: false,
		});
	});

	it("allows check destructuring", () => {
		const { areEqual, isCI } = validatePropFormulas(
			[formulaB, formulaA],
			[PropFormulaCheck.areEqual, PropFormulaCheck.isCI],
		);
		expect(areEqual).toBe(false);
		expect(isCI).toBe(true);
	});
});
