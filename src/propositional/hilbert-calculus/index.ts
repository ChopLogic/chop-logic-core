import { generateHilbertProofStep } from "./generate-hilbert-proof-step";
import { implicationDistribution } from "./implication-distribution";
import { implicationElimination } from "./implication-elimination";
import { implicationIntroduction } from "./implication-introduction";
import { implicationReversal } from "./implication-reversal";

/**
 * Implementation of Hilbert-style propositional calculus.
 * Provides axiom schemas and proof generation for the Hilbert system.
 *
 * @remarks
 * Hilbert systems are characterized by a small number of axiom schemas and typically
 * only one inference rule (usually modus ponens). While mathematically elegant,
 * they can be more challenging to use for practical proof construction.
 *
 * @namespace
 * @category Proof Systems
 */
export const HilbertCalculus = Object.freeze({
	generateStep: generateHilbertProofStep,
	// Axiom Schemas
	II: implicationIntroduction,
	ID: implicationDistribution,
	IR: implicationReversal,
	IE: implicationElimination,
});
