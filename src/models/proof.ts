import type { Step } from "../enums";
import type { PropExpression } from "./basic";
import type { PropFormula } from "./formula";

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
