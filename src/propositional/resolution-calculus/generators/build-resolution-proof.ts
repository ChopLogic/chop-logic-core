import type { PropFormula } from "../../../models";
import { ResolutionProofBuilder } from "../classes/resolution-proof-builder";

/**
 * Creates a new proof builder for constructing a resolution proof.
 * Provides a functional, fluent API for building proofs step by step.
 *
 * @param goal - The target formula to prove
 * @returns A new ResolutionProofBuilder instance
 *
 * @example
 * ```typescript
 * const proof = buildResolutionProof(r)
 *   .addPremise(p)            // 1. {p}
 *   .addPremise(pImpliesR)    // 2. {¬p, r}
 *   .addNegatedGoal()         // 3. {¬r}
 *   .resolve(1, 2)            // 4. {r}
 *   .resolve(3, 4)            // 5. {}
 *   .build();
 *
 * proof.isComplete(); // true
 * ```
 *
 * @category Resolution Calculus
 */
export function buildResolutionProof(
	goal: PropFormula,
): ResolutionProofBuilder {
	return new ResolutionProofBuilder(goal);
}
