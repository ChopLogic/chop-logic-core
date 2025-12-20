import { GlyphType } from "../../../enums";
import type { PropSymbol } from "../../../models";
import { createPropExpression } from "../create-prop-expression";

describe("createPropExpression", () => {
	it('should correctly create an expression for "(A => B) & ~C"', () => {
		expect(createPropExpression("(A => B) & ~C")).toEqual<PropSymbol[]>([
			{ position: 0, atom: ["("], type: GlyphType.Parenthesis, view: "(" },
			{ position: 1, atom: ["A"], type: GlyphType.Variable, view: "a" },
			{ position: 2, atom: ["=>"], type: GlyphType.Operator, view: "→" },
			{ position: 3, atom: ["B"], type: GlyphType.Variable, view: "b" },
			{ position: 4, atom: [")"], type: GlyphType.Parenthesis, view: ")" },
			{ position: 5, atom: ["&"], type: GlyphType.Operator, view: "∧" },
			{ position: 6, atom: ["~"], type: GlyphType.Operator, view: "¬" },
			{ position: 7, atom: ["C"], type: GlyphType.Variable, view: "c" },
		]);
	});

	it('should correctly create an expression for "ABC <=> DFR"', () => {
		expect(createPropExpression("ABC <=> DFR")).toEqual<PropSymbol[]>([
			{ position: 0, atom: ["ABC"], type: GlyphType.Variable, view: "a" },
			{ position: 1, atom: ["<=>"], type: GlyphType.Operator, view: "≡" },
			{ position: 2, atom: ["DFR"], type: GlyphType.Variable, view: "d" },
		]);
	});

	it('should correctly create an expression for "(p | q) & r"', () => {
		expect(createPropExpression("(p | q) & r")).toEqual<PropSymbol[]>([
			{ position: 0, atom: ["("], type: GlyphType.Parenthesis, view: "(" },
			{ position: 1, atom: ["p"], type: GlyphType.Variable, view: "p" },
			{ position: 2, atom: ["|"], type: GlyphType.Operator, view: "∨" },
			{ position: 3, atom: ["q"], type: GlyphType.Variable, view: "q" },
			{ position: 4, atom: [")"], type: GlyphType.Parenthesis, view: ")" },
			{ position: 5, atom: ["&"], type: GlyphType.Operator, view: "∧" },
			{ position: 6, atom: ["r"], type: GlyphType.Variable, view: "r" },
		]);
	});

	it('should correctly create an expression for "A"', () => {
		expect(createPropExpression("A")).toEqual<PropSymbol[]>([
			{ position: 0, atom: ["A"], type: GlyphType.Variable, view: "a" },
		]);
	});

	it('should throw an error for invalid characters in "1234*&2%"', () => {
		expect(() => createPropExpression("1234*&2%")).toThrow(
			'Invalid character(s) found in input: "1234*&2%".',
		);
	});

	it("should return an empty array for empty input", () => {
		expect(createPropExpression("")).toEqual([]);
	});
});
