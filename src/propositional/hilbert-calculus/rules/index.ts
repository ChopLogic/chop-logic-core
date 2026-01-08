import { implicationCreation } from "./implication-creation";
import { implicationDistribution } from "./implication-distribution";
import { implicationElimination } from "./implication-elimination";
import { implicationReversal } from "./implication-reversal";

/**
 * Namespace containing all inference rules in Hilbert-style calculus.
 * Rules are the mechanisms for deriving new formulas from existing ones.
 *
 * Available rules:
 * - IE: Implication Elimination (Modus Ponens)
 * - IC: Implication Creation
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
	IC: implicationCreation,
	ID: implicationDistribution,
	IE: implicationElimination,
	IR: implicationReversal,
});
