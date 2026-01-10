import type {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	NaturalCalculusRule,
	Step,
} from "../enums";
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

// ============== Hilbert Calculus ==============

/**
 * Payload for an axiom step in Hilbert calculus.
 * Contains the formulas and schema instance used for the axiom.
 *
 * @category Proof System Types
 */
export type HilbertAxiomPayload = {
	formulas: PropFormula[];
	schema: HilbertCalculusSchema;
};

/**
 * Payload for a derived step in Hilbert calculus.
 * Contains the formulas that justify the derivation and indices of the steps they were derived from.
 *
 * @category Proof System Types
 */
export type HilbertDerivedPayload = {
	formulas: PropFormula[];
	rule: HilbertCalculusRule;
	derivedFrom: number[];
};

/**
 * Base payload for assumption steps in Hilbert calculus.
 * Contains a single formula representing the assumption.
 *
 * @category Proof System Types
 */
export type HilbertBasePayload = {
	formula: PropFormula;
};

/**
 * Generic input interface for creating a Hilbert calculus proof step.
 * The payload type is determined by the step type (Axiom, Derivation, or Assumption).
 *
 * @template T - The step type (Axiom, Derivation, or Assumption)
 * @category Proof System Types
 */
export interface HilbertProofStepInput<T> {
	index: number;
	step: T extends Step.Derivation
		? Step.Derivation
		: T extends Step.Axiom
			? Step.Axiom
			: Exclude<Step, Step.Derivation | Step.Axiom | Step.Assumption>;
	payload: T extends Step.Derivation
		? HilbertDerivedPayload
		: T extends Step.Axiom
			? HilbertAxiomPayload
			: HilbertBasePayload;
}

// ============== Natural Calculus ==============

/**
 * Payload for a derived step in natural calculus.
 * Contains the formulas that justify the derivation, the rule used, and indices of the steps they were derived from.
 *
 * @category Proof System Types
 */
export type NaturalDerivedPayload = {
	formulas: PropFormula[];
	rule: NaturalCalculusRule;
	derivedFrom: number[];
};

/**
 * Base payload for assumption steps in natural calculus.
 * Contains a single formula representing the assumption.
 *
 * @category Proof System Types
 */
export type NaturalBasePayload = {
	formula: PropFormula;
};

/**
 * Generic input interface for creating a natural calculus proof step.
 * The payload type is determined by the step type (Derivation or Assumption).
 * Includes level and optional assumption index for sub-proof handling.
 *
 * @template T - The step type (Derivation or Assumption)
 * @category Proof System Types
 */
export interface NaturalProofStepInput<T> {
	index: number;
	level: number;
	assumptionIndex?: number;
	step: T extends Step.Derivation
		? Step.Derivation
		: Exclude<Step, Step.Derivation | Step.Axiom>;
	payload: T extends Step.Derivation
		? NaturalDerivedPayload
		: NaturalBasePayload;
}
