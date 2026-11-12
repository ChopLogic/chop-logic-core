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

/**
 * A literal: a propositional variable or the negation of a variable (`p` or `¬p`).
 * Structurally a {@link PropFormula} whose operator is `Var`, or `Not` applied to a `Var`.
 *
 * @category Formula Types
 */
export type PropLiteral = PropFormula;

/**
 * A clause: a set of literals interpreted as their disjunction.
 * The empty clause `[]` is an empty disjunction and is therefore unsatisfiable.
 *
 * @category Formula Types
 */
export type PropClause = PropLiteral[];
