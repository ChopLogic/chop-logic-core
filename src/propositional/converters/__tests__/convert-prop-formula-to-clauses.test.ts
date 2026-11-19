import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { convertPropFormulaToClauses } from "../convert-prop-formula-to-clauses";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const r: PropFormula = { operator: Operator.Var, values: ["r"] };
const g: PropFormula = { operator: Operator.Var, values: ["g"] };
const f: PropFormula = { operator: Operator.Var, values: ["f"] };

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

describe("convertPropFormulaToClauses", () => {
	it("converts g ∧ (r ⇒ f) to {g}, {¬r, f}", () => {
		expect(
			convertPropFormulaToClauses(and(g, bin(Operator.Implies, r, f))),
		).toEqual([[g], [not(r), f]]);
	});

	it("converts ¬(g ∧ (r ⇒ f)) to {¬g, r}, {¬g, ¬f}", () => {
		expect(
			convertPropFormulaToClauses(not(and(g, bin(Operator.Implies, r, f)))),
		).toEqual([
			[not(g), r],
			[not(g), not(f)],
		]);
	});

	it("converts literals to unit clauses", () => {
		expect(convertPropFormulaToClauses(p)).toEqual([[p]]);
		expect(convertPropFormulaToClauses(not(p))).toEqual([[not(p)]]);
		expect(convertPropFormulaToClauses(not(not(p)))).toEqual([[p]]);
	});

	it("flattens nested disjunctions into a single clause", () => {
		expect(convertPropFormulaToClauses(or(or(p, not(q)), or(r, f)))).toEqual([
			[p, not(q), r, f],
		]);
	});

	it("flattens nested conjunctions into separate clauses", () => {
		expect(convertPropFormulaToClauses(and(and(p, not(q)), and(r, f)))).toEqual(
			[[p], [not(q)], [r], [f]],
		);
	});

	it("removes duplicate literals within a clause", () => {
		expect(convertPropFormulaToClauses(or(p, or(q, p)))).toEqual([[p, q]]);
		expect(convertPropFormulaToClauses(or(not(p), not(p)))).toEqual([[not(p)]]);
	});

	it("distinguishes a literal from its negation", () => {
		expect(convertPropFormulaToClauses(or(p, not(p)))).toEqual([[p, not(p)]]);
		expect(convertPropFormulaToClauses(and(p, not(p)))).toEqual([
			[p],
			[not(p)],
		]);
	});

	it("removes duplicate clauses regardless of literal order", () => {
		expect(convertPropFormulaToClauses(and(or(p, q), or(q, p)))).toEqual([
			[p, q],
		]);
		expect(
			convertPropFormulaToClauses(and(or(p, q), and(r, or(q, or(p, q))))),
		).toEqual([[p, q], [r]]);
	});

	it("does not confuse clauses whose literal keys concatenate equally", () => {
		const ab: PropFormula = { operator: Operator.Var, values: ["a,b"] };
		const a: PropFormula = { operator: Operator.Var, values: ["a"] };
		const b: PropFormula = { operator: Operator.Var, values: ["b"] };
		expect(convertPropFormulaToClauses(and(ab, or(a, b)))).toEqual([
			[ab],
			[a, b],
		]);
	});

	it("removes duplicate literals regardless of object property order", () => {
		const reorderedP = { values: ["p"], operator: Operator.Var } as PropFormula;
		const reorderedNotP = {
			values: [reorderedP],
			operator: Operator.Not,
		} as PropFormula;

		expect(convertPropFormulaToClauses(or(p, reorderedP))).toEqual([[p]]);
		expect(convertPropFormulaToClauses(or(not(p), reorderedNotP))).toEqual([
			[not(p)],
		]);
		expect(convertPropFormulaToClauses(or(not(p), not(reorderedP)))).toEqual([
			[not(p)],
		]);
	});

	it("removes duplicate clauses regardless of object property order", () => {
		const reorderedP = { values: ["p"], operator: Operator.Var } as PropFormula;

		expect(convertPropFormulaToClauses(and(p, reorderedP))).toEqual([[p]]);
		expect(
			convertPropFormulaToClauses(and(or(p, not(q)), or(not(q), reorderedP))),
		).toEqual([[p, not(q)]]);
	});

	it("does not confuse a variable named like a negated literal", () => {
		const tildeP: PropFormula = { operator: Operator.Var, values: ["~p"] };
		expect(convertPropFormulaToClauses(or(not(p), tildeP))).toEqual([
			[not(p), tildeP],
		]);
	});

	it("converts an equivalence", () => {
		expect(convertPropFormulaToClauses(bin(Operator.Equiv, p, q))).toEqual([
			[not(p), q],
			[p, not(q)],
		]);
	});

	it("returns no clauses for a tautology", () => {
		expect(convertPropFormulaToClauses(bin(Operator.Tautology, p, q))).toEqual(
			[],
		);
		expect(
			convertPropFormulaToClauses(or(r, bin(Operator.Tautology, p, q))),
		).toEqual([]);
	});

	it("returns the empty clause for a contradiction", () => {
		expect(
			convertPropFormulaToClauses(bin(Operator.Contradiction, p, q)),
		).toEqual([[]]);
		expect(
			convertPropFormulaToClauses(and(r, bin(Operator.Contradiction, p, q))),
		).toEqual([[]]);
	});

	it("does not mutate the input formula", () => {
		const formula = not(and(g, bin(Operator.Implies, r, f)));
		const copy = structuredClone(formula);
		convertPropFormulaToClauses(formula);
		expect(formula).toEqual(copy);
	});
});
