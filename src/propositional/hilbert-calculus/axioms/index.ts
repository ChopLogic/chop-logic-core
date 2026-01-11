import { implicationDistributionSchema } from "./implication-distribution";
import { implicationIntroductionSchema } from "./implication-introduction";
import { implicationReversalSchema } from "./implication-reversal";

/**
 * Namespace containing all axiom schemas in Hilbert-style calculus.
 * Axioms are fundamental logical truths that serve as starting points for proofs.
 *
 * Available axiom schemas:
 * - II: Implication Introduction
 * - ID: Implication Distribution
 * - IR: Implication Reversal
 *
 * Each axiom can be instantiated with specific propositions through substitution.
 *
 * @namespace
 * @category Hilbert Calculus
 */
export const HilbertAxioms = Object.freeze({
	II: implicationIntroductionSchema,
	ID: implicationDistributionSchema,
	IR: implicationReversalSchema,
});
