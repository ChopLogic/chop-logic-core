import type { PropFormula } from "../../../models";
import type { HilbertProof } from "../classes/hilbert-proof";
import type { HilbertProofBuilder } from "../classes/hilbert-proof-builder";
import { buildHilbertProof } from "./build-hilbert-proof";

/**
 * Creates a proof from a functional composition of step generators.
 * Useful for building proofs from higher-order functions.
 *
 * @param goal - The target formula to prove
 * @param stepGenerators - Functions that add steps to the proof
 * @returns The completed HilbertProof instance
 *
 * @example
 * ```typescript
 * const createPremises = (builder: HilbertProofBuilder) => {
 *   builder.addPremise(p, "First premise")
 *          .addPremise(q, "Second premise");
 * };
 *
 * const createAxioms = (builder: HilbertProofBuilder) => {
 *   builder.addAxiom(axiom1, "Axiom II");
 * };
 *
 * const proof = composeHilbertProof(goal, createPremises, createAxioms);
 * ```
 *
 * @category Hilbert Calculus
 */
export function composeHilbertProof(
	goal: PropFormula,
	...stepGenerators: Array<(builder: HilbertProofBuilder) => void>
): HilbertProof {
	const builder = buildHilbertProof(goal);
	for (const generator of stepGenerators) {
		generator(builder);
	}
	return builder.build();
}
