import { Step } from "../../../enums";
import type {
	HilbertAxiomPayload,
	HilbertBasePayload,
	HilbertDerivedPayload,
	HilbertProofStepInput,
	PropFormula,
	PropProofStep,
} from "../../../models";
import { arePropFormulasStructurallyEqual } from "../../validators";
import { generateHilbertProofStep } from "../generators/generate-hilbert-proof-step";

/**
 * Represents a complete proof in Hilbert-style calculus.
 * Manages a sequence of proof steps where the final step is the goal formula.
 * Each step can be an axiom, premise, or derived from previous steps.
 *
 * @category Hilbert Proof System
 */
export class HilbertProof {
	private steps: PropProofStep[] = [];
	private goal: PropFormula;

	/**
	 * Creates a new Hilbert proof with a goal formula.
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
	 * Adds a premise (given assumption) to the proof.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation for the premise
	 * @returns The added proof step
	 */
	addPremise(formula: PropFormula, comment?: string): PropProofStep {
		const step = generateHilbertProofStep({
			index: this.steps.length + 1,
			step: Step.Premise,
			payload: { formula } as HilbertBasePayload,
		});

		if (comment) {
			step.comment = comment;
		}

		this.steps.push(step);
		return step;
	}

	/**
	 * Adds an axiom step to the proof.
	 * @param payload - The axiom payload containing formulas and schema
	 * @param comment - Optional explanation for the axiom
	 * @returns The added proof step
	 */
	addAxiom(payload: HilbertAxiomPayload, comment?: string): PropProofStep {
		const step = generateHilbertProofStep({
			index: this.steps.length + 1,
			step: Step.Axiom,
			payload,
		} as HilbertProofStepInput<Step.Axiom>);

		if (comment) {
			step.comment = comment;
		}

		this.steps.push(step);
		return step;
	}

	/**
	 * Adds a derived step to the proof using a Hilbert calculus rule.
	 * @param payload - The derived step payload containing formulas, schema, and step references
	 * @param comment - Optional explanation for the derivation
	 * @returns The added proof step
	 */
	addDerivedStep(
		payload: HilbertDerivedPayload,
		comment?: string,
	): PropProofStep {
		const step = generateHilbertProofStep({
			index: this.steps.length + 1,
			step: Step.Derivation,
			payload,
		} as HilbertProofStepInput<Step.Derivation>);

		if (comment) {
			step.comment = comment;
		}

		this.steps.push(step);
		return step;
	}

	/**
	 * Checks if the proof is complete (last step matches the goal).
	 * @returns True if the last step's formula matches the goal
	 */
	isComplete(): boolean {
		if (this.steps.length === 0) {
			return false;
		}

		if (this.steps.every((step) => step.step === Step.Premise)) {
			return false;
		}

		const lastStep = this.steps[this.steps.length - 1];
		return arePropFormulasStructurallyEqual([lastStep.formula, this.goal]);
	}

	/**
	 * Gets the last step in the proof (which should be the goal).
	 * @returns The final proof step, or undefined if no steps exist
	 */
	getLastStep(): PropProofStep | undefined {
		return this.steps[this.steps.length - 1] || undefined;
	}

	/**
	 * Clears all steps from the proof.
	 */
	clear(): void {
		this.steps = [];
	}
}
