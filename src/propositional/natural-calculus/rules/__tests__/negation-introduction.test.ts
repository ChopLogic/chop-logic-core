import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { negationIntroduction } from "../negation-introduction";

describe("negationIntroduction", () => {
	it("should infer ~A from A => B and A => ~B", () => {
		const formulaAtoB: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const formulaAtoNotB: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		const result = negationIntroduction([formulaAtoB, formulaAtoNotB]);
		expect(result).toEqual([
			{
				operator: Operator.Not,
				values: [{ operator: Operator.Var, values: ["A"] }],
			},
		]);
	});

	it("should throw an error if negation introduction is not applicable", () => {
		const invalidFormula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["C"] },
			],
		};

		expect(() => negationIntroduction([invalidFormula])).toThrow(
			"Negation introduction is not applicable to the given formulas.",
		);
	});
});
