import { Operator } from "../../../enums";
import { createPropExpression } from "../create-prop-expression";
import { createPropFormula } from "../create-prop-formula";

describe("createPropFormula", () => {
	it("should correctly parse a single variable", () => {
		expect(createPropFormula(createPropExpression("A"))).toEqual({
			operator: Operator.Var,
			values: ["A"],
		});
	});

	it("should correctly parse a negation", () => {
		expect(createPropFormula(createPropExpression("~A"))).toEqual({
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["A"] }],
		});
	});

	it("should correctly parse a conjunction", () => {
		expect(createPropFormula(createPropExpression("(A & B)"))).toEqual({
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		});
	});

	it("should correctly parse a nested expression", () => {
		expect(createPropFormula(createPropExpression("(~A & B)"))).toEqual({
			operator: Operator.And,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
				{ operator: Operator.Var, values: ["B"] },
			],
		});
	});

	it("should correctly parse an implication", () => {
		expect(createPropFormula(createPropExpression("((A & B) => C)"))).toEqual({
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{ operator: Operator.Var, values: ["C"] },
			],
		});
	});

	it("should correctly parse an equivalence", () => {
		expect(
			createPropFormula(createPropExpression("((A & B) <=> (C | D))")),
		).toEqual({
			operator: Operator.Equiv,
			values: [
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.Or,
					values: [
						{ operator: Operator.Var, values: ["C"] },
						{ operator: Operator.Var, values: ["D"] },
					],
				},
			],
		});
	});

	it("should throw an error for invalid expressions", () => {
		expect(() => createPropFormula(createPropExpression("A & B"))).toThrow(
			"Invalid propositional expression: Not a well-formed formula (WFF).",
		);
		expect(() => createPropFormula(createPropExpression("(A & )"))).toThrow(
			"Invalid propositional expression: Not a well-formed formula (WFF).",
		);
		expect(() => createPropFormula(createPropExpression("~(A & B"))).toThrow(
			"Invalid propositional expression: Not a well-formed formula (WFF).",
		);
	});
});
