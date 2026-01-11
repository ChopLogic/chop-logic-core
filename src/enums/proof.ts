/**
 * Types of steps in logical proofs.
 * Defines the different kinds of steps that can appear in a logical proof.
 * @enum {string}
 *
 * @category Proof System Enums
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
 * Axiom schemas for the Hilbert-style calculus.
 * These represent the fundamental axioms of propositional logic in Hilbert's system.
 * @enum {string}
 *
 * @category Proof System Enums
 */
export enum HilbertCalculusSchema {
	/** Implication Introduction */
	II = "II",
	/** Implication Distribution */
	ID = "ID",
	/** Implication Reversal */
	IR = "IR",
}

/** Deduction rules for the Hilbert Calculus.
 * @enum {string}
 *
 * @category Proof System Enums
 */
export enum HilbertCalculusRule {
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
 *
 * @category Proof System Enums
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
 *
 * @category Proof System Enums
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
	/** Check if Implication Distribution is applicable */
	isID = "isID",
	/** Check if Implication Reversal is applicable */
	isIR = "isIR",
}
