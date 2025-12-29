import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { conjunctionElimination } from "../conjunction-elimination";

describe("conjunctionElimination", () => {
	it("should correctly eliminate conjunctions into their conjuncts", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const D: PropFormula = { operator: Operator.Var, values: ["D"] };
		const conjunctionAB: PropFormula = {
			operator: Operator.And,
			values: [A, B],
		};
		const conjunctionCD: PropFormula = {
			operator: Operator.And,
			values: [C, D],
		};

		const result = conjunctionElimination([conjunctionAB, conjunctionCD]);

		expect(result).toHaveLength(4);
		expect(result).toContainEqual(A);
		expect(result).toContainEqual(B);
		expect(result).toContainEqual(C);
		expect(result).toContainEqual(D);
	});

	it("should throw an error if the input formulas are not all conjunctions", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		expect(() => conjunctionElimination([A, B])).toThrow(
			"Conjunction Elimination is not applicable for the given formulas.",
		);
	});
});
