import {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	Step,
} from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { generateHilbertProofSteps } from "../generate-hilbert-proof-steps";

describe("generateProofStep", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));

	it("should generate a premise step", () => {
		const result = generateHilbertProofSteps({
			index: 1,
			step: Step.Premise,
			payload: { formula: A },
		});

		expect(result[0]).toMatchObject({
			index: 1,
			step: Step.Premise,
			formula: A,
			comment: "Premise",
		});
	});

	it("should generate a reiteration step", () => {
		const result = generateHilbertProofSteps({
			index: 1,
			step: Step.Reiteration,
			payload: { formula: B },
		});

		expect(result[0]).toMatchObject({
			index: 1,
			step: Step.Reiteration,
			formula: B,
			comment: "Reiteration",
		});
	});

	it("should generate a derived step using implication introduction", () => {
		const result = generateHilbertProofSteps<Step.Axiom>({
			index: 2,
			step: Step.Axiom,
			payload: {
				formulas: [A, B],
				schema: HilbertCalculusSchema.II,
			},
		});

		expect(result[0].comment).toBe("II");
		expect(result[0].step).toBe(Step.Axiom);
		expect(result[0].stringView).toBe("(A → (B → A))");
	});

	it("should generate a derived step using implication distribution", () => {
		const result = generateHilbertProofSteps<Step.Axiom>({
			index: 4,
			step: Step.Axiom,
			payload: {
				formulas: [A, B, C],
				schema: HilbertCalculusSchema.ID,
			},
		});

		expect(result[0].index).toBe(4);
		expect(result[0].comment).toBe("ID");
		expect(result[0].step).toBe(Step.Axiom);
		expect(result[0].stringView).toBe("((A → (B → C)) → ((A → B) → (A → C)))");
	});

	it("should generate a derived step using implication reversal", () => {
		const notA = createPropFormula(createPropExpression("~A"));
		const notB = createPropFormula(createPropExpression("~B"));
		const result = generateHilbertProofSteps<Step.Axiom>({
			index: 4,
			step: Step.Axiom,
			payload: {
				formulas: [notA, notB],
				schema: HilbertCalculusSchema.IR,
			},
		});

		expect(result[0].comment).toBe("IR");
		expect(result[0].stringView).toBe("((¬¬A → ¬¬B) → (¬B → ¬A))");
	});

	it("should generate a derived step using implication elimination", () => {
		const result = generateHilbertProofSteps<Step.Derivation>({
			index: 5,
			step: Step.Derivation,
			payload: {
				formulas: [implicationAB, A],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [1, 2],
			},
		});

		expect(result[0].comment).toBe("IE: 1, 2");
		expect(result[0].stringView).toBe("B");
		expect(result[0].step).toBe(Step.Derivation);
		expect(result[0].index).toBe(5);
	});
});
