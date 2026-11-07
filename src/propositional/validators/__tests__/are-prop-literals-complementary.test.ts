import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { arePropLiteralsComplementary } from "../are-prop-literals-complementary";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const notP: PropFormula = { operator: Operator.Not, values: [p] };
const notQ: PropFormula = { operator: Operator.Not, values: [q] };

describe("arePropLiteralsComplementary", () => {
	it("returns true for a variable and its negation in either order", () => {
		expect(arePropLiteralsComplementary([p, notP])).toBe(true);
		expect(arePropLiteralsComplementary([notP, p])).toBe(true);
	});

	it("does not depend on the order of object properties", () => {
		const reordered = {
			values: [{ values: ["p"], operator: Operator.Var }],
			operator: Operator.Not,
		} as PropFormula;
		expect(arePropLiteralsComplementary([p, reordered])).toBe(true);
	});

	it("returns false for literals with different variables", () => {
		expect(arePropLiteralsComplementary([p, notQ])).toBe(false);
		expect(arePropLiteralsComplementary([notQ, p])).toBe(false);
	});

	it("returns false for literals with the same polarity", () => {
		expect(arePropLiteralsComplementary([p, p])).toBe(false);
		expect(arePropLiteralsComplementary([notP, notP])).toBe(false);
		expect(arePropLiteralsComplementary([p, q])).toBe(false);
	});

	it("returns false for non-literals", () => {
		const notNotP: PropFormula = { operator: Operator.Not, values: [notP] };
		expect(arePropLiteralsComplementary([notP, notNotP])).toBe(false);
		expect(arePropLiteralsComplementary([notNotP, notP])).toBe(false);
		expect(
			arePropLiteralsComplementary([
				{ operator: Operator.And, values: [p, q] },
				notP,
			]),
		).toBe(false);
	});

	it("returns false if not exactly two literals are given", () => {
		expect(arePropLiteralsComplementary([])).toBe(false);
		expect(arePropLiteralsComplementary([p])).toBe(false);
		expect(arePropLiteralsComplementary([p, notP, p])).toBe(false);
	});
});
