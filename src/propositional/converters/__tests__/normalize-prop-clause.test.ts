import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { normalizePropClause } from "../normalize-prop-clause";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const notP: PropFormula = { operator: Operator.Not, values: [p] };

describe("normalizePropClause", () => {
	it("returns the empty clause unchanged", () => {
		expect(normalizePropClause([])).toEqual([]);
	});

	it("removes duplicate literals, keeping first occurrences in order", () => {
		expect(normalizePropClause([q, p, q, notP, p])).toEqual([q, p, notP]);
	});

	it("keeps complementary literals", () => {
		expect(normalizePropClause([p, notP])).toEqual([p, notP]);
	});

	it("treats literals with different property order as equal", () => {
		const reordered = { values: ["p"], operator: Operator.Var } as PropFormula;
		expect(normalizePropClause([p, reordered])).toEqual([p]);
	});

	it("does not mutate the input", () => {
		const clause = [p, p];
		normalizePropClause(clause);
		expect(clause).toEqual([p, p]);
	});
});
