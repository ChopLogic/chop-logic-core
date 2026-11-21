import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { convertPropClauseToString } from "../convert-prop-clause-to-string";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };

describe("convertPropClauseToString", () => {
	it("converts the empty clause to {}", () => {
		expect(convertPropClauseToString([])).toBe("{}");
	});

	it("converts a singleton clause", () => {
		expect(convertPropClauseToString([p])).toBe("{p}");
	});

	it("converts a clause with negated literals, preserving order", () => {
		expect(
			convertPropClauseToString([{ operator: Operator.Not, values: [p] }, q]),
		).toBe("{¬p, q}");
	});
});
