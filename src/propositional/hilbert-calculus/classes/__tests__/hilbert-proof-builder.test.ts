import {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	Step,
} from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { buildHilbertProof } from "../../generators/build-hilbert-proof";
import { composeHilbertProof } from "../../generators/compose-hilbert-proof";
import { HilbertProofBuilder } from "../hilbert-proof-builder";

describe("HilbertProofBuilder and functional proof generation", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationAC = createPropFormula(createPropExpression("(A => C)"));

	describe("HilbertProofBuilder class", () => {
		it("should create a builder with a goal formula", () => {
			const builder = new HilbertProofBuilder(implicationAB);
			const proof = builder.build();

			expect(proof.getGoal()).toBe(implicationAB);
			expect(proof.getStepCount()).toBe(0);
		});

		it("should chain addPremise calls", () => {
			const proof = new HilbertProofBuilder(implicationAB)
				.addPremise(A, "First premise")
				.addPremise(B, "Second premise")
				.build();

			expect(proof.getStepCount()).toBe(2);
			expect(proof.getStep(1)?.formula).toBe(A);
			expect(proof.getStep(2)?.formula).toBe(B);
		});

		it("should chain addAxiom calls", () => {
			const proof = new HilbertProofBuilder(implicationAB)
				.addAxiom(
					{
						formulas: [A, B],
						schema: HilbertCalculusSchema.II,
					},
					"Axiom II",
				)
				.build();

			expect(proof.getStepCount()).toBe(1);
			expect(proof.getStep(1)?.comment).toBe("Axiom II");
		});

		it("should allow mixed step types", () => {
			const proof = new HilbertProofBuilder(implicationAB)
				.addPremise(A, "Assumption")
				.addAxiom(
					{
						formulas: [B, C],
						schema: HilbertCalculusSchema.II,
					},
					"Axiom",
				)
				.build();

			expect(proof.getStepCount()).toBe(2);
		});

		it("should provide preview without building", () => {
			const builder = new HilbertProofBuilder(implicationAB).addPremise(
				A,
				"Test premise",
			);

			const preview = builder.preview();
			expect(preview.getStepCount()).toBe(1);

			// Can continue adding steps after preview
			builder.addPremise(B, "Another premise");
			expect(preview.getStepCount()).toBe(2);
		});

		it("should execute buildSteps callback", () => {
			const proof = new HilbertProofBuilder(implicationAB)
				.buildSteps((builder) => {
					builder.addPremise(A, "Premise 1");
					builder.addPremise(B, "Premise 2");
				})
				.build();

			expect(proof.getStepCount()).toBe(2);
		});
	});

	describe("Complex proof scenarios", () => {
		it("should build a complex proof with mixed steps", () => {
			const proof = buildHilbertProof(implicationAC)
				.addPremise(A, "Assumption")
				.addPremise(B, "Given")
				.addAxiom(
					{
						formulas: [A, B, C],
						schema: HilbertCalculusSchema.II,
					},
					"Axiom instance",
				)
				.addPremise(C, "Final premise")
				.build();

			expect(proof.getStepCount()).toBe(4);
			expect(proof.getLastStep()?.formula).toBe(C);
		});

		it("should compose from generator functions", () => {
			const proof = composeHilbertProof(
				implicationAC,
				(b) => b.addPremise(A, "A"),
				(b) => b.addPremise(B, "B"),
				(b) => b.addPremise(C, "C"),
			);

			expect(proof.getStepCount()).toBe(3);
		});

		it("should allow programmatic step building", () => {
			const proof = buildHilbertProof(implicationAB)
				.buildSteps((builder) => {
					const steps = [
						{ formula: A, comment: "Step 1" },
						{ formula: B, comment: "Step 2" },
					];

					for (const { formula, comment } of steps) {
						builder.addPremise(formula, comment);
					}
				})
				.build();

			expect(proof.getStepCount()).toBe(2);
		});

		it("should chain reiterateStep method", () => {
			const proof = new HilbertProofBuilder(A)
				.addPremise(A)
				.reiterateStep(1)
				.build();

			expect(proof.getStepCount()).toBe(2);
			const step2 = proof.getStep(2);
			expect(step2?.step).toBe(Step.Reiteration);
			expect(step2?.formula).toBe(A);
		});

		it("should chain reiterateStep with custom comment", () => {
			const proof = new HilbertProofBuilder(B)
				.addPremise(B)
				.reiterateStep(1, "Reiterate for use in derivation")
				.build();

			const step2 = proof.getStep(2);
			expect(step2?.comment).toBe("Reiterate for use in derivation");
		});

		it("should support multiple reiterations in sequence", () => {
			const proof = new HilbertProofBuilder(A)
				.addPremise(A)
				.reiterateStep(1, "First reiteration")
				.reiterateStep(1, "Second reiteration")
				.build();

			expect(proof.getStepCount()).toBe(3);
			const step2 = proof.getStep(2);
			const step3 = proof.getStep(3);

			expect(step2?.step).toBe(Step.Reiteration);
			expect(step3?.step).toBe(Step.Reiteration);
			expect(step2?.formula).toBe(A);
			expect(step3?.formula).toBe(A);
		});

		it("should integrate reiterateStep with other builder methods", () => {
			const proof = new HilbertProofBuilder(B)
				.addPremise(A, "Premise A")
				.addPremise(B, "Premise B")
				.reiterateStep(1, "Reiterate A")
				.addDerivedStep({
					formulas: [implicationAB, A],
					rule: HilbertCalculusRule.IE,
					derivedFrom: [3, 2],
				})
				.build();

			expect(proof.getStepCount()).toBe(4);
			const step3 = proof.getStep(3);
			expect(step3?.step).toBe(Step.Reiteration);
			expect(step3?.derivedFrom).toEqual([1]);
		});
	});
});
