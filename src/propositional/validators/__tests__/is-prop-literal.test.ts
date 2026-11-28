import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isPropLiteral } from "../is-prop-literal";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };

describe("isPropLiteral", () => {
	it("returns true for a variable", () => {
		expect(isPropLiteral(p)).toBe(true);
	});

	it("returns true for a negated variable", () => {
		expect(isPropLiteral({ operator: Operator.Not, values: [p] })).toBe(true);
	});

	it("returns false for a double negation", () => {
		expect(
			isPropLiteral({
				operator: Operator.Not,
				values: [{ operator: Operator.Not, values: [p] }],
			}),
		).toBe(false);
	});

	it("returns false for a negated composite formula", () => {
		expect(
			isPropLiteral({
				operator: Operator.Not,
				values: [{ operator: Operator.And, values: [p, q] }],
			}),
		).toBe(false);
	});

	it("returns false for a malformed negation", () => {
		expect(isPropLiteral({ operator: Operator.Not, values: [p, q] })).toBe(
			false,
		);
		expect(isPropLiteral({ operator: Operator.Not, values: ["p"] })).toBe(
			false,
		);
		expect(isPropLiteral({ operator: Operator.And, values: [p] })).toBe(false);
	});

	it.each([
		Operator.And,
		Operator.Or,
		Operator.Implies,
		Operator.Tautology,
		Operator.Contradiction,
	])("returns false for %s", (operator) => {
		expect(isPropLiteral({ operator, values: [p, q] })).toBe(false);
	});

	describe("malformed variables", () => {
		it.each([
			["no atom", []],
			["two atoms", ["p", "q"]],
			["a non-string atom", [1]],
			["a formula instead of an atom", [p]],
			["a null atom", [null]],
			["a non-array value", "p"],
			["null values", null],
		])("returns false for a variable with %s", (_, values) => {
			const variable = { operator: Operator.Var, values } as PropFormula;

			expect(isPropLiteral(variable)).toBe(false);
			expect(
				isPropLiteral({ operator: Operator.Not, values: [variable] }),
			).toBe(false);
		});

		it("returns false for a variable without values", () => {
			const variable = { operator: Operator.Var } as PropFormula;

			expect(isPropLiteral(variable)).toBe(false);
			expect(
				isPropLiteral({ operator: Operator.Not, values: [variable] }),
			).toBe(false);
		});
	});

	describe("null safety", () => {
		it.each([
			["null", null],
			["undefined", undefined],
			["a string", "p"],
			["an empty object", {}],
		])("returns false for %s instead of throwing", (_, formula) => {
			expect(isPropLiteral(formula as unknown as PropFormula)).toBe(false);
		});

		it.each([
			["null", [null]],
			["undefined", [undefined]],
			["an empty object", [{}]],
		])(
			"returns false for a negation of %s instead of throwing",
			(_, values) => {
				expect(
					isPropLiteral({ operator: Operator.Not, values } as PropFormula),
				).toBe(false);
			},
		);

		it("returns false for a negation without values or with non-array values", () => {
			expect(isPropLiteral({ operator: Operator.Not } as PropFormula)).toBe(
				false,
			);
			expect(
				isPropLiteral({
					operator: Operator.Not,
					values: null,
				} as unknown as PropFormula),
			).toBe(false);
			expect(
				isPropLiteral({
					operator: Operator.Not,
					values: p,
				} as unknown as PropFormula),
			).toBe(false);
		});
	});
});
