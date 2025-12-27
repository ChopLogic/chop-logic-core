import type { PropFormula } from "../../../models";
import type { NaturalProof } from "../classes/natural-proof";
import type { NaturalProofBuilder } from "../classes/natural-proof-builder";
import { buildNaturalProof } from "./build-natural-proof";

/**
 * Creates a proof from a functional composition of step generators.
 * Useful for building proofs from higher-order functions and callbacks.
 *
 * @param goal - The target formula to prove
 * @param stepGenerators - Functions that add steps to the proof
 * @returns The completed NaturalProof instance
 *
 * @example
 * ```typescript
 * const createPremises = (builder: NaturalProofBuilder) => {
 *   builder.addPremise(p, "First premise")
 *          .addPremise(q, "Second premise");
 * };
 *
 * const createSubProof = (builder: NaturalProofBuilder) => {
 *   builder.addAssumption(r, "Assume r")
 *          .addDerivedStep(derivedPayload, "Rule application")
 *          .closeSubProof("Implication Introduction");
 * };
 *
 * const proof = composeNaturalProof(goal, createPremises, createSubProof);
 * ```
 *
 * @category Natural Calculus
 */
export function composeNaturalProof(
	goal: PropFormula,
	...stepGenerators: Array<(builder: NaturalProofBuilder) => void>
): NaturalProof {
	const builder = buildNaturalProof(goal);
	for (const generator of stepGenerators) {
		generator(builder);
	}
	return builder.build();
}
