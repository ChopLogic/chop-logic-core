import { Operator, ResolutionCalculusRule, Step } from "../../../enums";
import type {
	PropAtom,
	PropClause,
	PropFormula,
	ResolutionProofStep,
} from "../../../models";
import { convertPropClauseToString } from "../../converters/convert-prop-clause-to-string";
import { convertPropFormulaToClauses } from "../../converters/convert-prop-formula-to-clauses";
import { normalizePropClause } from "../../converters/normalize-prop-clause";
import { replaceAtomInFormula } from "../../converters/replace-atom-in-formula";
import { isPropClause } from "../../validators/is-prop-clause";
import { generateResolutionProofSteps } from "../generators/generate-resolution-proof-steps";

/**
 * Represents a resolution proof (Robinson-style refutation) of a goal formula.
 *
 * A resolution proof of a goal `φ` from premises `Δ` is a derivation of the empty clause `{}`
 * from the clausal form of `Δ ∪ {¬φ}`. Premises are converted to clauses with
 * {@link convertPropFormulaToClauses}; the clauses of the negated goal are added with
 * {@link ResolutionProof.addNegatedGoal}; new clauses are derived with {@link ResolutionProof.resolve}.
 *
 * @example
 * ```typescript
 * const proof = new ResolutionProof(r);
 * proof.addPremise(p);         // 1. {p}
 * proof.addPremise(pImpliesR); // 2. {¬p, r}
 * proof.addNegatedGoal();      // 3. {¬r}
 * proof.resolve(1, 2);         // 4. {r}
 * proof.resolve(3, 4);         // 5. {}
 * proof.isComplete();          // true
 * ```
 *
 * @category Resolution Calculus
 */
export class ResolutionProof {
	private steps: ResolutionProofStep[] = [];
	private readonly goal: PropFormula;
	private negatedGoalAdded = false;

	/**
	 * Creates a new resolution proof with a goal formula.
	 * @param goal - The target formula to prove
	 */
	constructor(goal: PropFormula) {
		this.goal = goal;
	}

	/**
	 * Gets all proof steps in order.
	 * @returns Array of proof steps
	 */
	getSteps(): readonly ResolutionProofStep[] {
		return Object.freeze([...this.steps]);
	}

