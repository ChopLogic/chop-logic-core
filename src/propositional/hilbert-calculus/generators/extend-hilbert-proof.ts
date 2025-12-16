import { Step } from "../../../enums";
import type { HilbertProof } from "../classes/hilbert-proof";
import { HilbertProofBuilder } from "../classes/hilbert-proof-builder";

/**
 * Extends an existing proof by adding more steps.
 * Useful for building proofs incrementally or combining sub-proofs.
 *
 * @param existingProof - The proof to extend
 * @param stepsFn - A callback that adds steps to the proof
 * @returns The extended HilbertProof instance
 *
 * @example
 * ```typescript
 * let proof = buildHilbertProof(goal1).addPremise(p).build();
 * proof = extendHilbertProof(proof, (builder) => {
 *   builder.addAxiom(axiom1, "Additional axiom");
 * });
 * ```
 *
 * @category Hilbert Proof System
 */
export function extendHilbertProof(
	existingProof: HilbertProof,
	stepsFn: (builder: HilbertProofBuilder) => void,
): HilbertProof {
	const builder = new HilbertProofBuilder(existingProof.getGoal());

	// Copy existing steps
	for (const step of existingProof.getSteps()) {
		switch (step.step) {
			case Step.Premise:
				builder.addPremise(step.formula, step.comment);
				break;
			case Step.Axiom:
				// Note: We need to reconstruct the axiom payload from the step
				// For now, we'll add the formula as a premise to preserve the proof structure
				builder.addPremise(step.formula, step.comment);
				break;
			case Step.Derivation:
				// Similarly for derived steps
				builder.addPremise(step.formula, step.comment);
				break;
		}
	}

	// Add new steps
	stepsFn(builder);
	return builder.build();
}
