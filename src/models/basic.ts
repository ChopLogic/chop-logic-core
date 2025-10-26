import type { GlyphType } from "../enums";

// ============== Basic Types ==============

/**
 * Represents an atomic proposition in the logical system.
 * An atomic proposition is the simplest form of a logical statement.
 *
 * @category Basic Types
 */
export type PropAtom = [string];

/**
 * Represents a symbol in a propositional formula.
 * Could be a variable, operator, or parenthesis.
 *
 * @category Basic Types
 */
export interface PropSymbol {
	/** The atomic component of the symbol */
	atom: PropAtom;
	/** Type classification of the symbol */
	type: GlyphType;
	/** Position in the expression */
	position: number;
	/** String representation */
	view: string;
}

/**
 * A sequence of propositional symbols forming a logical expression.
 *
 * @category Basic Types
 */
export type PropExpression = PropSymbol[];
