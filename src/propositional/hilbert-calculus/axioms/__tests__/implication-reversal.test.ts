import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { implicationReversalSchema } from "../implication-reversal";

describe("implicationReversalSchema", () => {
	it("should create a formula matching the schema ((~A => ~B) => (B => A))", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["F"] };
		const B: PropFormula = { operator: Operator.Var, values: ["G"] };

		const result = implicationReversalSchema([A, B]);

		expect(result).toEqual({
			operator: Operator.Implies,
			values: [
				{
					operator: Operator.Implies,
					values: [
						{ operator: Operator.Not, values: [A] },
						{ operator: Operator.Not, values: [B] },
					],
				},
				{
					operator: Operator.Implies,
					values: [B, A],
				},
			],
		});
	});
});
