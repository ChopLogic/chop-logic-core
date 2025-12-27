import type { PropFormula } from "../../../models";
import { NaturalProofBuilder } from "../classes/natural-proof-builder";

/**
 * Creates a new proof builder for constructing a Natural Deduction style proof.
 * Provides a functional, fluent API for building proofs step by step.
 *
 * @param goal - The target formula to prove
 * @returns A new NaturalProofBuilder instance
 *
 * @example
 * ```typescript
 * const proof = buildNaturalProof(goalFormula)
 *   .addPremise(premiseA, "Given assumption")
 *   .addAssumption(assumptionB, "Assume B")
 *   .addDerivedStep(derivedPayload, "Implication Elimination")
 *   .closeSubProof("Implication Introduction")
 *   .build();
 *
 * if (proof.isComplete()) {
 *   console.log("Proof is valid!");
 * }
 * ```
 *
 * @category Natural Calculus
 */
export function buildNaturalProof(goal: PropFormula): NaturalProofBuilder {
	return new NaturalProofBuilder(goal);
}
