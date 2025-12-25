import { NaturalCalculusRule, Step } from "../../../enums";
import type {
	NaturalBasePayload,
	NaturalDerivedPayload,
	NaturalProofStepInput,
	PropFormula,
	PropProofStep,
} from "../../../models";
import { arePropFormulasStructurallyEqual } from "../../validators";
import { generateNaturalProofSteps } from "../generators/generate-natural-proof-steps";

/**
 * Represents a complete proof in Natural Deduction style calculus.
 * Manages a sequence of proof steps where the final step is the goal formula.
 * Supports premises, assumptions (sub-proofs), and derived steps using natural deduction rules.
 * Tracks nesting levels to manage sub-proofs and ensures proofs are properly closed at level 0.
 *
 * @category Natural Calculus
 */
export class NaturalProof {
	private steps: PropProofStep[] = [];
	private readonly goal: PropFormula;
	private currentLevel: number = 0;

	/**
	 * Creates a new Natural Deduction proof with a goal formula.
	 * @param goal - The target formula to prove
	 */
	constructor(goal: PropFormula) {
		this.goal = goal;
	}

	/**
	 * Gets all proof steps in order.
	 * @returns Array of proof steps
	 */
	getSteps(): readonly PropProofStep[] {
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
	getStep(index: number): PropProofStep | undefined {
		return this.steps[index - 1];
	}

	/**
	 * Gets the current nesting level for sub-proofs.
	 * @returns The current level (0 = main proof, > 0 = inside assumption)
	 */
	getCurrentLevel(): number {
		return this.currentLevel;
	}

	/**
	 * Adds a premise (given assumption) to the proof at the current level.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation for the premise
	 * @returns The added proof step
	 */
	addPremise(formula: PropFormula, comment?: string): PropProofStep {
		const steps = generateNaturalProofSteps({
			index: this.steps.length + 1,
			level: this.currentLevel,
			step: Step.Premise,
			payload: { formula } as NaturalBasePayload,
		} as NaturalProofStepInput<Step.Premise>);

		const step = steps[0];
		if (comment) {
			step.comment = comment;
		}

		this.steps.push(step);
		return step;
	}

	/**
	 * Adds an assumption (opens a sub-proof) at the next level.
	 * Creates a new assumption that increases the nesting level.
	 * @param formula - The assumption formula
	 * @param comment - Optional explanation for the assumption
	 * @returns The added proof step
	 */
	addAssumption(formula: PropFormula, comment?: string): PropProofStep {
		const nextLevel = this.currentLevel + 1;

		const steps = generateNaturalProofSteps({
			index: this.steps.length + 1,
			level: nextLevel,
			step: Step.Assumption,
			payload: { formula } as NaturalBasePayload,
		} as NaturalProofStepInput<Step.Assumption>);

		const step = steps[0];
		if (comment) {
			step.comment = comment;
		}

		this.steps.push(step);
		this.currentLevel = nextLevel;
		return step;
	}

	/**
	 * Adds a derived step using a Natural Deduction rule.
	 * Can be used to apply rules within the current level (including sub-proofs).
	 * @param payload - The derived step payload containing formulas, rule, and step references
	 * @param comment - Optional explanation for the derivation
	 * @returns The array of added proof steps
	 */
	addDerivedStep(
		payload: NaturalDerivedPayload,
		comment?: string,
	): PropProofStep[] {
		const newSteps = generateNaturalProofSteps({
			index: this.steps.length + 1,
			level: this.currentLevel,
			step: Step.Derivation,
			payload,
		} as NaturalProofStepInput<Step.Derivation>);

		newSteps.forEach((step) => {
			if (comment) {
				step.comment = comment;
			}
			this.steps.push(step);
		});

		return newSteps;
	}

	/**
	 * Closes a sub-proof by applying Implication Introduction.
	 * Automatically takes the assumption (first step at current level) and the
	 * derived conclusion (last step at current level) to create an implication F=>G,
	 * then adds this implication at level-1.
	 * @param comment - Optional explanation for the implication closure
	 * @returns The added proof step
	 */
	closeSubProof(comment?: string): PropProofStep {
		if (this.currentLevel === 0) {
			throw new Error("Cannot close sub-proof when already at level 0");
		}

		// Find the first step at the current level (the assumption F)
		const assumptionStep = this.steps.find(
			(step) => step.level === this.currentLevel,
		);

		if (!assumptionStep) {
			throw new Error(
				"No steps found at the current level for closing sub-proof",
			);
		}

		// Get the last step at the current level (the derived conclusion G)
		const lastStepAtCurrentLevel = [...this.steps]
			.reverse()
			.find((step) => step.level === this.currentLevel);

		if (!lastStepAtCurrentLevel) {
			throw new Error(
				"No steps found at the current level for closing sub-proof",
			);
		}

		// Use generateNaturalProofSteps to create the implication step
		const newSteps = generateNaturalProofSteps({
			index: this.steps.length + 1,
			level: this.currentLevel - 1,
			step: Step.Derivation,
			payload: {
				formulas: [assumptionStep.formula, lastStepAtCurrentLevel.formula],
				rule: NaturalCalculusRule.II,
				derivedFrom: [lastStepAtCurrentLevel.index],
			} as NaturalDerivedPayload,
		} as NaturalProofStepInput<Step.Derivation>);

		const newStep = newSteps[0];
		if (comment) {
			newStep.comment = comment;
		}

		this.steps.push(newStep);
		this.currentLevel -= 1;
		return newStep;
	}

	/**
	 * Gets the last step in the proof.
	 * @returns The final proof step, or undefined if no steps exist
	 */
	getLastStep(): PropProofStep | undefined {
		return this.steps.at(-1);
	}

	/**
	 * Checks if the proof is complete.
	 * A proof is complete when:
	 * 1. The last step's formula structurally equals the goal formula
	 * 2. All sub-proofs are closed (current level is 0)
	 * @returns True if the proof is complete
	 */
	isComplete(): boolean {
		if (this.steps.length === 0) {
			return false;
		}

		// Check if we're back at the main level
		if (this.currentLevel !== 0) {
			return false;
		}

		const lastStep = this.getLastStep() as PropProofStep;

		return arePropFormulasStructurallyEqual([lastStep.formula, this.goal]);
	}

	/**
	 * Clears all steps from the proof and resets the level to 0.
	 */
	clear(): void {
		this.steps = [];
		this.currentLevel = 0;
	}
}
