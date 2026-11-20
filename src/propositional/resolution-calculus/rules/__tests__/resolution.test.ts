import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { resolutionRule } from "../resolution";

const v = (name: string): PropFormula => ({
	operator: Operator.Var,
	values: [name],
});
const not = (formula: PropFormula): PropFormula => ({
	operator: Operator.Not,
	values: [formula],
});

const p = v("p");
const q = v("q");
const r = v("r");
const m = v("m");

describe("resolutionRule", () => {
	it("derives {p, r} from {p, q} and {¬q, r}", () => {
		expect(
			resolutionRule([
				[p, q],
				[not(q), r],
			]),
		).toEqual([[p, r]]);
	});

	it("does not depend on the order of the clauses", () => {
		expect(
			resolutionRule([
				[not(q), r],
				[p, q],
			]),
		).toEqual([[r, p]]);
	});

	it("merges shared literals: {¬p, q} and {p, q} derive {q}", () => {
		expect(
			resolutionRule([
				[not(p), q],
				[p, q],
			]),
		).toEqual([[q]]);
	});

	it("shortens a clause with a singleton: {p, q, r} and {¬p} derive {q, r}", () => {
		expect(resolutionRule([[p, q, r], [not(p)]])).toEqual([[q, r]]);
	});

	it("derives the empty clause from {p} and {¬p}", () => {
		expect(resolutionRule([[p], [not(p)]])).toEqual([[]]);
		expect(resolutionRule([[not(p)], [p]])).toEqual([[]]);
	});

	it("returns one resolvent per complementary pair: {p, q} and {¬p, ¬q}", () => {
		expect(
			resolutionRule([
				[p, q],
				[not(p), not(q)],
			]),
		).toEqual([
			[q, not(q)],
			[p, not(p)],
		]);
	});

	it("subsumes implication elimination: {¬p, q} and {p} derive {q}", () => {
		expect(resolutionRule([[not(p), q], [p]])).toEqual([[q]]);
	});

	it("chains rules: {¬m, p, q} and {¬p, q} derive {¬m, q}", () => {
		expect(
			resolutionRule([
				[not(m), p, q],
				[not(p), q],
			]),
		).toEqual([[not(m), q]]);
	});

	it("does not mutate the input clauses", () => {
		const first = [p, q];
		const second = [not(q), r];
		resolutionRule([first, second]);
		expect(first).toEqual([p, q]);
		expect(second).toEqual([not(q), r]);
	});

	it.each([
		["no complementary pair", [[p], [q]]],
		["a single clause", [[p, not(p)]]],
		["three clauses", [[p], [not(p)], [q]]],
		["an empty clause", [[], [p]]],
		["a non-literal", [[{ operator: Operator.And, values: [p, q] }], [not(p)]]],
	])("throws for %s", (_, clauses) => {
		expect(() => resolutionRule(clauses as PropFormula[][])).toThrow(
			"Resolution is not applicable to the given clauses.",
		);
	});
});
