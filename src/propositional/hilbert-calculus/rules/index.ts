import { implicationDistributionRule } from "./implication-distribution";
import { implicationEliminationRule } from "./implication-elimination";
import { implicationIntroductionRule } from "./implication-introduction";
import { implicationReversalRule } from "./implication-reversal";

/**
 * Namespace containing all inference rules in Hilbert-style calculus.
 * Rules are the mechanisms for deriving new formulas from existing ones.
 *
 * Available rules:
 * - IE: Implication Elimination (Modus Ponens)
 * - II: Implication Introduction
 * - ID: Implication Distribution
 * - IR: Implication Reversal
 *
 * Hilbert-style calculus uses a minimal set of rules, relying heavily on axiom schemas
 * for its deductive power.
 *
 * @namespace
 * @category Hilbert Calculus
 */
export const HilbertRules = Object.freeze({
	II: implicationIntroductionRule,
	ID: implicationDistributionRule,
	IE: implicationEliminationRule,
	IR: implicationReversalRule,
});
