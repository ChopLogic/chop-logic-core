import { Step } from "../../../enums";
import type {
	HilbertAxiomPayload,
	HilbertDerivedPayload,
	PropAtom,
	PropFormula,
	PropProofStep,
} from "../../../models";
import { BaseProof } from "../../common/base-proof";
import { replaceAtomInProofStep } from "../../common/replace-atom-in-proof-step";
import { arePropFormulasStructurallyEqual } from "../../validators";
import { generateHilbertProofSteps } from "../generators/generate-hilbert-proof-steps";

/**
 * Represents a complete proof in Hilbert-style calculus.
 * Manages a sequence of proof steps where the final step is the goal formula.
 * Each step can be an axiom, premise, or derived from previous steps.
 *
 * @category Hilbert Calculus
 */
export class HilbertProof extends BaseProof<PropProofStep> {
	/**
	 * Adds a premise (given assumption) to the proof.
	 * @param formula - The premise formula
	 * @param comment - Optional explanation for the premise
	 * @returns The added proof step
	 */
	addPremise(formula: PropFormula, comment?: string): PropProofStep {
		const steps = generateHilbertProofSteps<Step.Premise>({
			index: this.steps.length + 1,
			step: Step.Premise,
			payload: { formula },
		});

		return this.pushSteps(steps, comment)[0];
	}

	/**
	 * Adds an axiom step to the proof.
	 * @param payload - The axiom payload containing formulas and schema
	 * @param comment - Optional explanation for the axiom
	 * @returns The added proof step
	 */
	addAxiom(payload: HilbertAxiomPayload, comment?: string): PropProofStep {
		const steps = generateHilbertProofSteps<Step.Axiom>({
			index: this.steps.length + 1,
			step: Step.Axiom,
			payload,
		});

		return this.pushSteps(steps, comment)[0];
	}

	/**
	 * Adds a derived step to the proof using a Hilbert calculus rule.
	 * @param payload - The derived step payload containing formulas, schema, and step references
	 * @param comment - Optional explanation for the derivation
	 * @returns The added proof steps
	 */
	addDerivedStep(
		payload: HilbertDerivedPayload,
		comment?: string,
	): PropProofStep[] {
		const newSteps = generateHilbertProofSteps<Step.Derivation>({
			index: this.steps.length + 1,
			step: Step.Derivation,
			payload,
		});

		return this.pushSteps(newSteps, comment);
	}

	/**
	 * Checks if the proof is complete (last step matches the goal).
	 * A proof consisting only of premises is not complete.
	 * @returns True if the last step's formula matches the goal
	 */
	override isComplete(): boolean {
		const lastStep = this.steps.at(-1);

		if (!lastStep) {
			return false;
		}

		if (this.steps.every((step) => step.step === Step.Premise)) {
			return false;
		}

		return arePropFormulasStructurallyEqual([lastStep.formula, this.goal]);
	}

	/**
	 * Reiterates (repeats) a previously proved step.
	 * Allows referring to a formula from an earlier step in the proof.
	 * @param fromIndex - The index of the step to reiterate (1-based)
	 * @param comment - Optional explanation for the reiteration
	 * @returns The added reiteration step
	 * @throws {Error} if the step index is invalid
	 */
	reiterateStep(fromIndex: number, comment?: string): PropProofStep {
		const sourceStep = this.getStoredStep(fromIndex, "reiterate");

		const [step] = generateHilbertProofSteps<Step.Reiteration>({
			index: this.steps.length + 1,
			step: Step.Reiteration,
			payload: { formula: sourceStep.formula },
		});

		step.comment = comment || `Reiteration: ${fromIndex}`;
		step.derivedFrom = [fromIndex];

		return this.pushSteps([step])[0];
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
