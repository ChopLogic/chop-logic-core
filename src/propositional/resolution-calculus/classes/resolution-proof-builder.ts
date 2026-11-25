import type { PropAtom, PropClause, PropFormula } from "../../../models";
import { ResolutionProof } from "./resolution-proof";

/**
 * A builder class for constructing resolution proofs.
 * Provides a chainable API for adding proof steps.
 *
 * @example
 * ```typescript
 * const proof = new ResolutionProofBuilder(r)
 *   .addPremise(p)
 *   .addPremise(pImpliesR)
 *   .addNegatedGoal()
 *   .resolve(1, 2)
 *   .resolve(3, 4)
 *   .build();
 * ```
 *
 * @category Resolution Calculus
 */
export class ResolutionProofBuilder {
	private readonly proof: ResolutionProof;

	/**
	 * Creates a new proof builder with a goal formula.
	 * @param goal - The target formula to prove
	 */
	constructor(goal: PropFormula) {
		this.proof = new ResolutionProof(goal);
	}

	/**
	 * Adds a premise formula; one step is added for each of its clauses.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation applied to every added step
	 * @returns This builder instance for chaining
	 */
	addPremise(formula: PropFormula, comment?: string): this {
		this.proof.addPremise(formula, comment);
		return this;
	}

	/**
	 * Adds a premise given directly as a clause.
	 * @param clause - The premise clause
	 * @param comment - Optional explanation for the premise
	 * @returns This builder instance for chaining
	 * @throws {Error} if the clause contains anything other than literals
	 */
	addPremiseClause(clause: PropClause, comment?: string): this {
		this.proof.addPremiseClause(clause, comment);
		return this;
	}

	/**
	 * Adds the clauses of the negated goal.
	 * @param comment - Optional explanation applied to every added step
	 * @returns This builder instance for chaining
	 * @throws {Error} if the negated goal has already been added
	 */
	addNegatedGoal(comment?: string): this {
		this.proof.addNegatedGoal(comment);
		return this;
	}

	/**
	 * Resolves the clauses of two earlier steps.
	 * @param firstIndex - The index of the first step (1-based)
	 * @param secondIndex - The index of the second step (1-based)
	 * @param comment - Optional explanation applied to every added step
	 * @returns This builder instance for chaining
	 * @throws {Error} if a step index is invalid or resolution is not applicable
	 */
	resolve(firstIndex: number, secondIndex: number, comment?: string): this {
		this.proof.resolve(firstIndex, secondIndex, comment);
		return this;
	}

	/**
	 * Reiterates (repeats) the clause of a previous step.
	 * @param fromIndex - The index of the step to reiterate (1-based)
	 * @param comment - Optional explanation for the reiteration
	 * @returns This builder instance for chaining
	 * @throws {Error} if the step index is invalid
	 */
	reiterateStep(fromIndex: number, comment?: string): this {
		this.proof.reiterateStep(fromIndex, comment);
		return this;
	}

	/**
	 * Renames a variable in the goal formula and in all clauses of the proof.
	 * See {@link ResolutionProof.replace}.
	 * @param atom - The atomic proposition to replace
	 * @param substitute - The atomic proposition to substitute
	 * @returns This builder instance for chaining
	 * @throws {Error} if a derived step would no longer follow from its parent steps by resolution
	 */
	replace(atom: PropAtom, substitute: PropAtom): this {
		this.proof.replace(atom, substitute);
		return this;
	}

	/**
	 * Constructs the proof and returns it.
	 * @returns The ResolutionProof instance
	 */
	build(): ResolutionProof {
		return this.proof;
	}

	/**
	 * Adds multiple steps in sequence using a callback function.
	 * @param stepsFn - A callback that receives the current builder and adds steps
	 * @returns This builder instance for chaining
	 */
	buildSteps(stepsFn: (builder: this) => void): this {
		stepsFn(this);
		return this;
	}

	/**
	 * Gets the current state of the proof without building.
	 * @returns The current ResolutionProof instance
	 */
	preview(): ResolutionProof {
		return this.proof;
	}
}
