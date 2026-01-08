import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { implicationCreation } from "../implication-creation";

describe("implicationCreation", () => {
	it("should create an implication from a proven formula and a new formula", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const result = implicationCreation([F, G]);

		expect(result).toEqual({
			operator: Operator.Implies,
			values: [G, F],
		});
	});

	it("should create implication with complex formulas", () => {
		const F: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};
		const G: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["C"] },
				{ operator: Operator.Var, values: ["D"] },
			],
		};

		const result = implicationCreation([F, G]);

		expect(result).toEqual({
			operator: Operator.Implies,
			values: [G, F],
		});
	});

	it("should create implication with nested formulas", () => {
		const F: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};
		const G: PropFormula = { operator: Operator.Var, values: ["R"] };

		const result = implicationCreation([F, G]);

		expect(result).toEqual({
			operator: Operator.Implies,
			values: [G, F],
		});
	});

	it("should throw an error if only one formula is provided", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };

		expect(() => implicationCreation([F])).toThrow(
			"Implication creation requires exactly two formulas: the proven formula and the new antecedent formula.",
		);
	});

	it("should throw an error if no formulas are provided", () => {
		expect(() => implicationCreation([])).toThrow(
			"Implication creation requires exactly two formulas: the proven formula and the new antecedent formula.",
		);
	});

	it("should throw an error if more than two formulas are provided", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		expect(() => implicationCreation([F, G, H])).toThrow(
			"Implication creation requires exactly two formulas: the proven formula and the new antecedent formula.",
		);
	});
});
