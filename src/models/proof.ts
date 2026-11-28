import type {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	NaturalCalculusRule,
	ResolutionCalculusRule,
	Step,
} from "../enums";
import type { PropExpression } from "./basic";
import type { PropClause, PropFormula, PropLiteral } from "./formula";

// ============== Proof System Types ==============

/**
 * Minimal shape shared by the steps of every proof system.
 * Extended by {@link PropProofStep} and {@link ResolutionProofStep}.
 *
 * @category Proof System Types
 */
export interface BaseProofStep {
	/** Sequential number of the step in the proof (1-based) */
	index: number;
	/** Type of the proof step */
	step: Step;
	/** Explanation or justification */
	comment: string;
	/** References to steps this was derived from */
	derivedFrom?: number[];
}

/**
 * Represents a single step in a logical proof.
 * Contains all information needed to display and validate the step.
 *
 * @category Proof System Types
 */
export interface PropProofStep extends BaseProofStep {
	/** Logical formula for this step */
	formula: PropFormula;
	/** Symbolic expression of the formula */
	expression: PropExpression;
	/** String representation for display */
	stringView: string;
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
			: Exclude<
					Step,
					Step.Derivation | Step.Axiom | Step.Assumption | Step.NegatedGoal
				>;
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
		: Exclude<Step, Step.Derivation | Step.Axiom | Step.NegatedGoal>;
	payload: T extends Step.Derivation
		? NaturalDerivedPayload
		: NaturalBasePayload;
}

// ============== Resolution Calculus ==============

/**
 * Represents a single step in a resolution proof.
 * Each step holds a clause (a set of literals interpreted as their disjunction).
 *
 * @category Proof System Types
 */
export interface ResolutionProofStep extends BaseProofStep {
	/** Clause of this step (a set of literals interpreted as their disjunction) */
	clause: PropClause;
	/** String representation of the clause in set notation, e.g. `{p, ¬q}` */
	stringView: string;
	/** Literal resolved upon, for derived steps */
	resolvedLiteral?: PropLiteral;
}

/**
 * Payload for a derived step in the resolution calculus.
 * Contains the two clauses to resolve, the rule used, and indices of the steps they were taken from.
 *
 * @category Proof System Types
 */
export type ResolutionDerivedPayload = {
	clauses: PropClause[];
	rule: ResolutionCalculusRule;
	derivedFrom: number[];
};

/**
 * Base payload for premise, negated goal and reiteration steps in the resolution calculus.
 * Contains a single clause.
 *
 * @category Proof System Types
 */
export type ResolutionBasePayload = {
	clause: PropClause;
};

/**
 * Generic input interface for creating a resolution proof step.
 * The payload type is determined by the step type (Derivation or a base step).
 *
 * @template T - The step type
 * @category Proof System Types
 */
export interface ResolutionProofStepInput<T> {
	index: number;
	step: T extends Step.Derivation
		? Step.Derivation
		: Exclude<Step, Step.Derivation | Step.Axiom | Step.Assumption>;
	payload: T extends Step.Derivation
		? ResolutionDerivedPayload
		: ResolutionBasePayload;
}
