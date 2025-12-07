import { GlyphType, Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { createPropExpression } from "../../builders/create-prop-expression";
import { createPropFormula } from "../../builders/create-prop-formula";
import { convertPropFormulaToExpression } from "../convert-prop-formula-to-expression";

describe("convertPropFormulaToExpression", () => {
	it("should convert a variable formula", () => {
		const input: PropFormula = { operator: Operator.Var, values: ["A"] };
		const result = convertPropFormulaToExpression(input);
		expect(result).toEqual([
			{ atom: ["A"], type: GlyphType.Variable, position: 0, view: "a" },
		]);
	});

	it("should convert a NOT formula", () => {
		const input: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["A"] }],
		};
		const result = convertPropFormulaToExpression(input);
		expect(result.map((s) => s.view)).toEqual(["(", "¬", "a", ")"]);
	});

	it("should convert a binary formula (A → B)", () => {
		const input: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const result = convertPropFormulaToExpression(input);
		expect(result.map((s) => s.view)).toEqual(["(", "a", "→", "b", ")"]);
	});

	it("should convert nested formula ((A → B) ∧ ¬C)", () => {
		const input: PropFormula = {
			operator: Operator.And,
			values: [
				{
					operator: Operator.Implies,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["C"] }],
				},
			],
		};
		const result = convertPropFormulaToExpression(input);
		expect(result.map((s) => s.view)).toEqual([
			"(",
			"(",
			"a",
			"→",
			"b",
			")",
			"∧",
			"(",
			"¬",
			"c",
			")",
			")",
		]);
	});

	it("should convert string input to expression, expression to formula and back to the same expression", () => {
		const expression = createPropExpression("((A & B) <=> (C | D))");
		const formula = createPropFormula(expression);
		const convertedExpression = convertPropFormulaToExpression(formula);

		expect(convertedExpression).toEqual(expression);
	});
});
