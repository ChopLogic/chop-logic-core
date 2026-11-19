import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { convertPropFormulaToNNF } from "../convert-prop-formula-to-nnf";

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

describe("convertPropFormulaToNNF", () => {
	it("returns literals unchanged", () => {
		expect(convertPropFormulaToNNF(p)).toEqual(p);
		expect(convertPropFormulaToNNF(not(p))).toEqual(not(p));
	});

	it("keeps conjunctions and disjunctions of literals", () => {
		const formula = and(or(p, not(q)), r);
		expect(convertPropFormulaToNNF(formula)).toEqual(formula);
	});

	it("removes double negation", () => {
		expect(convertPropFormulaToNNF(not(not(p)))).toEqual(p);
		expect(convertPropFormulaToNNF(not(not(not(p))))).toEqual(not(p));
	});

	it("applies De Morgan's law to a negated conjunction", () => {
		expect(convertPropFormulaToNNF(not(and(p, q)))).toEqual(or(not(p), not(q)));
	});

	it("applies De Morgan's law to a negated disjunction", () => {
		expect(convertPropFormulaToNNF(not(or(p, q)))).toEqual(and(not(p), not(q)));
	});

	it("pushes negations through nested formulas", () => {
		// ¬(p ∧ ¬(q ∨ ¬r)) → ¬p ∨ (q ∨ ¬r)
		expect(convertPropFormulaToNNF(not(and(p, not(or(q, not(r))))))).toEqual(
			or(not(p), or(q, not(r))),
		);
		// ¬¬(p ∨ q) → p ∨ q
		expect(convertPropFormulaToNNF(not(not(or(p, q))))).toEqual(or(p, q));
	});

	it("eliminates implications first", () => {
		// ¬(g ∧ (r ⇒ f)) → ¬g ∨ (r ∧ ¬f)
		const g: PropFormula = { operator: Operator.Var, values: ["g"] };
		const f: PropFormula = { operator: Operator.Var, values: ["f"] };
		const formula = not(and(g, bin(Operator.Implies, r, f)));
		expect(convertPropFormulaToNNF(formula)).toEqual(
			or(not(g), and(r, not(f))),
		);
	});

	it("returns a root constant", () => {
		const top = bin(Operator.Tautology, p, q);
		expect(convertPropFormulaToNNF(top)).toEqual(top);
		expect(convertPropFormulaToNNF(not(top))).toEqual(
			bin(Operator.Contradiction, p, q),
		);
	});

	it("does not mutate the input formula", () => {
		const formula = not(and(p, not(or(q, r))));
		const copy = structuredClone(formula);
		convertPropFormulaToNNF(formula);
		expect(formula).toEqual(copy);
	});
});
