import { NaturalCalculusRule, Operator, Step } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { generateNaturalProofSteps } from "../generate-natural-proof-steps";

describe("generateNaturalProofSteps", () => {
	const atomP: PropFormula = { operator: Operator.Var, values: ["P"] };
	const atomQ: PropFormula = { operator: Operator.Var, values: ["Q"] };
	const atomR: PropFormula = { operator: Operator.Var, values: ["R"] };

	it("should generate a base step for Assumption", () => {
		const steps = generateNaturalProofSteps({
			index: 1,
			level: 0,
			step: Step.Assumption,
			payload: { formula: atomP },
		});

		expect(steps).toHaveLength(1);
		expect(steps[0]).toMatchObject({
			index: 1,
			level: 0,
			step: Step.Assumption,
			comment: "Assumption",
			formula: atomP,
		});
	});

	it("should generate a base step for Reiteration with assumptionIndex", () => {
		const steps = generateNaturalProofSteps({
			index: 2,
			level: 1,
			assumptionIndex: 1,
			step: Step.Reiteration,
			payload: { formula: atomQ },
		});

		expect(steps[0].assumptionIndex).toBe(1);
		expect(steps[0].comment).toBe("Reiteration");
	});

	it("should generate derived step(s) from conjunction introduction", () => {
		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 2,
			level: 1,
			assumptionIndex: 1,
			step: Step.Derivation,
			payload: {
				formulas: [atomP, atomQ],
				rule: NaturalCalculusRule.CI,
				derivedFrom: [1, 2],
			},
		});

		expect(steps).toHaveLength(2);
		expect(steps[0]).toMatchObject({
			index: 3,
			level: 1,
			step: Step.Derivation,
			derivedFrom: [1, 2],
			comment: "CI: 1, 2",
		});
	});

	it("should support conjunction elimination rule", () => {
		const conjunctionFormula: PropFormula = {
			operator: Operator.And,
			values: [atomP, atomQ],
		};

		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [conjunctionFormula],
				rule: NaturalCalculusRule.CE,
				derivedFrom: [3],
			},
		});

		expect(steps).toHaveLength(2);
		expect(steps[0].comment).toBe("CE: 3");
		expect(steps[0].stringView).toBe("P");
		expect(steps[0].step).toBe(Step.Derivation);
	});

	it("should support implication elimination rule", () => {
		const implicationFormula: PropFormula = {
			operator: Operator.Implies,
			values: [atomP, atomQ],
		};

		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 5,
			level: 0,
			step: Step.Derivation,
			payload: {
				formulas: [implicationFormula, atomP],
				rule: NaturalCalculusRule.IE,
				derivedFrom: [2, 3],
			},
		});

		expect(steps).toHaveLength(1);
		expect(steps[0].comment).toBe("IE: 2, 3");
		expect(steps[0].index).toBe(6);
		expect(steps[0].stringView).toBe("Q");
		expect(steps[0].step).toBe(Step.Derivation);
	});

	it("should support implication introduction rule", () => {
		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [atomP, atomP],
				rule: NaturalCalculusRule.II,
				derivedFrom: [2, 3],
			},
		});

		expect(steps).toHaveLength(1);
		expect(steps[0].comment).toBe("II: 2, 3");
		expect(steps[0].stringView).toBe("(P → P)");
		expect(steps[0].step).toBe(Step.Derivation);
	});

	it("should support disjunction introduction rule", () => {
		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [atomP, atomQ],
				rule: NaturalCalculusRule.DI,
				derivedFrom: [2, 3],
			},
		});

		expect(steps).toHaveLength(2);
		expect(steps[0].comment).toBe("DI: 2, 3");
		expect(steps[1].stringView).toBe("(Q ∨ P)");
	});

	it("should support disjunction elimination rule", () => {
		const implication1Formula: PropFormula = {
			operator: Operator.Implies,
			values: [atomP, atomR],
		};
		const implication2Formula: PropFormula = {
			operator: Operator.Implies,
			values: [atomQ, atomR],
		};
		const disjunctionFormula: PropFormula = {
			operator: Operator.Or,
			values: [atomP, atomQ],
		};
		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [
					disjunctionFormula,
					implication1Formula,
					implication2Formula,
				],
				rule: NaturalCalculusRule.DE,
				derivedFrom: [1, 2, 3],
			},
		});

		expect(steps).toHaveLength(1);
		expect(steps[0].comment).toBe("DE: 1, 2, 3");
		expect(steps[0].stringView).toBe("R");
	});

	it("should support negation elimination rule", () => {
		const doubleNegationFormula: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [atomP],
				},
			],
		};

		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [doubleNegationFormula],
				rule: NaturalCalculusRule.NE,
				derivedFrom: [2],
			},
		});

		expect(steps).toHaveLength(1);
		expect(steps[0].comment).toBe("NE: 2");
		expect(steps[0].stringView).toBe("P");
	});

	it("should support negation introduction rule", () => {
		const implication1Formula: PropFormula = {
			operator: Operator.Implies,
			values: [atomP, atomQ],
		};
		const implication2Formula: PropFormula = {
			operator: Operator.Implies,
			values: [
				atomP,
				{
					operator: Operator.Not,
					values: [atomQ],
				},
			],
		};
		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [implication1Formula, implication2Formula],
				rule: NaturalCalculusRule.NI,
				derivedFrom: [2, 3],
			},
		});

		expect(steps).toHaveLength(1);
		expect(steps[0].comment).toBe("NI: 2, 3");
		expect(steps[0].stringView).toBe("¬P");
	});

	it("should support equivalence elimination rule", () => {
		const equivalenceFormula: PropFormula = {
			operator: Operator.Equiv,
			values: [atomP, atomQ],
		};

		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [equivalenceFormula],
				rule: NaturalCalculusRule.EE,
				derivedFrom: [2],
			},
		});

		expect(steps).toHaveLength(2);
		expect(steps[0].comment).toBe("EE: 2");
		expect(steps[0].stringView).toBe("(P → Q)");
		expect(steps[1].stringView).toBe("(Q → P)");
	});

	it("should support equivalence introduction rule", () => {
		const implication1Formula: PropFormula = {
			operator: Operator.Implies,
			values: [atomP, atomR],
		};
		const implication2Formula: PropFormula = {
			operator: Operator.Implies,
			values: [atomR, atomP],
		};
		const steps = generateNaturalProofSteps<Step.Derivation>({
			index: 4,
			level: 1,
			step: Step.Derivation,
			payload: {
				formulas: [implication1Formula, implication2Formula],
				rule: NaturalCalculusRule.EI,
				derivedFrom: [1, 2],
			},
		});

		expect(steps).toHaveLength(1);
		expect(steps[0].comment).toBe("EI: 1, 2");
		expect(steps[0].stringView).toBe("(P ≡ R)");
	});

	it("should throw an error if the rule is not applicable", () => {
		expect(() =>
			generateNaturalProofSteps<Step.Derivation>({
				index: 4,
				level: 1,
				step: Step.Derivation,
				payload: {
					formulas: [atomP, atomQ],
					rule: NaturalCalculusRule.EE,
					derivedFrom: [2],
				},
			}),
		).toThrow(
			"Equivalence elimination is not applicable. All formulas must be equivalences.",
		);
	});
});
