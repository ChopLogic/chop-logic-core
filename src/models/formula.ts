import type { Operator } from "../enums";
import type { PropAtom } from "./basic";

// ============== Formula Types ==============

/**
 * Represents a well-formed formula in propositional logic.
 * Can be either atomic or composite with an operator and subformulas.
 *
 * @category Formula Types
 */
export interface PropFormula {
	/** The main logical operator of the formula */
	operator: Operator;
	/** Either sub-formulas for composite formulas or an atomic proposition */
	values: PropFormula[] | PropAtom;
}

/**
 * Maps indices to atomic propositions for variable tracking.
 * Used to maintain associations between formula parts.
 *
 * @category Formula Types
 */
export type PropFormulaVariablesMap = Map<number, PropAtom>;
