/**
 * Core enumerations used in the ChopLogic system.
 * This module consolidates all enumeration types used for logical operations,
 * syntax processing, and proof systems.
 *
 * @packageDocumentation
 * @module Enums
 */

/**
 * Logical operator types supported in the system.
 * @enum {string}
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

/**
 * Standard textual representations of logical symbols.
 * Provides ASCII-compatible symbols for logical operators.
 * @enum {string}
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
 * Unicode representations of logical symbols.
 * Maps logical operators to their proper Unicode characters.
 * @enum {string}
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
 * Axiom schemas for the Hilbert-style calculus.
 * These represent the fundamental axioms of propositional logic in Hilbert's system.
 * @enum {string}
 */
export enum HilbertCalculusSchema {
	/** Implication Introduction */
	II = "II",
	/** Implication Distribution */
	ID = "ID",
	/** Implication Reversal */
	IR = "IR",
	/** Implication Elimination */
	IE = "IE",
}

/**
 * Rules for natural deduction system.
 * Defines both introduction and elimination rules for logical connectives.
 * @enum {string}
 */
export enum NaturalCalculusRule {
	/** Negation Introduction */
	NI = "NI",
	/** Conjunction Introduction */
	CI = "CI",
	/** Disjunction Introduction */
	DI = "DI",
	/** Implication Introduction */
	II = "II",
	/** Equivalence Introduction */
	EI = "EI",
	/** Negation Elimination */
	NE = "NE",
	/** Conjunction Elimination */
	CE = "CE",
	/** Disjunction Elimination */
	DE = "DE",
	/** Implication Elimination */
	IE = "IE",
	/** Equivalence Elimination */
	EE = "EE",
}

/**
 * Types of formula validation checks.
 * Used to verify the applicability of logical rules and structural equality.
 * @enum {string}
 */
export enum PropFormulaCheck {
	/** Check if two formulas are structurally equal */
	areEqual = "areEqual",
	/** Check if Implication Elimination is applicable */
	isIE = "isIE",
	/** Check if Disjunction Elimination is applicable */
	isDE = "isDE",
	/** Check if Conjunction Elimination is applicable */
	isCE = "isCE",
	/** Check if Equivalence Elimination is applicable */
	isEE = "isEE",
	/** Check if Negation Elimination is applicable */
	isNE = "isNE",
	/** Check if Disjunction Introduction is applicable */
	isDI = "isDI",
	/** Check if Conjunction Introduction is applicable */
	isCI = "isCI",
	/** Check if Equivalence Introduction is applicable */
	isEI = "isEI",
	/** Check if Negation Introduction is applicable */
	isNI = "isNI",
	/** Check if Implication Introduction is applicable */
	isII = "isII",
}

/**
 * Types of steps in logical proofs.
 * Defines the different kinds of steps that can appear in a logical proof.
 * @enum {string}
 */
export enum Step {
	/** Initial assumption or given statement */
	Premise = "Premise",
	/** Temporary assumption for sub-proof */
	Assumption = "Assumption",
	/** Abbreviated proof step */
	Shortcut = "Shortcut",
	/** Repetition of a previous step */
	Reiteration = "Reiteration",
	/** Step derived from previous steps */
	Derivation = "Derivation",
	/** Basic axiom of the system */
	Axiom = "Axiom",
}

/**
 * Types of glyphs in logical expressions.
 * @enum {string}
 */
export enum GlyphType {
	/** Variable symbols */
	Variable = "variable",
	/** Logical operator symbols */
	Operator = "operator",
	/** Grouping parentheses */
	Parenthesis = "parenthesis",
}
