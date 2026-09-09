import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { implicationEliminationRule } from "../implication-elimination";

describe("implicationEliminationRule", () => {
	it("should apply modus ponens correctly", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		expect(implicationEliminationRule([implication, A])).toEqual([B]);
	});

	it("should throw an error if implication elimination is not applicable", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		expect(() => implicationEliminationRule([implication])).toThrow(
			"Implication elimination is not applicable to the given formulas.",
		);
	});

	it("should throw an error if no matching antecedent is found", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		expect(() => implicationEliminationRule([implication, C])).toThrow(
			"Implication elimination is not applicable to the given formulas.",
		);
	});

	it("should apply modus ponens when formula2 is the implication", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		// Test with implication as second argument
		expect(implicationEliminationRule([A, implication])).toEqual([B]);
	});

	it("should apply modus ponens with both arguments in different orders", () => {
		const P: PropFormula = { operator: Operator.Var, values: ["P"] };
		const Q: PropFormula = { operator: Operator.Var, values: ["Q"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [P, Q],
		};

		// Test: P, P => Q should give Q
		expect(implicationEliminationRule([P, implication])).toEqual([Q]);
		// Test: P => Q, P should give Q
		expect(implicationEliminationRule([implication, P])).toEqual([Q]);
	});

	it("should apply modus ponens with complex antecedent", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const complexAntecedent: PropFormula = {
			operator: Operator.And,
			values: [A, B],
		};
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [complexAntecedent, C],
		};

		// Test with complex formula as antecedent
		expect(
			implicationEliminationRule([implication, complexAntecedent]),
		).toEqual([C]);
		// Test with reversed order
		expect(
			implicationEliminationRule([complexAntecedent, implication]),
		).toEqual([C]);
	});

	it("should throw error when formula1 is implication but antecedent does not match", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		// A => B, but providing C instead of A should fail
		expect(() => implicationEliminationRule([implication, C])).toThrow(
			"Implication elimination is not applicable to the given formulas.",
		);
	});

	it("should throw error when formula2 is implication but antecedent does not match", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, B],
		};

		// C should be matched with A, but providing C and A => B as second arg
		expect(() => implicationEliminationRule([C, implication])).toThrow(
			"Implication elimination is not applicable to the given formulas.",
		);
	});

	it("should apply modus ponens with complex consequent", () => {
		const A: PropFormula = { operator: Operator.Var, values: ["A"] };
		const B: PropFormula = { operator: Operator.Var, values: ["B"] };
		const C: PropFormula = { operator: Operator.Var, values: ["C"] };
		const complexConsequent: PropFormula = {
			operator: Operator.Or,
			values: [B, C],
		};
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [A, complexConsequent],
		};

		expect(implicationEliminationRule([implication, A])).toEqual([
			complexConsequent,
		]);
	});

	it("should extract consequent correctly from implication structure", () => {
		const X: PropFormula = { operator: Operator.Var, values: ["X"] };
		const Y: PropFormula = { operator: Operator.Var, values: ["Y"] };
		const Z: PropFormula = { operator: Operator.Var, values: ["Z"] };
		const implication: PropFormula = {
			operator: Operator.Implies,
			values: [X, { operator: Operator.And, values: [Y, Z] }],
		};

		const result = implicationEliminationRule([implication, X]);

		// Verify it returns the exact consequent (not the implication or antecedent)
		expect(result).toEqual([{ operator: Operator.And, values: [Y, Z] }]);
	});
});
