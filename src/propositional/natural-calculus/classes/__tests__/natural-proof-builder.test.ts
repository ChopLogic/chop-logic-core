import { NaturalCalculusRule, Operator, Step } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { NaturalProofBuilder } from "../natural-proof-builder";

describe("NaturalProofBuilder and functional proof generation", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));

	describe("NaturalProofBuilder class", () => {
		it("should create a builder with a goal formula", () => {
			const builder = new NaturalProofBuilder(implicationAB);
			const proof = builder.build();

			expect(proof.getGoal()).toBe(implicationAB);
			expect(proof.getStepCount()).toBe(0);
		});

		it("should chain addPremise calls", () => {
			const proof = new NaturalProofBuilder(B)
				.addPremise(A, "First premise")
				.addPremise(B, "Second premise")
				.build();

			expect(proof.getStepCount()).toBe(2);
			expect(proof.getStep(1)?.formula).toBe(A);
			expect(proof.getStep(2)?.formula).toBe(B);
			expect(proof.isComplete()).toBe(true);
		});

		it("should chain addAssumption calls", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addAssumption(A, "Assume A")
				.build();

			expect(proof.getStepCount()).toBe(1);
			expect(proof.getStep(1)?.formula).toBe(A);
			expect(proof.getCurrentLevel()).toBe(1);
		});

		it("should support simple sub-proof with chaining", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addAssumption(A, "Assume A")
				.addPremise(B, "Given B")
				.closeSubProof("A => B")
				.build();

			expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(true);
		});

		it("should chain addDerivedStep calls", () => {
			const conjunctionAB = createPropFormula(createPropExpression("(A & B)"));

			const proof = new NaturalProofBuilder(conjunctionAB)
				.addPremise(A)
				.addPremise(B)
				.addDerivedStep({
					formulas: [A, B],
					rule: NaturalCalculusRule.CI,
					derivedFrom: [1, 2],
				})
				.build();

			expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
			const lastStep = proof.getLastStep();
			// The derived conjunction may be (B & A) or (A & B) depending on parsing
			expect(lastStep?.step).toBe(Step.Derivation);
			expect(lastStep?.formula?.operator).toBe(Operator.And);
		});

		it("should allow mixed step types in order", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addPremise(A)
				.addAssumption(B)
				.addPremise(A)
				.closeSubProof()
				.build();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.getStepCount()).toBeGreaterThanOrEqual(4);
		});

		it("should support nested sub-proofs with chaining", () => {
			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const negR = createPropFormula(createPropExpression("~r"));
			const pToQ = createPropFormula(createPropExpression("(p => q)"));
			const qToR = createPropFormula(createPropExpression("(q => r)"));
			const pToNegRToR = createPropFormula(
				createPropExpression("(p => (~r => r))"),
			);

			const proof = new NaturalProofBuilder(pToNegRToR)
				.addPremise(pToQ)
				.addPremise(qToR)
				.addAssumption(p)
				.addDerivedStep({
					formulas: [pToQ, p],
					rule: NaturalCalculusRule.IE,
					derivedFrom: [1, 3],
				})
				.addAssumption(negR)
				.addDerivedStep({
					formulas: [qToR, q],
					rule: NaturalCalculusRule.IE,
					derivedFrom: [2, 4],
				})
				.closeSubProof()
				.closeSubProof()
				.build();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(true);
		});

		it("should prove law of identity with chaining", () => {
			const p = createPropFormula(createPropExpression("p"));
			const pToP = createPropFormula(createPropExpression("(p => p)"));

			const proof = new NaturalProofBuilder(pToP)
				.addAssumption(p)
				.closeSubProof()
				.build();

			expect(proof.isComplete()).toBe(true);
			expect(proof.getCurrentLevel()).toBe(0);
		});
	});

	describe("NaturalProofBuilder buildSteps method", () => {
		it("should support callback-based step building", () => {
			const proof = new NaturalProofBuilder(B)
				.buildSteps((builder) => {
					builder.addPremise(A);
					builder.addPremise(B);
				})
				.build();

			expect(proof.getStepCount()).toBe(2);
			expect(proof.isComplete()).toBe(true);
		});

		it("should support nested buildSteps calls", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.buildSteps((builder) => {
					builder.addAssumption(A);
					builder.buildSteps((innerBuilder) => {
						innerBuilder.addPremise(B);
					});
				})
				.closeSubProof()
				.build();

			expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
			expect(proof.isComplete()).toBe(true);
		});

		it("should allow complex proof construction with buildSteps", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.buildSteps((builder) => {
					builder.addAssumption(A);
					builder.addPremise(B);
					builder.closeSubProof("A => B");
				})
				.build();

			expect(proof.isComplete()).toBe(true);
		});
	});

	describe("NaturalProofBuilder preview method", () => {
		it("should return proof state without building", () => {
			const builder = new NaturalProofBuilder(implicationAB)
				.addPremise(A)
				.addPremise(B);

			const previewProof = builder.preview();

			expect(previewProof.getStepCount()).toBe(2);
			expect(previewProof.getGoal()).toBe(implicationAB);
		});

		it("should return same instance as build", () => {
			const builder = new NaturalProofBuilder(implicationAB).addPremise(A);

			const preview = builder.preview();
			const built = builder.build();

			expect(preview).toBe(built);
		});

		it("should allow inspection and continue building", () => {
			const proof = new NaturalProofBuilder(B)
				.addPremise(A)
				.addPremise(B)
				.buildSteps((builder) => {
					const preview = builder.preview();
					expect(preview.getStepCount()).toBe(2);
				})
				.build();

			expect(proof.isComplete()).toBe(true);
		});
	});

	describe("NaturalProofBuilder fluent API", () => {
		it("should support complete proof in fluent style", () => {
			const proof = new NaturalProofBuilder(C)
				.addPremise(B)
				.addPremise(C)
				.build();

			expect(proof.getStepCount()).toBe(2);
			expect(proof.isComplete()).toBe(true);
		});

		it("should support complex fluent proof", () => {
			const conjunctionAB = createPropFormula(createPropExpression("(A & B)"));

			const proof = new NaturalProofBuilder(conjunctionAB)
				.addPremise(A, "Given A")
				.addPremise(B, "Given B")
				.addDerivedStep(
					{
						formulas: [A, B],
						rule: NaturalCalculusRule.CI,
						derivedFrom: [1, 2],
					},
					"Conjunction of A and B",
				)
				.build();

			const lastStep = proof.getLastStep();
			// The derived conjunction may be (B & A) or (A & B) depending on parsing
			expect(lastStep?.formula?.operator).toBe(Operator.And);
			expect(lastStep?.comment).toBe("Conjunction of A and B");
		});

		it("should build proof with multiple sub-proofs", () => {
			const D = createPropFormula(createPropExpression("D"));
			const E = createPropFormula(createPropExpression("E"));

			const proof = new NaturalProofBuilder(implicationAB)
				.addAssumption(A)
				.addPremise(B)
				.closeSubProof()
				.addAssumption(D)
				.addPremise(E)
				.closeSubProof()
				.build();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.getStepCount()).toBeGreaterThanOrEqual(6);
		});

		it("should chain reiterateStep method", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addPremise(A)
				.addAssumption(B)
				.reiterateStep(1)
				.build();

			expect(proof.getStepCount()).toBe(3);
			const step3 = proof.getStep(3);
			expect(step3?.step).toBe(Step.Reiteration);
			expect(step3?.formula).toBe(A);
		});

		it("should chain reiterateStep with custom comment", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addPremise(A)
				.addAssumption(B)
				.reiterateStep(1, "Reiterate premise for use in derivation")
				.build();

			const step3 = proof.getStep(3);
			expect(step3?.comment).toBe("Reiterate premise for use in derivation");
		});

		it("should support multiple riterations in sequence", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addPremise(A)
				.addPremise(B)
				.addAssumption(C)
				.reiterateStep(1, "Reiterate A")
				.reiterateStep(2, "Reiterate B")
				.build();

			const step4 = proof.getStep(4);
			const step5 = proof.getStep(5);

			expect(step4?.step).toBe(Step.Reiteration);
			expect(step4?.formula).toBe(A);
			expect(step5?.step).toBe(Step.Reiteration);
			expect(step5?.formula).toBe(B);
		});

		it("should integrate reiterateStep with other builder methods", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addPremise(A, "Premise A")
				.addAssumption(B, "Assume B")
				.reiterateStep(1, "Reiterate A in sub-proof")
				.addDerivedStep({
					formulas: [A, B],
					rule: NaturalCalculusRule.CI,
					derivedFrom: [3, 2],
				})
				.closeSubProof("A => (B & A)")
				.build();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.getStepCount()).toBeGreaterThan(5);
			const reiteStep = proof.getStep(3);
			expect(reiteStep?.step).toBe(Step.Reiteration);
		});

		it("should work with nested riterations across multiple levels", () => {
			const proof = new NaturalProofBuilder(implicationAB)
				.addPremise(A)
				.addAssumption(B)
				.addAssumption(C)
				.reiterateStep(1, "Reiterate A at level 2")
				.reiterateStep(2, "Reiterate B at level 2")
				.closeSubProof("B => result")
				.reiterateStep(1, "Reiterate A at level 1")
				.closeSubProof("A => result")
				.build();

			expect(proof.getCurrentLevel()).toBe(0);
			const step4 = proof.getStep(4);
			const step5 = proof.getStep(5);

			expect(step4?.step).toBe(Step.Reiteration);
			expect(step4?.level).toBe(2);
			expect(step5?.step).toBe(Step.Reiteration);
			expect(step5?.level).toBe(2);
		});
	});
});
