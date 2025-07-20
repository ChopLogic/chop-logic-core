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
