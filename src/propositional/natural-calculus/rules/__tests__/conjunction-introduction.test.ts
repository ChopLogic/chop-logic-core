import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { conjunctionIntroduction } from "../conjunction-introduction";

describe("conjunctionIntroduction", () => {
	it("should return two conjunctions for given formulas", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		const result = conjunctionIntroduction([A, B]);

		expect(result).toEqual([
			{ operator: Operator.And, values: [A, B] },
			{ operator: Operator.And, values: [B, A] },
		]);
	});

	it("should throw an error if CI is not applicable", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["B"] };

		expect(() => conjunctionIntroduction([A, B, C])).toThrow(
			"Conjunction introduction is not applicable to the given formulas.",
		);
	});
});
