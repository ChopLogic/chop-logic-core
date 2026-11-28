import { NaturalCalculusRule, Step } from "../../../enums";
import type {
	NaturalDerivedPayload,
	PropAtom,
	PropFormula,
	PropProofStep,
} from "../../../models";
import { BaseProof } from "../../common/base-proof";
import { replaceAtomInProofStep } from "../../common/replace-atom-in-proof-step";
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
export class NaturalProof extends BaseProof<PropProofStep> {
	private currentLevel: number = 0;

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
		const steps = generateNaturalProofSteps<Step.Premise>({
			index: this.steps.length + 1,
			level: this.currentLevel,
			step: Step.Premise,
			payload: { formula },
		});

		return this.pushSteps(steps, comment)[0];
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

		const steps = generateNaturalProofSteps<Step.Assumption>({
			index: this.steps.length + 1,
			level: nextLevel,
			step: Step.Assumption,
			payload: { formula },
		});

		const [added] = this.pushSteps(steps, comment);
		this.currentLevel = nextLevel;
		return added;
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
		const newSteps = generateNaturalProofSteps<Step.Derivation>({
			index: this.steps.length + 1,
			level: this.currentLevel,
			step: Step.Derivation,
			payload,
		});

		return this.pushSteps(newSteps, comment);
	}

	/**
	 * Reiterates (repeats) a previously proved step at the current level (inside a sub-proof).
	 * Allows referring to a formula from an outer level within an inner sub-proof.
	 * @param fromIndex - The index of the step to reiterate (1-based)
	 * @param comment - Optional explanation for the reiteration
	 * @returns The added reiteration step
	 * @throws {Error} if the step index is invalid
	 */
	reiterateStep(fromIndex: number, comment?: string): PropProofStep {
		const sourceStep = this.getStoredStep(fromIndex, "reiterate");
		const sourceLevel = sourceStep.level ?? 0;

		if (sourceLevel >= this.currentLevel) {
			throw new Error(
				`Cannot reiterate: step ${fromIndex} is at level ${sourceLevel}, ` +
					`which is not outer to the current level ${this.currentLevel}`,
			);
		}

		// Create a reiteration step at the current level with the same formula
		const step: PropProofStep = {
			index: this.steps.length + 1,
			level: this.currentLevel,
			step: Step.Reiteration,
			formula: sourceStep.formula,
			expression: sourceStep.expression,
			stringView: sourceStep.stringView,
			derivedFrom: [fromIndex],
			comment: comment || `Reiteration: ${fromIndex}`,
		};

		return this.pushSteps([step])[0];
	}

	/**
	 * Finds the most recent assumption at the current level.
	 * Used to identify the premise F when closing a sub-proof.
	 * @returns The latest assumption step at the current level, or undefined if not found
	 */
	private findCurrentAssumption(): PropProofStep | undefined {
		return [...this.steps]
			.reverse()
			.find(
				(step) =>
					step.level === this.currentLevel && step.step === Step.Assumption,
			);
	}

	/**
	 * Closes a sub-proof by applying Implication Introduction.
	 * Automatically takes the assumption (most recent step at current level) and the
	 * derived conclusion (last step at current level) to create an implication F=>G,
	 * then adds this implication at level-1.
	 * @param comment - Optional explanation for the implication closure
	 * @returns The added proof step
	 */
	closeSubProof(comment?: string): PropProofStep {
		if (this.currentLevel === 0) {
			throw new Error("Cannot close sub-proof when already at level 0");
		}

		// Find the most recent assumption at the current level (the assumption F)
		const assumptionStep = this.findCurrentAssumption();

		if (!assumptionStep) {
			throw new Error(
				"No assumption found at the current level for closing sub-proof",
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
		const newSteps = generateNaturalProofSteps<Step.Derivation>({
			index: this.steps.length + 1,
			level: this.currentLevel - 1,
			step: Step.Derivation,
			payload: {
				formulas: [assumptionStep.formula, lastStepAtCurrentLevel.formula],
				rule: NaturalCalculusRule.II,
				derivedFrom: [lastStepAtCurrentLevel.index],
			},
		});

		const [added] = this.pushSteps(newSteps, comment);
		this.currentLevel -= 1;
		return added;
	}

	/**
	 * Checks if the proof is complete.
	 * A proof is complete when:
	 * 1. The last step's formula structurally equals the goal formula
	 * 2. All sub-proofs are closed (current level is 0)
	 * @returns True if the proof is complete
	 */
	override isComplete(): boolean {
		const lastStep = this.steps.at(-1);

		if (!lastStep) {
			return false;
		}

		// Check if we're back at the main level
		if (this.currentLevel !== 0) {
			return false;
		}

		return arePropFormulasStructurallyEqual([lastStep.formula, this.goal]);
	}

	/**
	 * Clears all steps from the proof and resets the level to 0.
	 */
	override clear(): void {
		super.clear();
		this.currentLevel = 0;
	}

	/**
	 * Replaces all occurrences of an atom with a formula or atom in all proof steps.
	 * The goal formula is not modified.
	 *
	 * @param atom - The atomic proposition to replace
	 * @param substitute - The formula or atom to substitute
	 */
	replace(atom: PropAtom, substitute: PropFormula | PropAtom): void {
		this.steps = this.steps.map((step) =>
			replaceAtomInProofStep(step, atom, substitute),
		);
	}
}
