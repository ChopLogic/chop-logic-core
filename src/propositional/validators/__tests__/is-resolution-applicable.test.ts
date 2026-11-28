import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isResolutionApplicable } from "../is-resolution-applicable";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const r: PropFormula = { operator: Operator.Var, values: ["r"] };
const notP: PropFormula = { operator: Operator.Not, values: [p] };
const notQ: PropFormula = { operator: Operator.Not, values: [q] };

describe("isResolutionApplicable", () => {
	it("returns true when the clauses contain a complementary pair", () => {
		expect(
			isResolutionApplicable([
				[p, q],
				[notQ, r],
			]),
		).toBe(true);
		expect(
			isResolutionApplicable([
				[notQ, r],
				[p, q],
			]),
		).toBe(true);
	});

	it("returns true for two complementary singleton clauses", () => {
		expect(isResolutionApplicable([[p], [notP]])).toBe(true);
	});

	it("returns true when there are several complementary pairs", () => {
		expect(
			isResolutionApplicable([
				[p, q],
				[notP, notQ],
			]),
		).toBe(true);
	});

	it("returns false when there is no complementary pair", () => {
		expect(isResolutionApplicable([[p], [q]])).toBe(false);
		expect(
			isResolutionApplicable([
				[p, q],
				[p, r],
			]),
		).toBe(false);
		expect(isResolutionApplicable([[notP], [notP, q]])).toBe(false);
	});

	it("returns false when a clause is empty", () => {
		expect(isResolutionApplicable([[], [p]])).toBe(false);
		expect(isResolutionApplicable([[p], []])).toBe(false);
	});

	it("returns false if not exactly two clauses are given", () => {
		expect(isResolutionApplicable([])).toBe(false);
		expect(isResolutionApplicable([[p, notP]])).toBe(false);
		expect(isResolutionApplicable([[p], [notP], [p]])).toBe(false);
	});

	it("returns false if a clause contains a non-literal", () => {
		const pAndQ: PropFormula = { operator: Operator.And, values: [p, q] };
		expect(isResolutionApplicable([[p, pAndQ], [notP]])).toBe(false);
		expect(isResolutionApplicable([[p], [notP, pAndQ]])).toBe(false);
	});
});
