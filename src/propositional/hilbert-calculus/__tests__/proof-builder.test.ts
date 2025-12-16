import { HilbertCalculusSchema } from "../../../enums";
import { createPropExpression } from "../../builders/create-prop-expression";
import { createPropFormula } from "../../builders/create-prop-formula";
import {
	buildProof,
	buildProofWith,
	composeProof,
	extendProof,
} from "../build-functions";
import { HilbertProofBuilder } from "../hilbert-proof-builder";

describe("HilbertProofBuilder and functional proof generation", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationBC = createPropFormula(createPropExpression("(B => C)"));
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

	describe("buildProof function", () => {
		it("should create a builder and allow chaining", () => {
			const proof = buildProof(implicationAB)
				.addPremise(A, "Given")
				.addAxiom(
					{
						formulas: [A, B],
						schema: HilbertCalculusSchema.II,
					},
					"Axiom II",
				)
				.build();

			expect(proof.getStepCount()).toBe(2);
			expect(proof.getGoal()).toBe(implicationAB);
		});

		it("should support fluent API usage", () => {
			const proof = buildProof(implicationAC)
				.addPremise(A)
				.addPremise(B)
				.addPremise(C)
				.build();

			expect(proof.getStepCount()).toBe(3);
		});
	});

	describe("composeProof function", () => {
		it("should compose proof from step generators", () => {
			const createPremises = (builder: HilbertProofBuilder) => {
				builder.addPremise(A, "First");
				builder.addPremise(B, "Second");
			};

			const createAxioms = (builder: HilbertProofBuilder) => {
				builder.addAxiom(
					{
						formulas: [A, B, C],
						schema: HilbertCalculusSchema.II,
					},
					"Axiom",
				);
			};

			const proof = composeProof(implicationAB, createPremises, createAxioms);

			expect(proof.getStepCount()).toBe(3);
			expect(proof.getStep(1)?.formula).toBe(A);
			expect(proof.getStep(2)?.formula).toBe(B);
		});

		it("should compose with multiple generators in order", () => {
			const gen1 = (builder: HilbertProofBuilder) => builder.addPremise(A);
			const gen2 = (builder: HilbertProofBuilder) => builder.addPremise(B);
			const gen3 = (builder: HilbertProofBuilder) => builder.addPremise(C);

			const proof = composeProof(implicationAC, gen1, gen2, gen3);

			expect(proof.getStepCount()).toBe(3);
		});

		it("should work with no generators", () => {
			const proof = composeProof(implicationAB);

			expect(proof.getStepCount()).toBe(0);
			expect(proof.getGoal()).toBe(implicationAB);
		});
	});

	describe("extendProof function", () => {
		it("should extend an existing proof with new steps", () => {
			const basePath = buildProof(implicationAB)
				.addPremise(A, "Base premise")
				.build();

			const extended = extendProof(basePath, (builder) => {
				builder.addPremise(B, "Extended premise");
			});

			expect(extended.getStepCount()).toBe(2);
		});

		it("should preserve goal and existing steps", () => {
			const basePath = buildProof(implicationAB)
				.addPremise(A)
				.addPremise(B)
				.build();

			const extended = extendProof(basePath, (builder) => {
				builder.addPremise(C);
			});

			expect(extended.getGoal()).toBe(implicationAB);
			expect(extended.getStepCount()).toBe(3);
		});
	});

	describe("buildProofWith function", () => {
		it("should create a builder with configuration", () => {
			const builder = buildProofWith(implicationAB, {
				validateOnAdd: true,
			});

			expect(builder).toBeInstanceOf(HilbertProofBuilder);
		});

		it("should apply validator on build", () => {
			const validator = (proof: any) => proof.getStepCount() > 0;

			const builderWithValidator = buildProofWith(implicationAB, {
				validator,
			});

			expect(() => {
				builderWithValidator.build();
			}).toThrow("Proof validation failed");
		});

		it("should pass validation for valid proofs", () => {
			const validator = (proof: any) => proof.getStepCount() > 0;

			const proof = buildProofWith(implicationAB, { validator })
				.addPremise(A)
				.build();

			expect(proof.getStepCount()).toBe(1);
		});
	});

	describe("Complex proof scenarios", () => {
		it("should build a complex proof with mixed steps", () => {
			const proof = buildProof(implicationAC)
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
			const proof = composeProof(
				implicationAC,
				(b) => b.addPremise(A, "A"),
				(b) => b.addPremise(B, "B"),
				(b) => b.addPremise(C, "C"),
			);

			expect(proof.getStepCount()).toBe(3);
		});

		it("should allow programmatic step building", () => {
			const proof = buildProof(implicationAB)
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
	});
});
