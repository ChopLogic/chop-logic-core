import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { disjunctionIntroduction } from "../disjunction-introduction";

describe("disjunctionIntroduction", () => {
	it("should return an implication for given formulas", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		const result = disjunctionIntroduction([A, B]);

		expect(result).toEqual([
			{ operator: Operator.Or, values: [A, B] },
			{ operator: Operator.Or, values: [B, A] },
		]);
	});

	it("should work with complex formulas", () => {
		const A: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["A"] }],
		};
		const B: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["B"] },
				{ operator: Operator.Var, values: ["C"] },
			],
		};

		const result = disjunctionIntroduction([A, B]);

		expect(result).toEqual([
			{ operator: Operator.Or, values: [A, B] },
			{ operator: Operator.Or, values: [B, A] },
		]);
	});

	it("should throw an error if CI is not applicable", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["B"] };

		expect(() => disjunctionIntroduction([A, B, C])).toThrow(
			"Disjunction introduction is not applicable to the given formulas.",
		);
	});
});
