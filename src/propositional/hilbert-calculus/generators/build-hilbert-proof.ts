import type { PropFormula } from "../../../models";
import { HilbertProofBuilder } from "../classes/hilbert-proof-builder";

/**
 * Creates a new proof builder for constructing a Hilbert-style proof.
 * Provides a functional, fluent API for building proofs step by step.
 *
 * @param goal - The target formula to prove
 * @returns A new HilbertProofBuilder instance
 *
 * @example
 * ```typescript
 * const proof = buildHilbertProof(goalFormula)
 *   .addPremise(premiseA, "Given assumption")
 *   .addAxiom(axiomPayload, "Axiom II")
 *   .addDerivedStep(derivedPayload, "Modus Ponens")
 *   .build();
 *
 * if (proof.isComplete()) {
 *   console.log("Proof is valid!");
 * }
 * ```
 *
 * @category Hilbert Calculus
 */
export function buildHilbertProof(goal: PropFormula): HilbertProofBuilder {
	return new HilbertProofBuilder(goal);
}
