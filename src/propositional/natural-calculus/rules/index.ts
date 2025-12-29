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
 * Namespace containing all Natural Deduction inference rules.
 * Provides a complete set of introduction and elimination rules for propositional logic.
 *
 * Introduction rules allow deriving new formulas:
 * - NI: Negation Introduction
 * - CI: Conjunction Introduction
 * - DI: Disjunction Introduction
 * - II: Implication Introduction
 * - EI: Equivalence Introduction
 *
 * Elimination rules extract information from formulas:
 * - NE: Negation Elimination
 * - CE: Conjunction Elimination
 * - DE: Disjunction Elimination
 * - IE: Implication Elimination
 * - EE: Equivalence Elimination
 *
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
