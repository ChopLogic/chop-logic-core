import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { eliminatePropImplications } from "../eliminate-prop-implications";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const r: PropFormula = { operator: Operator.Var, values: ["r"] };

const not = (a: PropFormula): PropFormula => ({
	operator: Operator.Not,
	values: [a],
});
const bin = (
	operator: Operator,
	a: PropFormula,
	b: PropFormula,
): PropFormula => ({ operator, values: [a, b] });
const and = (a: PropFormula, b: PropFormula) => bin(Operator.And, a, b);
const or = (a: PropFormula, b: PropFormula) => bin(Operator.Or, a, b);
const top = bin(Operator.Tautology, p, q);
const bottom = bin(Operator.Contradiction, p, q);

describe("eliminatePropImplications", () => {
	it("returns variables unchanged", () => {
		expect(eliminatePropImplications(p)).toEqual(p);
	});

	it("keeps negation, conjunction and disjunction", () => {
		const formula = or(and(not(p), q), not(r));
		expect(eliminatePropImplications(formula)).toEqual(formula);
	});

	it.each([
		["implication", Operator.Implies, or(not(p), q)],
		["reversed implication", Operator.ReversedImplies, or(p, not(q))],
		["equivalence", Operator.Equiv, and(or(not(p), q), or(p, not(q)))],
		["xor", Operator.Xor, and(or(p, q), or(not(p), not(q)))],
		["nand", Operator.Nand, or(not(p), not(q))],
		["nor", Operator.Nor, and(not(p), not(q))],
		["anti-implication", Operator.AntiImplies, and(p, not(q))],
		["reversed anti-implication", Operator.ReversedAntiImplies, and(not(p), q)],
	])("rewrites %s", (_, operator, expected) => {
		expect(eliminatePropImplications(bin(operator, p, q))).toEqual(expected);
	});

	it("rewrites nested operators recursively", () => {
		// g ∧ (r ⇒ f) → g ∧ (¬r ∨ f)
		const formula = and(p, bin(Operator.Implies, q, bin(Operator.Nor, p, r)));
		expect(eliminatePropImplications(formula)).toEqual(
			and(p, or(not(q), and(not(p), not(r)))),
		);
	});

	it("rewrites operators inside a negation", () => {
		expect(eliminatePropImplications(not(bin(Operator.Implies, p, q)))).toEqual(
			not(or(not(p), q)),
		);
	});

	describe("constants", () => {
		it("returns a root constant unchanged", () => {
			expect(eliminatePropImplications(top)).toBe(top);
			expect(eliminatePropImplications(bottom)).toBe(bottom);
		});

		it("does not rewrite operands of a constant", () => {
			const constant = bin(Operator.Tautology, bin(Operator.Implies, p, q), r);
			expect(eliminatePropImplications(constant)).toBe(constant);
		});

		it("folds negated constants", () => {
			expect(eliminatePropImplications(not(top))).toEqual({
				operator: Operator.Contradiction,
				values: [p, q],
			});
			expect(eliminatePropImplications(not(bottom))).toEqual({
				operator: Operator.Tautology,
				values: [p, q],
			});
			expect(eliminatePropImplications(not(not(top)))).toEqual(top);
		});

		it("folds conjunctions with constants", () => {
			expect(eliminatePropImplications(and(p, bottom))).toEqual(bottom);
			expect(eliminatePropImplications(and(bottom, p))).toEqual(bottom);
			expect(eliminatePropImplications(and(p, top))).toEqual(p);
			expect(eliminatePropImplications(and(top, p))).toEqual(p);
			expect(eliminatePropImplications(and(top, bottom))).toEqual(bottom);
			expect(eliminatePropImplications(and(bottom, top))).toEqual(bottom);
		});

		it("folds disjunctions with constants", () => {
			expect(eliminatePropImplications(or(p, top))).toEqual(top);
			expect(eliminatePropImplications(or(top, p))).toEqual(top);
			expect(eliminatePropImplications(or(p, bottom))).toEqual(p);
			expect(eliminatePropImplications(or(bottom, p))).toEqual(p);
			expect(eliminatePropImplications(or(top, bottom))).toEqual(top);
			expect(eliminatePropImplications(or(bottom, top))).toEqual(top);
		});

		it("folds constants produced by rewritten operators", () => {
			// p ⇒ ⊤ = ⊤, ⊤ ⇒ p = p, p ⇔ ⊥ = ¬p, p ⊕ ⊤ = ¬p
			expect(eliminatePropImplications(bin(Operator.Implies, p, top))).toEqual(
				top,
			);
			expect(eliminatePropImplications(bin(Operator.Implies, top, p))).toEqual(
				p,
			);
			expect(eliminatePropImplications(bin(Operator.Equiv, p, bottom))).toEqual(
				not(p),
			);
			expect(eliminatePropImplications(bin(Operator.Xor, p, top))).toEqual(
				not(p),
			);
		});

		it("folds a deeply nested constant up to the root", () => {
			const formula = bin(Operator.Implies, q, or(r, and(p, not(bottom))));
			expect(eliminatePropImplications(formula)).toEqual(or(not(q), or(r, p)));
			expect(eliminatePropImplications(and(r, or(q, and(p, bottom))))).toEqual(
				and(r, q),
			);
		});
	});

	it("does not mutate the input formula", () => {
		const formula = bin(Operator.Equiv, not(p), bin(Operator.Xor, q, r));
		const copy = structuredClone(formula);
		eliminatePropImplications(formula);
		expect(formula).toEqual(copy);
	});

	it("throws for an unknown operator", () => {
		const formula = and(p, {
			operator: "UNKNOWN" as Operator,
			values: [p, q],
		});
		expect(() => eliminatePropImplications(formula)).toThrow(
			'Unknown operator: "UNKNOWN".',
		);
	});
});
