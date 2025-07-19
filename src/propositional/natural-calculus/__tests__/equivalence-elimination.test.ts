import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { equivalenceElimination } from "../equivalence-elimination";

describe("equivalenceElimination", () => {
	it("should correctly eliminate equivalence into two implications", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const equivFormula: PropFormula = {
			operator: Operator.Equiv,
			values: [A, B],
		};

		const result = equivalenceElimination([equivFormula]);

		expect(result).toEqual([
			{ operator: Operator.Implies, values: [A, B] },
			{ operator: Operator.Implies, values: [B, A] },
		]);
	});

	it("should correctly handle multiple equivalences", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const D: PropFormula = { operator: Operator.Var, values: ["D"] };
		const equivFormula1: PropFormula = {
			operator: Operator.Equiv,
			values: [A, B],
		};
		const equivFormula2: PropFormula = {
			operator: Operator.Equiv,
			values: [C, D],
		};

		const result = equivalenceElimination([equivFormula1, equivFormula2]);

		expect(result).toEqual([
			{ operator: Operator.Implies, values: [A, B] },
			{ operator: Operator.Implies, values: [B, A] },
			{ operator: Operator.Implies, values: [C, D] },
			{ operator: Operator.Implies, values: [D, C] },
		]);
	});

	it("should throw an error if any formula is not an equivalence", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const nonEquivFormula: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		expect(() => equivalenceElimination([nonEquivFormula])).toThrow(
			"Equivalence elimination is not applicable. All formulas must be equivalences.",
		);
	});
});
