import { conjunctionElimination } from "./conjunction-elimination";
import { conjunctionIntroduction } from "./conjunction-introduction";
import { disjunctionElimination } from "./disjunction-elimination";
import { disjunctionIntroduction } from "./disjunction-introduction";
import { equivalenceElimination } from "./equivalence-elimination";
import { equivalenceIntroduction } from "./equivalence-introduction";
import { implicationElimination } from "./implication-elimination";
import { implicationIntroduction } from "./implication-introduction";
import { negationElimination } from "./negation-elimination";
import { negationIntroduction } from "./negation-introduction";

/**
 * @namespace
 * @category Natural Calculus
 */
export const NaturalRules = Object.freeze({
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
