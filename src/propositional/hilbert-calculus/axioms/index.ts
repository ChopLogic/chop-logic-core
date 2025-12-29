import { implicationDistribution } from "./implication-distribution";
import { implicationIntroduction } from "./implication-introduction";
import { implicationReversal } from "./implication-reversal";

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
	II: implicationIntroduction,
	ID: implicationDistribution,
	IR: implicationReversal,
});
