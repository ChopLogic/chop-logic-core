import { Operator } from "../../../enums";
import type { PropClause, PropFormula } from "../../../models";
import { isPropResolvent } from "../is-prop-resolvent";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const r: PropFormula = { operator: Operator.Var, values: ["r"] };
const notP: PropFormula = { operator: Operator.Not, values: [p] };
const notQ: PropFormula = { operator: Operator.Not, values: [q] };

describe("isPropResolvent", () => {
	it("returns true for the resolvent of two clauses", () => {
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, r],
				],
				[p, r],
			),
		).toBe(true);
	});

	it("accepts the complementary pair in either clause order", () => {
		expect(
			isPropResolvent(
				[
					[notQ, r],
					[p, q],
				],
				[r, p],
			),
		).toBe(true);
	});

	it("compares the resolvent as a set of literals", () => {
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, r],
				],
				[r, p],
			),
		).toBe(true);
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, p],
				],
				[p],
			),
		).toBe(true);
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, p],
				],
				[p, p],
			),
		).toBe(true);
	});

	it("returns true for the empty resolvent of complementary singletons", () => {
		expect(isPropResolvent([[p], [notP]], [])).toBe(true);
		expect(isPropResolvent([[notP], [p]], [])).toBe(true);
	});

	it("accepts the resolvent of any complementary pair", () => {
		const clauses: PropClause[] = [
			[p, q],
			[notP, notQ],
		];

		expect(isPropResolvent(clauses, [q, notQ])).toBe(true);
		expect(isPropResolvent(clauses, [p, notP])).toBe(true);
	});

	it("only removes complementary pairs", () => {
		// Removing the non-complementary pair (p, ¬q) would give {q, r}.
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, r],
				],
				[q, r],
			),
		).toBe(false);
	});

	it("does not resolve on two pairs at once", () => {
		expect(
			isPropResolvent(
				[
					[p, q],
					[notP, notQ],
				],
				[],
			),
		).toBe(false);
	});

	it("returns false for a clause that is not the resolvent", () => {
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, r],
				],
				[p],
			),
		).toBe(false);
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, r],
				],
				[p, q, r],
			),
		).toBe(false);
		expect(
			isPropResolvent(
				[
					[p, q],
					[notQ, r],
				],
				[p, notQ, r],
			),
		).toBe(false);
		expect(isPropResolvent([[p], [notP]], [p])).toBe(false);
	});

	describe("with a resolved literal", () => {
		const clauses: PropClause[] = [
			[p, q],
			[notP, notQ],
		];

		it("returns true when resolving on the given literal yields the resolvent", () => {
			expect(isPropResolvent(clauses, [q, notQ], p)).toBe(true);
			expect(isPropResolvent(clauses, [p, notP], q)).toBe(true);
		});

		it("returns false when the resolvent comes from a different pair", () => {
			expect(isPropResolvent(clauses, [q, notQ], q)).toBe(false);
			expect(isPropResolvent(clauses, [p, notP], p)).toBe(false);
		});

		it("identifies the pair by its positive literal, whichever clause holds it", () => {
			expect(
				isPropResolvent(
					[
						[notP, q],
						[p, r],
					],
					[q, r],
					p,
				),
			).toBe(true);
			expect(
				isPropResolvent(
					[
						[notP, q],
						[p, r],
					],
					[q, r],
					notP,
				),
			).toBe(false);
		});

		it("returns false when the literal is not part of any complementary pair", () => {
			expect(
				isPropResolvent(
					[
						[p, q],
						[notQ, r],
					],
					[p, r],
					r,
				),
			).toBe(false);
		});
	});

	it("returns false when resolution is not applicable", () => {
		expect(isPropResolvent([[p], [q]], [p, q])).toBe(false);
		expect(isPropResolvent([[p], [p]], [p])).toBe(false);
	});

	it("returns false unless exactly two clauses are given", () => {
		expect(isPropResolvent([[p]], [])).toBe(false);
		expect(isPropResolvent([[p], [notP], [q]], [])).toBe(false);
		expect(isPropResolvent([], [])).toBe(false);
	});

	it("returns false if a parent clause or the resolvent is not a clause", () => {
		const conjunction: PropFormula = { operator: Operator.And, values: [p, q] };
		const notAClause = [conjunction] as PropClause;

		expect(isPropResolvent([[p, conjunction], [notP]], [conjunction])).toBe(
			false,
		);
		expect(isPropResolvent([[p, q], [notP]], notAClause)).toBe(false);
	});

	it("does not mutate the input clauses", () => {
		const clauses: PropClause[] = [
			[p, q],
			[notQ, r],
		];
		const resolvent: PropClause = [p, r];
		const copy = structuredClone([clauses, resolvent]);

		isPropResolvent(clauses, resolvent, q);

		expect([clauses, resolvent]).toEqual(copy);
	});
});
