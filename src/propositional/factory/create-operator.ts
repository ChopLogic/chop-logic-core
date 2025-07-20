import { Glyph, GlyphType, Operator } from "../../enums";
import type { PropSymbol } from "../../models";

/**
 * Converts a given `PropSymbol` into its corresponding logical operator.
 *
 * - If the symbol represents a known logical operator glyph, returns the matching `Operator` enum.
 * - If the symbol represents a variable, returns `Operator.Var`.
 * - Throws an error if the symbol is neither a recognized operator nor a variable.
 *
 * @param symbol - The `PropSymbol` to be converted into an `Operator`.
 * @returns The corresponding `Operator` enum value.
 * @throws {Error} If the symbol is not recognized as an operator or a variable.
 */
export function createOperator(symbol: PropSymbol): Operator {
	switch (symbol.atom[0]) {
		case Glyph.Negation:
			return Operator.Not;
		case Glyph.Conjunction:
			return Operator.And;
		case Glyph.Disjunction:
			return Operator.Or;
		case Glyph.Implication:
			return Operator.Implies;
		case Glyph.ReversedImplication:
			return Operator.ReversedImplies;
		case Glyph.Equivalence:
			return Operator.Equiv;
		case Glyph.ExclusiveConjunction:
			return Operator.Xor;
		case Glyph.ShefferStroke:
			return Operator.Nand;
		case Glyph.WebbOperation:
			return Operator.Nor;
		case Glyph.AntiImplication:
			return Operator.AntiImplies;
		case Glyph.ReversedAntiImplication:
			return Operator.ReversedAntiImplies;
		case Glyph.Contradiction:
			return Operator.Contradiction;
		case Glyph.Tautology:
			return Operator.Tautology;
		default:
			if (symbol.type === GlyphType.Variable) {
				return Operator.Var;
			}
			throw new Error(
				`Cannot create an operator from symbol "${symbol.atom[0]}".`,
			);
	}
}
