/**
 * Core type definitions for the logical system.
 * @module Models
 */

/**
 * Map type for storing truth value assignments.
 * Used in truth table calculations and formula evaluation.
 */
export type { TruthAssignmentsMap } from "./common";

/**
 * Propositional logic type definitions.
 * @typedef {Object} PropositionalTypes
 * @property {PropAtom} PropAtom - Atomic proposition type
 * @property {PropExpression} PropExpression - Composite propositional expression
 * @property {PropFormula} PropFormula - Well-formed propositional formula
 * @property {PropFormulaVariablesMap} PropFormulaVariablesMap - Map of variables in a formula
 * @property {PropProofStep} PropProofStep - Single step in a logical proof
 * @property {PropSymbol} PropSymbol - Basic symbol in propositional logic
 * @property {TruthTable} TruthTable - Complete truth table for a formula
 * @property {TruthTableRow} TruthTableRow - Single row in a truth table
 */
export type {
	PropAtom,
	PropExpression,
	PropFormula,
	PropFormulaVariablesMap,
	PropProofStep,
	PropSymbol,
	TruthTable,
	TruthTableRow,
} from "./propositional";
