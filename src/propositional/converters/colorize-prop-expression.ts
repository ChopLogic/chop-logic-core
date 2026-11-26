import { Glyph, GlyphType } from "../../enums";
import type {
	PropExpression,
	PropExpressionColors,
	PropSymbol,
} from "../../models";

/**
 * Copies a propositional expression and applies display colors to its symbols.
 * Matching parentheses and sibling groups share a color. The outermost groups
 * use the first palette color, and deeper groups cycle through the palette.
 * An empty palette preserves any existing parenthesis colors.
 * An unmatched closing parenthesis uses the outermost color when available.
 *
 * @param expression - The symbols to colorize, in expression order.
 * @param colors - Variable and operator colors and the parenthesis palette.
 * @returns A new expression with independent copies of its symbols and atoms.
 * @category Converters
 */
export function colorizePropExpression(
	expression: Readonly<PropExpression>,
	colors: PropExpressionColors,
): PropExpression {
	const { variables, operators, parentheses } = colors;
	let depth = 0;

	return expression.map((symbol) => {
		const colorized: PropSymbol = { ...symbol, atom: [...symbol.atom] };

		if (symbol.type !== GlyphType.Parenthesis) {
			colorized.color =
				symbol.type === GlyphType.Variable ? variables : operators;
		} else if (parentheses.length > 0) {
			const isOpening = symbol.atom[0] === Glyph.OpenParenthesis;
			if (!isOpening) depth = Math.max(0, depth - 1);
			colorized.color = parentheses[depth % parentheses.length];
			if (isOpening) depth += 1;
		}

		return colorized;
	});
}
