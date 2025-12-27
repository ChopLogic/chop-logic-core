import type { NaturalDerivedPayload, PropFormula } from "../../../models";
import { NaturalProof } from "./natural-proof";

/**
 * A builder class for constructing Natural Deduction style proofs.
 * Provides a chainable API for adding proof steps including premises,
 * assumptions (sub-proofs), derived steps, and sub-proof closures.
 *
 * @example
 * ```typescript
 * const proof = new NaturalProofBuilder(implicationAB)
 *	.addPremise(A, "First premise")
 *	.addAssumption(B, "Assume B")
 *	.closeSubProof()
 *	.build();
 * ```
 *
 * @category Natural Calculus
 */
export class NaturalProofBuilder {
	private readonly proof: NaturalProof;

	/**
	 * Creates a new proof builder with a goal formula.
	 * @param goal - The target formula to prove
	 */
	constructor(goal: PropFormula) {
		this.proof = new NaturalProof(goal);
	}

	/**
	 * Adds a premise (given assumption) to the proof at the current level.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation for the premise
	 * @returns This builder instance for chaining
	 */
	addPremise(formula: PropFormula, comment?: string): this {
		this.proof.addPremise(formula, comment);
		return this;
	}

	/**
	 * Adds an assumption to open a sub-proof.
	 * This increases the nesting level and starts a new sub-proof.
	 * @param formula - The assumption formula
	 * @param comment - Optional explanation for the assumption
	 * @returns This builder instance for chaining
	 */
	addAssumption(formula: PropFormula, comment?: string): this {
		this.proof.addAssumption(formula, comment);
		return this;
	}

	/**
	 * Adds a derived step using a Natural Deduction rule.
	 * Can be used to apply rules within the current level (including sub-proofs).
	 * @param payload - The derived step payload containing formulas, rule, and step references
	 * @param comment - Optional explanation for the derivation
	 * @returns This builder instance for chaining
	 */
	addDerivedStep(payload: NaturalDerivedPayload, comment?: string): this {
		this.proof.addDerivedStep(payload, comment);
		return this;
	}

	/**
	 * Closes a sub-proof by applying Implication Introduction.
	 * Automatically takes the assumption (most recent step at current level) and the
	 * derived conclusion (last step at current level) to create an implication F=>G,
	 * then adds this implication at level-1.
	 * @param comment - Optional explanation for the implication closure
	 * @returns This builder instance for chaining
	 */
	closeSubProof(comment?: string): this {
		this.proof.closeSubProof(comment);
		return this;
	}

	/**
	 * Constructs the proof and returns it.
	 * @returns The completed NaturalProof instance
	 */
	build(): NaturalProof {
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
	 *   builder.addAssumption(q);
	 *   builder.addDerivedStep(derived1);
	 *   builder.closeSubProof();
	 * });
	 * ```
	 */
	buildSteps(stepsFn: (builder: this) => void): this {
		stepsFn(this);
		return this;
	}

	/**
	 * Gets the current state of the proof without building.
	 * Useful for inspection during construction.
	 * @returns The current NaturalProof instance
	 */
	preview(): NaturalProof {
		return this.proof;
	}
}
