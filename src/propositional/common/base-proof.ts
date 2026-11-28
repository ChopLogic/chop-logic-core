import type { BaseProofStep, PropFormula } from "../../models";

/**
 * Abstract base class for proofs in every supported calculus.
 *
 * Holds the goal formula and the ordered list of proof steps, and provides the read-only
 * accessors shared by all proof systems. Steps are always copied when stored and when
 * returned, so callers never share state with the proof.
 *
 * Concrete proof systems ({@link HilbertProof}, {@link NaturalProof}, {@link ResolutionProof})
 * extend this class with methods for adding steps and define when a proof is complete.
 *
 * @example
 * ```typescript
 * const proof: BaseProof<PropProofStep> = new HilbertProof(goal);
 * proof.getStepCount(); // 0
 * proof.isComplete();   // false
 * ```
 *
 * @typeParam TStep - The type of the steps stored in the proof
 * @category Common
 */
export abstract class BaseProof<TStep extends BaseProofStep> {
	/** The proof steps in order. Only copies are ever exposed to callers. */
	protected steps: TStep[] = [];
	/** The target formula of the proof. */
	protected goal: PropFormula;

	/**
	 * Creates a new proof with a goal formula.
	 * The goal is copied, so later changes to the passed object do not affect the proof.
	 * @param goal - The target formula to prove
	 */
	constructor(goal: PropFormula) {
		this.goal = structuredClone(goal);
	}

	/**
	 * Gets all proof steps in order.
	 * @returns A frozen array of copies of the proof steps; changing them does not affect the proof
	 */
	getSteps(): readonly TStep[] {
		return Object.freeze(this.steps.map((step) => structuredClone(step)));
	}

	/**
	 * Gets the goal formula of this proof.
	 * @returns A copy of the target formula
	 */
	getGoal(): PropFormula {
		return structuredClone(this.goal);
	}

	/**
	 * Gets the number of steps in the proof.
	 * @returns The current step count
	 */
	getStepCount(): number {
		return this.steps.length;
	}

	/**
	 * Gets a specific step by index (1-based).
	 * @param index - The step number (1-based)
	 * @returns A copy of the proof step, or undefined if not found
	 */
	getStep(index: number): TStep | undefined {
		const step = this.steps[index - 1];
		return step && structuredClone(step);
	}

	/**
	 * Gets the last step in the proof.
	 * @returns A copy of the final proof step, or undefined if no steps exist
	 */
	getLastStep(): TStep | undefined {
		const step = this.steps.at(-1);
		return step && structuredClone(step);
	}

	/**
	 * Clears all steps from the proof.
	 */
	clear(): void {
		this.steps = [];
	}

	/**
	 * Checks if the proof is complete. The criterion depends on the calculus.
	 * @returns True if the proof is complete
	 */
	abstract isComplete(): boolean;

	/**
	 * Stores copies of the new steps (detaching them from caller-provided data) and
	 * returns separate copies, so neither inputs nor return values share state with the proof.
	 * @param newSteps - The steps to append
	 * @param comment - Optional explanation applied to every step; ignored when empty
	 * @returns Copies of the appended steps
	 */
	protected pushSteps(newSteps: TStep[], comment?: string): TStep[] {
		return newSteps.map((step) => {
			if (comment) {
				step.comment = comment;
			}
			const stored = structuredClone(step);
			this.steps.push(stored);
			return structuredClone(stored);
		});
	}

	/**
	 * Returns the stored (internal) step, not a copy. Must not be exposed to callers.
	 * @param index - The step number (1-based)
	 * @param action - The action name used in the error message (e.g. "reiterate")
	 * @returns The stored proof step
	 * @throws {Error} if no step exists at the given index
	 */
	protected getStoredStep(index: number, action: string): TStep {
		const step = this.steps[index - 1];

		if (!step) {
			throw new Error(`Cannot ${action}: step ${index} not found in proof`);
		}

		return step;
	}
}
