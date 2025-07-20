import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { implicationElimination } from "../implication-elimination";

describe("implicationElimination", () => {
	it("should apply implication elimination correctly", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [F, G],
		};

		expect(implicationElimination([implication, F])).toEqual([G]);
	});

	it("should throw an error if IE is not applicable", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [F, G],
		};

		expect(() => implicationElimination([implication])).toThrow(
			"Implication elimination is not applicable to the given formulas.",
		);
	});
});
