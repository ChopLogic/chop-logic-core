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
});
