import type { PropExpressionColors } from "../../../models";
import { createPropExpression } from "../../builders/create-prop-expression";
import { colorizePropExpression } from "../colorize-prop-expression";

const outer = "#304050";
const inner = "hsl(210 25% 45%)";
const deepest = "rgb(105 135 165)";
const colors: PropExpressionColors = {
	variables: "navy",
	operators: "orange",
	parentheses: [outer, inner, deepest],
};

describe("colorizePropExpression", () => {
	it("colors variables, unary and binary operators, and logical constants", () => {
		const expression = createPropExpression("~p & @ | q => #");

		expect(
			colorizePropExpression(expression, colors).map((symbol) => [
				symbol.view,
				symbol.color,
			]),
		).toStrictEqual([
			["¬", "orange"],
			["p", "navy"],
			["∧", "orange"],
			["⊤", "orange"],
			["∨", "orange"],
			["q", "navy"],
			["→", "orange"],
			["⊥", "orange"],
		]);
	});

	it("uses the same color for both outermost groups in (p=>p) & (p | p)", () => {
		const expression = createPropExpression("(p=>p) & (p | p)");

		expect(
			colorizePropExpression(expression, colors).map((symbol) => symbol.color),
		).toStrictEqual([
			outer,
			"navy",
			"orange",
			"navy",
			outer,
			"orange",
			outer,
			"navy",
			"orange",
			"navy",
			outer,
		]);
	});

	it("uses the next color for the inner group in ((p => p) | p) => p", () => {
		const expression = createPropExpression("((p => p) | p) => p");

		expect(
			colorizePropExpression(expression, colors).map((symbol) => symbol.color),
		).toStrictEqual([
			outer,
			inner,
			"navy",
			"orange",
			"navy",
			inner,
			"orange",
			"navy",
			outer,
			"orange",
			"navy",
		]);
	});

	it("reuses the inner color for sibling groups inside an outer group", () => {
		const expression = createPropExpression("((p) | (q))");

		expect(
			colorizePropExpression(expression, colors).map((symbol) => symbol.color),
		).toStrictEqual([
			outer,
			inner,
			"navy",
			inner,
			"orange",
			inner,
			"navy",
			inner,
			outer,
		]);
	});

	it("cycles the palette at deep nesting and assigns the same color to each closing parenthesis", () => {
		const expression = createPropExpression("((((((p))))))");

		expect(
			colorizePropExpression(expression, colors).map((symbol) => symbol.color),
		).toStrictEqual([
			outer,
			inner,
			deepest,
			outer,
			inner,
			deepest,
			"navy",
			deepest,
			inner,
			outer,
			deepest,
			inner,
			outer,
		]);
	});

	it("handles an incomplete expression and starts the next group at the outermost depth", () => {
		const expression = createPropExpression(")((p)");

		expect(
			colorizePropExpression(expression, colors).map((symbol) => symbol.color),
		).toStrictEqual([outer, outer, inner, "navy", inner]);
	});

	it("preserves existing parenthesis colors and leaves uncolored parentheses alone with an empty palette", () => {
		const [open, variable, close] = createPropExpression("(p)");
		const expression = [{ ...open, color: "teal" }, variable, close];

		expect(
			colorizePropExpression(expression, { ...colors, parentheses: [] }),
		).toStrictEqual([
			{ ...open, color: "teal" },
			{ ...variable, color: "navy" },
			close,
		]);
	});

	it("returns a new empty expression for empty input", () => {
		const expression = createPropExpression("");
		const result = colorizePropExpression(expression, colors);

		expect(result).toStrictEqual([]);
		expect(result).not.toBe(expression);
	});

	it("recolors copies of symbols and atoms while preserving the expression and palette", () => {
		const original = createPropExpression("(P => Q)");
		const expression = Object.freeze(
			original.map((symbol) => {
				Object.freeze(symbol.atom);
				return Object.freeze({ ...symbol, color: "old" });
			}),
		);
		const palette = Object.freeze([outer]);
		const config = Object.freeze({ ...colors, parentheses: palette });

		const result = colorizePropExpression(expression, config);

		expect(result).not.toBe(expression);
		expect(result).toStrictEqual([
			{ ...original[0], color: outer },
			{ ...original[1], color: "navy" },
			{ ...original[2], color: "orange" },
			{ ...original[3], color: "navy" },
			{ ...original[4], color: outer },
		]);
		for (const [index, symbol] of result.entries()) {
			expect(symbol).not.toBe(expression[index]);
			expect(symbol.atom).not.toBe(expression[index].atom);
		}
		expect(expression).toStrictEqual(
			createPropExpression("(P => Q)").map((symbol) => ({
				...symbol,
				color: "old",
			})),
		);
		expect(config).toStrictEqual({ ...colors, parentheses: [outer] });
	});
});
