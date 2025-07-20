import { createPropExpression } from "../../factory/create-prop-expression";
import { isWellFormedFormula } from "../is-well-formed-formula";

describe("isWellFormedFormula", () => {
	it("should return true for single variables", () => {
		expect(isWellFormedFormula(createPropExpression("A"))).toBe(true);
		expect(isWellFormedFormula(createPropExpression("X"))).toBe(true);
	});

	it("should return true for negated variables", () => {
		expect(isWellFormedFormula(createPropExpression("~A"))).toBe(true);
		expect(isWellFormedFormula(createPropExpression("~~A"))).toBe(true);
	});

	it("should return true for binary operator expressions with parentheses", () => {
		expect(isWellFormedFormula(createPropExpression("(A & B)"))).toBe(true);
		expect(isWellFormedFormula(createPropExpression("(A | B)"))).toBe(true);
		expect(isWellFormedFormula(createPropExpression("(A => B)"))).toBe(true);
		expect(isWellFormedFormula(createPropExpression("(A <=> B)"))).toBe(true);
	});

	it("should return true for nested expressions", () => {
		expect(isWellFormedFormula(createPropExpression("((A & B) => C)"))).toBe(
			true,
		);
		expect(isWellFormedFormula(createPropExpression("~((A & B) => C)"))).toBe(
			true,
		);
		expect(
			isWellFormedFormula(createPropExpression("(((A & B) => C) <=> D)")),
		).toBe(true);
		expect(
			isWellFormedFormula(createPropExpression("~(~((~p & q) => ~~r) | ~s)")),
		).toBe(true);
	});

	it("should return false for misplaced negations", () => {
		expect(isWellFormedFormula(createPropExpression("A~"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A ~ B)"))).toBe(false);
	});

	it("should return false for unnecessary parentheses", () => {
		expect(isWellFormedFormula(createPropExpression("(A)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("((A))"))).toBe(false);
	});

	it("should return false for missing elements", () => {
		expect(isWellFormedFormula(createPropExpression("(A & )"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A => )"))).toBe(false);
	});

	it("should return false for unbalanced parentheses", () => {
		expect(isWellFormedFormula(createPropExpression("(A & B"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("A & B)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A & B))"))).toBe(false);
		expect(
			isWellFormedFormula(createPropExpression("((A & B) => C) <=> D)")),
		).toBe(false);
	});

	it("should return false for invalid operator placement", () => {
		expect(isWellFormedFormula(createPropExpression("(A & => B)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(& A B)"))).toBe(false);
	});

	it("should return false for empty input", () => {
		expect(isWellFormedFormula([])).toBe(false);
	});
});
