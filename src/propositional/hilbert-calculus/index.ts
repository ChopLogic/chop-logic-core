import { generateHilbertProofStep } from "./generate-hilbert-proof-step";
import { implicationDistribution } from "./implication-distribution";
import { implicationElimination } from "./implication-elimination";
import { implicationIntroduction } from "./implication-introduction";
import { implicationReversal } from "./implication-reversal";

export const HilbertCalculus = Object.freeze({
	generateStep: generateHilbertProofStep,
	// Axiom Schemas
	II: implicationIntroduction,
	ID: implicationDistribution,
	IR: implicationReversal,
	IE: implicationElimination,
});
