import { Operator } from "../../enums";
import type { PropClause, PropLiteral } from "../../models";
import { arePropClausesEqual } from "./are-prop-clauses-equal";
import { arePropFormulasStructurallyEqual } from "./are-prop-formulas-structurally-equal";
import { arePropLiteralsComplementary } from "./are-prop-literals-complementary";
import { isResolutionApplicable } from "./is-resolution-applicable";

const without = (clause: PropClause, literal: PropLiteral): PropClause =>
	clause.filter((other) => !arePropFormulasStructurallyEqual([other, literal]));

/**
 * Checks whether a clause is a resolvent of two clauses by the Resolution Principle:
 * for some complementary pair `χ` in one clause and `¬χ` in the other, the resolvent equals
 * the union of both clauses without that pair. Clauses are compared as sets of literals.
 *
 * If `resolvedLiteral` is given, only the complementary pair on that literal is considered.
 * The resolved literal is the positive literal of the pair (`χ`, not `¬χ`).
 *
 * @param clauses - An array of exactly two parent clauses.
 * @param resolvent - The clause to check.
 * @param resolvedLiteral - Optional positive literal the resolution must be performed on.
 * @returns True if `resolvent` is obtained by resolving the clauses (on `resolvedLiteral`, if given),
 * otherwise false. Returns false if resolution is not applicable to the clauses.
 * @category Validators
 *
 * @example
 * isPropResolvent([[p, q], [notQ, r]], [p, r]); // true
 * isPropResolvent([[p, q], [notQ, r]], [p, r], q); // true
 * isPropResolvent([[p, q], [notQ, r]], [p, r], p); // false
 * isPropResolvent([[p, q], [notP, notQ]], []); // false, resolving on one pair leaves the other
 */
export function isPropResolvent(
	clauses: PropClause[],
	resolvent: PropClause,
	resolvedLiteral?: PropLiteral,
): boolean {
	if (!isResolutionApplicable(clauses)) return false;

	const [first, second] = clauses;

	return first.some((literal) =>
		second.some((other) => {
			if (!arePropLiteralsComplementary([literal, other])) return false;

			const positive = literal.operator === Operator.Var ? literal : other;

			if (
				resolvedLiteral &&
				!arePropFormulasStructurallyEqual([positive, resolvedLiteral])
			) {
				return false;
			}

			return arePropClausesEqual([
				[...without(first, literal), ...without(second, other)],
				resolvent,
			]);
		}),
	);
}
