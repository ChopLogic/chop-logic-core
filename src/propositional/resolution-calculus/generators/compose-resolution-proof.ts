import type { PropFormula } from "../../../models";
import type { ResolutionProof } from "../classes/resolution-proof";
import type { ResolutionProofBuilder } from "../classes/resolution-proof-builder";
import { buildResolutionProof } from "./build-resolution-proof";

/**
 * Creates a resolution proof from a functional composition of step generators.
 * Useful for building proofs from higher-order functions.
 *
 * @param goal - The target formula to prove
 * @param stepGenerators - Functions that add steps to the proof
 * @returns The ResolutionProof instance
 *
 * @example
 * ```typescript
 * const addPremises = (builder: ResolutionProofBuilder) => {
 *   builder.addPremise(p).addPremise(pImpliesR);
 * };
 *
 * const refute = (builder: ResolutionProofBuilder) => {
 *   builder.addNegatedGoal().resolve(1, 2).resolve(3, 4);
 * };
 *
 * const proof = composeResolutionProof(r, addPremises, refute);
 * ```
 *
 * @category Resolution Calculus
 */
export function composeResolutionProof(
	goal: PropFormula,
	...stepGenerators: Array<(builder: ResolutionProofBuilder) => void>
): ResolutionProof {
	const builder = buildResolutionProof(goal);
	for (const generator of stepGenerators) {
		generator(builder);
	}
	return builder.build();
}
