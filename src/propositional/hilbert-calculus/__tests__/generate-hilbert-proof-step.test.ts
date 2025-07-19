import { HilbertCalculusSchema, Step } from "../../../enums";
import { createPropExpression } from "../../factory/create-prop-expression";
import { createPropFormula } from "../../factory/create-prop-formula";
import { generateHilbertProofStep } from "../generate-hilbert-proof-step";

describe("generateProofStep", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));

	it("should generate a premise step", () => {
		const result = generateHilbertProofStep({
			index: 1,
			step: Step.Premise,
			payload: { formula: A },
		});

		expect(result).toMatchObject({
			index: 1,
			step: Step.Premise,
			formula: A,
			comment: "Premise",
		});
	});

	it("should generate a reiteration step", () => {
		const result = generateHilbertProofStep({
			index: 1,
			step: Step.Reiteration,
			payload: { formula: B },
		});

		expect(result).toMatchObject({
			index: 1,
			step: Step.Reiteration,
			formula: B,
			comment: "Reiteration",
		});
	});

	it("should generate a derived step using implication introduction", () => {
		const result = generateHilbertProofStep<Step.Axiom>({
			index: 2,
			step: Step.Axiom,
			payload: {
				formulas: [A, B],
				schema: HilbertCalculusSchema.II,
			},
		});

		expect(result.comment).toBe("II");
		expect(result.step).toBe(Step.Axiom);
		expect(result.stringView).toBe("(A → (B → A))");
	});

	it("should generate a derived step using implication distribution", () => {
		const result = generateHilbertProofStep<Step.Axiom>({
			index: 4,
			step: Step.Axiom,
			payload: {
				formulas: [A, B, C],
				schema: HilbertCalculusSchema.ID,
			},
		});

		expect(result.index).toBe(4);
		expect(result.comment).toBe("ID");
		expect(result.step).toBe(Step.Axiom);
		expect(result.stringView).toBe("((A → (B → C)) → ((A → B) → (A → C)))");
	});

	it("should generate a derived step using implication reversal", () => {
		const notA = createPropFormula(createPropExpression("~A"));
		const notB = createPropFormula(createPropExpression("~B"));
		const result = generateHilbertProofStep<Step.Axiom>({
			index: 4,
			step: Step.Axiom,
			payload: {
				formulas: [notA, notB],
				schema: HilbertCalculusSchema.IR,
			},
		});

		expect(result.comment).toBe("IR");
		expect(result.stringView).toBe("((¬¬A → ¬¬B) → (¬B → ¬A))");
	});

	it("should generate a derived step using implication elimination", () => {
		const result = generateHilbertProofStep<Step.Derivation>({
			index: 5,
			step: Step.Derivation,
			payload: {
				formulas: [implicationAB, A],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [1, 2],
			},
		});

		expect(result.comment).toBe("IE: 1, 2");
		expect(result.stringView).toBe("B");
		expect(result.step).toBe(Step.Derivation);
		expect(result.index).toBe(5);
	});
});
