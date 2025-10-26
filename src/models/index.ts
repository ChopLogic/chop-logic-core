/**
 * Core type definitions for the logical system.
 * This module consolidates all types and interfaces used for logical expressions,
 * proof systems, and truth evaluations.
 *
 * @packageDocumentation
 * @module Models
 * @preferred
 */

import type { GlyphType, Operator, Step } from "../enums";

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

// ============== Formula Types ==============

/**
 * Represents a well-formed formula in propositional logic.
 * Can be either atomic or composite with an operator and subformulas.
 *
 * @category Formula Types
 */
export interface PropFormula {
	/** The main logical operator of the formula */
	operator: Operator;
	/** Either subformulas for composite formulas or an atomic proposition */
	values: PropFormula[] | PropAtom;
}

/**
 * Maps indices to atomic propositions for variable tracking.
 * Used to maintain associations between formula parts.
 *
 * @category Formula Types
 */
export type PropFormulaVariablesMap = Map<number, PropAtom>;

// ============== Proof System Types ==============

/**
 * Represents a single step in a logical proof.
 * Contains all information needed to display and validate the step.
 *
 * @category Proof System Types
 */
export interface PropProofStep {
	/** Sequential number of the step in the proof */
	index: number;
	/** Type of the proof step */
	step: Step;
	/** Logical formula for this step */
	formula: PropFormula;
	/** Symbolic expression of the formula */
	expression: PropExpression;
	/** String representation for display */
	stringView: string;
	/** Explanation or justification */
	comment: string;
	/** References to steps this was derived from */
	derivedFrom?: number[];
	/** Nesting level for sub-proofs */
	level?: number;
	/** Reference to the assumption this step depends on */
	assumptionIndex?: number;
}

// ============== Truth Table Types ==============

/**
 * Maps indices to arrays of truth values.
 * Used for managing truth assignments in evaluations.
 *
 * @category Truth Table Types
 */
export type TruthAssignmentsMap = Map<number, boolean[]>;

/**
 * Represents a single row in a truth table.
 * Maps variable names to their truth values.
 *
 * @category Truth Table Types
 */
export type TruthTableRow = Record<string, boolean>;

/**
 * Complete truth table for a formula.
 * Collection of all possible truth value combinations.
 *
 * @category Truth Table Types
 */
export type TruthTable = TruthTableRow[];
