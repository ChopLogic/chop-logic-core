import { Operator } from "../../../enums";
import type { PropClause, PropFormula } from "../../../models";
import { isPropClause } from "../is-prop-clause";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const notQ: PropFormula = { operator: Operator.Not, values: [q] };

describe("isPropClause", () => {
	it("returns true for the empty clause", () => {
		expect(isPropClause([])).toBe(true);
	});

	it("returns true for a clause of literals", () => {
		expect(isPropClause([p, notQ])).toBe(true);
	});

	it("returns false if any element is not a literal", () => {
		expect(isPropClause([p, { operator: Operator.And, values: [p, q] }])).toBe(
			false,
		);
		expect(isPropClause([{ operator: Operator.Not, values: [notQ] }, p])).toBe(
			false,
		);
	});

	it("returns false for a non-array value", () => {
		expect(isPropClause(p as unknown as PropClause)).toBe(false);
	});
});
