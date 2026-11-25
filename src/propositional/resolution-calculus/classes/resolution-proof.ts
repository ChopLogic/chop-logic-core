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
import { isPropResolvent } from "../../validators/is-prop-resolvent";
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
	private goal: PropFormula;
	private negatedGoalAdded = false;

	/**
	 * Creates a new resolution proof with a goal formula.
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
	getSteps(): readonly ResolutionProofStep[] {
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
	getStep(index: number): ResolutionProofStep | undefined {
		const step = this.steps[index - 1];
		return step && structuredClone(step);
	}

	/**
	 * Gets the last step in the proof.
	 * @returns The final proof step, or undefined if no steps exist
	 */
	getLastStep(): ResolutionProofStep | undefined {
		const step = this.steps.at(-1);
		return step && structuredClone(step);
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
		const first = this.getStoredStep(firstIndex, "resolve");
		const second = this.getStoredStep(secondIndex, "resolve");

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
		const sourceStep = this.getStoredStep(fromIndex, "reiterate");

		const [step] = generateResolutionProofSteps<Step.Reiteration>({
			index: this.steps.length + 1,
			step: Step.Reiteration,
			payload: { clause: [...sourceStep.clause] },
		});

		step.comment = comment ?? `Reiteration: ${fromIndex}`;
		step.derivedFrom = [fromIndex];

		return this.pushSteps([step])[0];
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
	 * Renames a variable throughout the proof: in the goal formula and in every clause.
	 * Literals that become equal are merged.
	 *
	 * The goal is renamed together with the clauses, so the negated goal steps always stay the
	 * negation of the goal. The renamed proof is then a proof of the renamed goal from the
	 * renamed premises.
	 *
	 * Merging literals can change which complementary pairs a clause contains, so after renaming
	 * every derived step is checked again. If a derived clause would no longer be a resolvent of
	 * the steps it was derived from, the replacement is rejected and the proof is left unchanged.
	 *
	 * Only atom-for-atom substitution is supported, since substituting a composite formula
	 * would break the clausal form.
	 *
	 * @param atom - The atomic proposition to replace
	 * @param substitute - The atomic proposition to substitute
	 * @throws {Error} if a derived step would no longer follow from its parent steps by resolution
	 */
	replace(atom: PropAtom, substitute: PropAtom): void {
		const renamedSteps = this.steps.map((step) =>
			renameStep(step, atom, substitute),
		);

		renamedSteps.forEach((step) => {
			if (
				step.step === Step.Derivation &&
				!isStillResolvent(step, renamedSteps)
			) {
				throw new Error(
					`Cannot replace: step ${step.index} would no longer be a resolvent of steps ${step.derivedFrom?.join(", ")}.`,
				);
			}
		});

		this.steps = renamedSteps;
		this.goal = replaceAtomInFormula({ formula: this.goal, atom, substitute });
	}

	/**
	 * Returns the stored (internal) step, not a copy. Must not be exposed to callers.
	 */
	private getStoredStep(index: number, action: string): ResolutionProofStep {
		const step = this.steps[index - 1];

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

	/**
	 * Stores copies of the new steps (detaching them from caller-provided data) and
	 * returns separate copies, so neither inputs nor return values share state with the proof.
	 */
	private pushSteps(
		newSteps: ResolutionProofStep[],
		comment?: string,
	): ResolutionProofStep[] {
		return newSteps.map((step) => {
			if (comment) {
				step.comment = comment;
			}
			const stored = structuredClone(step);
			this.steps.push(stored);
			return structuredClone(stored);
		});
	}
}

/**
 * Returns a renamed copy of a step. The original step is not mutated.
 */
function renameStep(
	step: ResolutionProofStep,
	atom: PropAtom,
	substitute: PropAtom,
): ResolutionProofStep {
	const clause = normalizePropClause(
		step.clause.map((literal) =>
			replaceAtomInFormula({ formula: literal, atom, substitute }),
		),
	);
	const renamed: ResolutionProofStep = {
		...structuredClone(step),
		clause,
		stringView: convertPropClauseToString(clause),
	};

	if (step.resolvedLiteral) {
		renamed.resolvedLiteral = replaceAtomInFormula({
			formula: step.resolvedLiteral,
			atom,
			substitute,
		});
	}

	return renamed;
}

/**
 * Checks that a derived step is still a resolvent of its parent steps,
 * obtained by resolving on its recorded literal.
 */
function isStillResolvent(
	step: ResolutionProofStep,
	steps: ResolutionProofStep[],
): boolean {
	const parents = (step.derivedFrom ?? []).map((index) => steps[index - 1]);

	if (parents.some((parent) => !parent)) {
		return false;
	}

	return isPropResolvent(
		parents.map((parent) => parent.clause),
		step.clause,
		step.resolvedLiteral,
	);
}
