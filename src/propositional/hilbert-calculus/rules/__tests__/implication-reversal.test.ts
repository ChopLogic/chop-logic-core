import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { implicationReversalRule } from "../implication-reversal";

describe("implicationReversalRule", () => {
	it("should reverse a single formula with schema ¬F => ¬G", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [F] },
				{ operator: Operator.Not, values: [G] },
			],
		};

		const result = implicationReversalRule([formula]);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			operator: Operator.Implies,
			values: [G, F],
		});
	});

	it("should reverse multiple formulas", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const D: PropFormula = { operator: Operator.Var, values: ["D"] };

		const formula1: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [A] },
				{ operator: Operator.Not, values: [B] },
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [C] },
				{ operator: Operator.Not, values: [D] },
			],
		};

		const result = implicationReversalRule([formula1, formula2]);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			operator: Operator.Implies,
			values: [B, A],
		});
		expect(result[1]).toEqual({
			operator: Operator.Implies,
			values: [D, C],
		});
	});

	it("should reverse with complex nested formulas", () => {
		const F: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};
		const G: PropFormula = {
			operator: Operator.Or,
			values: [
				{ operator: Operator.Var, values: ["R"] },
				{ operator: Operator.Var, values: ["S"] },
			],
		};

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [F] },
				{ operator: Operator.Not, values: [G] },
			],
		};

		const result = implicationReversalRule([formula]);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			operator: Operator.Implies,
			values: [G, F],
		});
	});

	it("should throw an error if formula does not have the schema ¬F => ¬G", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };

		// Missing negation on one side
		const invalidFormula: PropFormula = {
			operator: Operator.Implies,
			values: [{ operator: Operator.Not, values: [A] }, B],
		};

		expect(() => implicationReversalRule([invalidFormula])).toThrow(
			"Implication reversal requires each formula to have the form ¬F => ¬G.",
		);
	});

	it("should throw an error if no formulas are provided", () => {
		expect(() => implicationReversalRule([])).toThrow(
			"Implication reversal requires each formula to have the form ¬F => ¬G.",
		);
	});

	it("should throw an error if any formula does not satisfy the schema", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };
		const H: PropFormula = { operator: Operator.Var, values: ["H"] };

		const validFormula: PropFormula = {
			operator: Operator.Implies,
			values: [
				{ operator: Operator.Not, values: [F] },
				{ operator: Operator.Not, values: [G] },
			],
		};

		const invalidFormula: PropFormula = {
			operator: Operator.Implies,
			values: [F, H],
		};

		expect(() =>
			implicationReversalRule([validFormula, invalidFormula]),
		).toThrow(
			"Implication reversal requires each formula to have the form ¬F => ¬G.",
		);
	});

	it("should throw an error if antecedent is not a negation", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [F, { operator: Operator.Not, values: [G] }],
		};

		expect(() => implicationReversalRule([formula])).toThrow(
			"Implication reversal requires each formula to have the form ¬F => ¬G.",
		);
	});

	it("should throw an error if consequent is not a negation", () => {
		const F: PropFormula = { operator: Operator.Var, values: ["F"] };
		const G: PropFormula = { operator: Operator.Var, values: ["G"] };

		const formula: PropFormula = {
			operator: Operator.Implies,
			values: [{ operator: Operator.Not, values: [F] }, G],
		};

		expect(() => implicationReversalRule([formula])).toThrow(
			"Implication reversal requires each formula to have the form ¬F => ¬G.",
		);
	});
});
