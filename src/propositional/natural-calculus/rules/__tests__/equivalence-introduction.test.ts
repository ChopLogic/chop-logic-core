import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { equivalenceIntroduction } from "../equivalence-introduction";

describe("equivalenceIntroduction", () => {
	it("should create an equivalence when given A => B and B => A", () => {
		const formulaAtoB: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const formulaBtoA: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["B"] },
				{ operator: Operator.Var, values: ["A"] },
			],
		};

		const result = equivalenceIntroduction([formulaAtoB, formulaBtoA]);

		expect(result).toEqual([
			{
				operator: Operator.Equiv,
				values: [
					{ operator: Operator.Var, values: ["A"] },
					{ operator: Operator.Var, values: ["B"] },
				],
			},
		]);
	});

	it("should throw an error if the formulas are not valid for equivalence introduction", () => {
		const invalidFormula: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		expect(() =>
			equivalenceIntroduction([invalidFormula, invalidFormula]),
		).toThrow(
			"Equivalence introduction is not applicable to the given formulas.",
		);
	});
});
