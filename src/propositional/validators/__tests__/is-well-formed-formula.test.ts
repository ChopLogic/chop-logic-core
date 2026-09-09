import { createPropExpression } from "../../builders/create-prop-expression";
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

	it("should return false for only binary operator", () => {
		expect(isWellFormedFormula(createPropExpression("&"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("|"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("=>"))).toBe(false);
	});

	it("should return false for negation at the end", () => {
		expect(isWellFormedFormula(createPropExpression("A~"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A | B)~"))).toBe(false);
	});

	it("should return false for operator without operands", () => {
		expect(isWellFormedFormula(createPropExpression("(&)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(|)"))).toBe(false);
	});

	it("should return false for multiple variables without operator", () => {
		expect(isWellFormedFormula(createPropExpression("A | B &"))).toBe(false);
	});
	it("should return false for unmatched opening parenthesis", () => {
		expect(isWellFormedFormula(createPropExpression("(A"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("((A & B)"))).toBe(false);
	});

	it("should return false for unmatched closing parenthesis", () => {
		expect(isWellFormedFormula(createPropExpression(")"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("A)"))).toBe(false);
	});

	it("should return false for parentheses with only negation", () => {
		expect(isWellFormedFormula(createPropExpression("(~A)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(~~A)"))).toBe(false);
	});

	it("should return false for binary operator inside parentheses without second operand", () => {
		expect(isWellFormedFormula(createPropExpression("(A &)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A |)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A =>)"))).toBe(false);
	});

	it("should return false for binary operator without opening parenthesis", () => {
		expect(isWellFormedFormula(createPropExpression("A & B)"))).toBe(false);
	});

	it("should return false for extra tokens after valid formula", () => {
		expect(isWellFormedFormula(createPropExpression("(A & B) X"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("A X"))).toBe(false);
	});

	it("should return false for negation without following formula", () => {
		expect(isWellFormedFormula(createPropExpression("~"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("~~"))).toBe(false);
	});

	it("should return false for opening parenthesis without closing", () => {
		expect(isWellFormedFormula(createPropExpression("(A & B"))).toBe(false);
	});

	it("should return false for closing parenthesis without operator", () => {
		expect(isWellFormedFormula(createPropExpression("(A B)"))).toBe(false);
	});

	it("should return true for single variable with multiple double negations", () => {
		expect(isWellFormedFormula(createPropExpression("~~~~A"))).toBe(true);
	});

	it("should return true for complex nested formulas with negations", () => {
		expect(
			isWellFormedFormula(
				createPropExpression("~((A & B) => (C | (D <=> E)))"),
			),
		).toBe(true);
		expect(
			isWellFormedFormula(createPropExpression("((~A & ~B) => ~(C | D))")),
		).toBe(true);
	});

	it("should return false for negation between operands", () => {
		expect(isWellFormedFormula(createPropExpression("(A ~ B)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(A & ~ | B)"))).toBe(
			false,
		);
	});

	it("should return false when missing both operands in binary operation", () => {
		expect(isWellFormedFormula(createPropExpression("(&)"))).toBe(false);
		expect(isWellFormedFormula(createPropExpression("(|)"))).toBe(false);
	});
});
