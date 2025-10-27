/**
 * Standard textual representations of logical symbols.
 * Provides ASCII-compatible symbols for logical operators.
 * @enum {string}
 *
 * @category Symbols and Operators
 */
export enum Glyph {
	/** Implication (→) */
	Implication = "=>",
	/** Reversed implication (←) */
	ReversedImplication = "<=",
	/** Conjunction (∧) */
	Conjunction = "&",
	/** Disjunction (∨) */
	Disjunction = "|",
	/** Negation (¬) */
	Negation = "~",
	/** Equivalence (≡) */
	Equivalence = "<=>",
	/** Exclusive disjunction (⊕) */
	ExclusiveConjunction = "^",
	/** Sheffer stroke (↑, NAND) */
	ShefferStroke = "!&",
	/** Webb operation (↓, NOR) */
	WebbOperation = "!|",
	/** Anti-implication (↛) */
	AntiImplication = "!=>",
	/** Reversed anti-implication (↚) */
	ReversedAntiImplication = "!<=",
	/** Contradiction (⊥) */
	Contradiction = "#",
	/** Tautology (⊤) */
	Tautology = "@",
	/** Opening parenthesis */
	OpenParenthesis = "(",
	/** Closing parenthesis */
	CloseParenthesis = ")",
}

/**
 * Types of glyphs in logical expressions.
 * @enum {string}
 *
 * @category Symbols and Operators
 */
export enum GlyphType {
	/** Variable symbols */
	Variable = "variable",
	/** Logical operator symbols */
	Operator = "operator",
	/** Grouping parentheses */
	Parenthesis = "parenthesis",
}

/**
 * Unicode representations of logical symbols.
 * Maps logical operators to their proper Unicode characters.
 * @enum {string}
 *
 * @category Symbols and Operators
 */
export enum GlyphUnicode {
	/** Implication (→) */
	Implication = "\u2192",
	/** Reversed implication (←) */
	ReversedImplication = "\u2190",
	/** Conjunction (∧) */
	Conjunction = "\u2227",
	/** Disjunction (∨) */
	Disjunction = "\u2228",
	/** Negation (¬) */
	Negation = "\u00AC",
	/** Equivalence (≡) */
	Equivalence = "\u2261",
	/** Exclusive disjunction (⊕) */
	ExclusiveConjunction = "\u2295",
	/** Sheffer stroke (↑) */
	ShefferStroke = "\u2191",
	/** Webb operation (↓) */
	WebbOperation = "\u2193",
	/** Anti-implication (↛) */
	AntiImplication = "\u219B",
	/** Reversed anti-implication (↚) */
	ReversedAntiImplication = "\u219A",
	/** Contradiction (⊥) */
	Contradiction = "\u22A5",
	/** Tautology (⊤) */
	Tautology = "\u22A4",
	/** Opening parenthesis */
	OpenParenthesis = "(",
	/** Closing parenthesis */
	CloseParenthesis = ")",
}

/**
 * Logical operator types supported in the system.
 * Defines the core logical operations available in propositional logic.
 *
 * @enum {string}
 *
 * @category Symbols and Operators
 */
export enum Operator {
	/** Variable placeholder */
	Var = "VAR",
	/** Logical negation (NOT) */
	Not = "NOT",
	/** Logical conjunction (AND) */
	And = "AND",
	/** Logical disjunction (OR) */
	Or = "OR",
	/** Material implication (IF...THEN) */
	Implies = "IMPLIES",
	/** Reversed implication */
	ReversedImplies = "REVERSED_IMPLIES",
	/** Logical equivalence (IFF) */
	Equiv = "EQUIV",
	/** Exclusive disjunction (XOR) */
	Xor = "XOR",
	/** Not AND operation */
	Nand = "NAND",
	/** Not OR operation */
	Nor = "NOR",
	/** Anti-implication */
	AntiImplies = "ANTI_IMPLIES",
	/** Reversed anti-implication */
	ReversedAntiImplies = "REVERSED_ANTI_IMPLIES",
	/** Logical contradiction (always false) */
	Contradiction = "CONTRADICTION",
	/** Logical tautology (always true) */
	Tautology = "TAUTOLOGY",
}
