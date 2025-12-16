import type {
	HilbertAxiomPayload,
	HilbertDerivedPayload,
	PropFormula,
} from "../../models";
import { HilbertProof } from "./hilbert-proof";

/**
 * A builder class for constructing Hilbert-style proofs.
 * Provides a chainable API for adding proof steps.
 *
 * @example
 * ```typescript
 * const proof = new HilbertProofBuilder(implicationAB)
 *	.addPremise(A, "First premise")
 *	.addPremise(B, "Second premise")
 *	.build();
 * ```
 *
 * @category Hilbert Proof System
 */
export class HilbertProofBuilder {
	private proof: HilbertProof;

	/**
	 * Creates a new proof builder with a goal formula.
	 * @param goal - The target formula to prove
	 */
	constructor(goal: PropFormula) {
		this.proof = new HilbertProof(goal);
	}

	/**
	 * Adds a premise (given assumption) to the proof.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation for the premise
	 * @returns This builder instance for chaining
	 */
	addPremise(formula: PropFormula, comment?: string): HilbertProofBuilder {
		this.proof.addPremise(formula, comment);
		return this;
	}

	/**
	 * Adds an axiom step to the proof.
	 * @param payload - The axiom payload containing formulas and schema
	 * @param comment - Optional explanation for the axiom
	 * @returns This builder instance for chaining
	 */
	addAxiom(
		payload: HilbertAxiomPayload,
		comment?: string,
	): HilbertProofBuilder {
		this.proof.addAxiom(payload, comment);
		return this;
	}

	/**
	 * Adds a derived step to the proof using a Hilbert calculus rule.
	 * @param payload - The derived step payload containing formulas, schema, and step references
	 * @param comment - Optional explanation for the derivation
	 * @returns This builder instance for chaining
	 */
	addDerivedStep(
		payload: HilbertDerivedPayload,
		comment?: string,
	): HilbertProofBuilder {
		this.proof.addDerivedStep(payload, comment);
		return this;
	}

	/**
	 * Constructs the proof and returns it.
	 * @returns The completed HilbertProof instance
	 */
	build(): HilbertProof {
		return this.proof;
	}

	/**
	 * Adds multiple steps in sequence using a callback function.
	 * Useful for building complex proofs programmatically.
	 *
	 * @param stepsFn - A callback that receives the current builder and adds steps
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * proof.buildSteps((builder) => {
	 *   builder.addPremise(p);
	 *   builder.addAxiom(axiom1);
	 *   builder.addDerivedStep(derived1);
	 * });
	 * ```
	 */
	buildSteps(stepsFn: (builder: this) => void): HilbertProofBuilder {
		stepsFn(this);
		return this;
	}

	/**
	 * Gets the current state of the proof without building.
	 * Useful for inspection during construction.
	 * @returns The current HilbertProof instance
	 */
	preview(): HilbertProof {
		return this.proof;
	}
}
