import { Operator } from "../../../enums";
import type { PropClause, PropFormula } from "../../../models";
import { arePropClausesEqual } from "../are-prop-clauses-equal";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const notP: PropFormula = { operator: Operator.Not, values: [p] };
const notQ: PropFormula = { operator: Operator.Not, values: [q] };

describe("arePropClausesEqual", () => {
	it("returns true for identical clauses", () => {
		expect(
			arePropClausesEqual([
				[p, notQ],
				[p, notQ],
			]),
		).toBe(true);
	});

	it("ignores the order of literals", () => {
		expect(
			arePropClausesEqual([
				[p, notQ],
				[notQ, p],
			]),
		).toBe(true);
	});

	it("ignores duplicate literals", () => {
		expect(
			arePropClausesEqual([
				[p, p, q],
				[q, p],
			]),
		).toBe(true);
		expect(
			arePropClausesEqual([
				[q, p],
				[p, p, q],
			]),
		).toBe(true);
	});

	it("returns true for two empty clauses", () => {
		expect(arePropClausesEqual([[], []])).toBe(true);
	});

	it("returns true for a single clause", () => {
		expect(arePropClausesEqual([[p]])).toBe(true);
	});

	it("compares every clause with the first one", () => {
		expect(
			arePropClausesEqual([
				[p, q],
				[q, p],
				[p, q, p],
			]),
		).toBe(true);
		expect(arePropClausesEqual([[p, q], [q, p], [p]])).toBe(false);
	});

	it("returns false when one clause has an extra literal, in either order", () => {
		expect(arePropClausesEqual([[p], [p, q]])).toBe(false);
		expect(arePropClausesEqual([[p, q], [p]])).toBe(false);
	});

	it("returns false when clauses differ only in a negation", () => {
		expect(arePropClausesEqual([[p], [notP]])).toBe(false);
		expect(
			arePropClausesEqual([
				[q, notP],
				[q, p],
			]),
		).toBe(false);
	});

	it("returns false for an empty and a non-empty clause, in either order", () => {
		expect(arePropClausesEqual([[], [p]])).toBe(false);
		expect(arePropClausesEqual([[p], []])).toBe(false);
	});

	it("returns false for an empty array", () => {
		expect(arePropClausesEqual([])).toBe(false);
	});

	it("returns false if any item is not a clause", () => {
		const conjunction: PropFormula = { operator: Operator.And, values: [p, q] };
		const notAClause = [conjunction] as PropClause;

		expect(arePropClausesEqual([notAClause, notAClause])).toBe(false);
		expect(arePropClausesEqual([[p], notAClause])).toBe(false);
	});

	it("does not mutate the input clauses", () => {
		const clauses: PropClause[] = [
			[p, p, notQ],
			[notQ, p],
		];
		const copy = structuredClone(clauses);

		arePropClausesEqual(clauses);

		expect(clauses).toEqual(copy);
	});
});