	/**
	 * Gets the goal formula of this proof.
	 * @returns The target formula
	 */
	getGoal(): PropFormula {
		return this.goal;
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
	 * @returns The proof step, or undefined if not found
	 */
	getStep(index: number): ResolutionProofStep | undefined {
		return this.steps[index - 1];
	}

	/**
	 * Gets the last step in the proof.
	 * @returns The final proof step, or undefined if no steps exist
	 */
	getLastStep(): ResolutionProofStep | undefined {
		return this.steps.at(-1);
	}

	/**
	 * Checks whether the clauses of the negated goal have been added to the proof.
	 * @returns True if {@link ResolutionProof.addNegatedGoal} has been called
	 */
	hasNegatedGoal(): boolean {
		return this.negatedGoalAdded;
	}

	/**
	 * Adds a premise formula to the proof. The formula is converted to clausal form and
	 * one premise step is added for each clause. A tautological premise adds no steps.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation applied to every added step
	 * @returns The added proof steps
	 */
	addPremise(formula: PropFormula, comment?: string): ResolutionProofStep[] {
		return this.addBaseSteps(
			Step.Premise,
			convertPropFormulaToClauses(formula),
			comment,
		);
	}

	/**
	 * Adds a premise given directly as a clause. Duplicate literals are merged.
	 * @param clause - The premise clause (a list of literals `p` or `¬p`)
	 * @param comment - Optional explanation for the premise
	 * @returns The added proof step
	 * @throws {Error} if the clause contains anything other than literals
	 */
	addPremiseClause(clause: PropClause, comment?: string): ResolutionProofStep {
		if (!isPropClause(clause)) {
			throw new Error(
				"Invalid clause: a clause must contain only literals (p or ¬p).",
			);
		}

		return this.addBaseSteps(
			Step.Premise,
			[normalizePropClause(clause)],
			comment,
		)[0];
	}

	/**
	 * Adds the clauses of the negated goal (`¬φ`) to the proof as negated goal steps.
	 * Can only be called once per proof.
	 * @param comment - Optional explanation applied to every added step
	 * @returns The added proof steps
	 * @throws {Error} if the negated goal has already been added
	 */
	addNegatedGoal(comment?: string): ResolutionProofStep[] {
		if (this.negatedGoalAdded) {
			throw new Error("The negated goal has already been added to the proof.");
		}

		const clauses = convertPropFormulaToClauses({
			operator: Operator.Not,
			values: [this.goal],
		});
		this.negatedGoalAdded = true;

		return this.addBaseSteps(Step.NegatedGoal, clauses, comment);
	}

	/**
	 * Resolves the clauses of two earlier steps using the Resolution Principle.
	 * If the clauses contain several complementary pairs, one step is added for each resolvent.
	 * @param firstIndex - The index of the first step (1-based)
	 * @param secondIndex - The index of the second step (1-based)
	 * @param comment - Optional explanation applied to every added step
	 * @returns The added proof steps
	 * @throws {Error} if a step index is invalid or resolution is not applicable
	 */
	resolve(
		firstIndex: number,
		secondIndex: number,
		comment?: string,
	): ResolutionProofStep[] {
		const first = this.getExistingStep(firstIndex, "resolve");
		const second = this.getExistingStep(secondIndex, "resolve");

		const newSteps = generateResolutionProofSteps<Step.Derivation>({
			index: this.steps.length + 1,
			step: Step.Derivation,
			payload: {
				clauses: [first.clause, second.clause],
				rule: ResolutionCalculusRule.R,
				derivedFrom: [firstIndex, secondIndex],
			},
		});

		return this.pushSteps(newSteps, comment);
	}

	/**
	 * Reiterates (repeats) the clause of a previous step.
	 * @param fromIndex - The index of the step to reiterate (1-based)
	 * @param comment - Optional explanation for the reiteration
	 * @returns The added reiteration step
	 * @throws {Error} if the step index is invalid
	 */
	reiterateStep(fromIndex: number, comment?: string): ResolutionProofStep {
		const sourceStep = this.getExistingStep(fromIndex, "reiterate");

		const [step] = generateResolutionProofSteps<Step.Reiteration>({
			index: this.steps.length + 1,
			step: Step.Reiteration,
			payload: { clause: [...sourceStep.clause] },
		});

		step.comment = comment ?? `Reiteration: ${fromIndex}`;
		step.derivedFrom = [fromIndex];

		this.steps.push(step);
		return step;
	}

	/**
	 * Checks whether any step of the proof contains the empty clause.
	 * @returns True if the empty clause is present
	 */
	hasEmptyClause(): boolean {
		return this.steps.some((step) => step.clause.length === 0);
	}

	/**
	 * Checks if the proof is complete: the negated goal has been added and the empty clause
	 * has been reached, i.e. `Δ ∪ {¬φ}` is shown to be unsatisfiable.
	 * @returns True if the proof is complete
	 */
	isComplete(): boolean {
		return this.negatedGoalAdded && this.hasEmptyClause();
	}

	/**
	 * Clears all steps from the proof, including the negated goal.
	 */
	clear(): void {
		this.steps = [];
		this.negatedGoalAdded = false;
	}

	/**
	 * Renames a variable in all clauses of the proof. Literals that become equal are merged.
	 * The goal formula is not modified.
	 *
	 * Only atom-for-atom substitution is supported, since substituting a composite formula
	 * would break the clausal form.
	 *
	 * @param atom - The atomic proposition to replace
	 * @param substitute - The atomic proposition to substitute
	 */
	replace(atom: PropAtom, substitute: PropAtom): void {
		this.steps.forEach((step) => {
			const clause = step.clause.map((literal) =>
				replaceAtomInFormula({ formula: literal, atom, substitute }),
			);

			step.clause = normalizePropClause(clause);
			step.stringView = convertPropClauseToString(step.clause);

			if (step.resolvedLiteral) {
				step.resolvedLiteral = replaceAtomInFormula({
					formula: step.resolvedLiteral,
					atom,
					substitute,
				});
			}
		});
	}

	private getExistingStep(index: number, action: string): ResolutionProofStep {
		const step = this.getStep(index);

		if (!step) {
			throw new Error(`Cannot ${action}: step ${index} not found in proof`);
		}

		return step;
	}

	private addBaseSteps(
		step: Step.Premise | Step.NegatedGoal,
		clauses: PropClause[],
		comment?: string,
	): ResolutionProofStep[] {
		const newSteps = clauses.flatMap((clause, offset) =>
			generateResolutionProofSteps<typeof step>({
				index: this.steps.length + 1 + offset,
				step,
				payload: { clause },
			}),
		);

		return this.pushSteps(newSteps, comment);
	}

	private pushSteps(
		newSteps: ResolutionProofStep[],
		comment?: string,
	): ResolutionProofStep[] {
		newSteps.forEach((step) => {
			if (comment) {
				step.comment = comment;
			}
			this.steps.push(step);
		});

		return newSteps;
	}
}
