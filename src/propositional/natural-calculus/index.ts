import { conjunctionElimination } from "./conjunction-elimination";
import { conjunctionIntroduction } from "./conjunction-introduction";
import { disjunctionElimination } from "./disjunction-elimination";
import { disjunctionIntroduction } from "./disjunction-introduction";
import { equivalenceElimination } from "./equivalence-elimination";
import { equivalenceIntroduction } from "./equivalence-introduction";
import { generateNaturalProofSteps } from "./generate-natural-proof-steps";
import { implicationElimination } from "./implication-elimination";
import { implicationIntroduction } from "./implication-introduction";
import { negationElimination } from "./negation-elimination";
import { negationIntroduction } from "./negation-introduction";

/**
 * Implementation of natural deduction system for propositional logic.
 * Provides introduction and elimination rules for logical connectives.
 *
 * @remarks
 * Natural deduction is a more intuitive proof system that mirrors human reasoning.
 * Each logical connective has its own introduction and elimination rules, making
 * the system more practical for constructing proofs than axiomatic systems.
 *
 * @namespace
 * @category Proof Systems
 */
export const NaturalCalculus = Object.freeze({
	generateSteps: generateNaturalProofSteps,
	// Introduction rules
	NI: negationIntroduction,
	CI: conjunctionIntroduction,
	DI: disjunctionIntroduction,
	II: implicationIntroduction,
	EI: equivalenceIntroduction,
	// Elimination rules
	NE: negationElimination,
	CE: conjunctionElimination,
	DE: disjunctionElimination,
	IE: implicationElimination,
	EE: equivalenceElimination,
});
