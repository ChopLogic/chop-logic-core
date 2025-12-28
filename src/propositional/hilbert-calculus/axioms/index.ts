import { implicationDistribution } from "./implication-distribution";
import { implicationIntroduction } from "./implication-introduction";
import { implicationReversal } from "./implication-reversal";

/**
 *
 * @namespace
 * @category Hilbert Calculus
 */
export const HilbertAxioms = Object.freeze({
	II: implicationIntroduction,
	ID: implicationDistribution,
	IR: implicationReversal,
});
