import {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	Step,
} from "../../../../enums";
import type { PropProofStep } from "../../../../models";
import { createPropExpression, createPropFormula } from "../../../builders";
import { HilbertProof } from "../hilbert-proof";

describe("HilbertProof", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationBA = createPropFormula(createPropExpression("(B => A)"));

	describe("constructor", () => {
		it("should create a new proof with a goal formula", () => {
			const proof = new HilbertProof(implicationAB);

			expect(proof.getGoal()).toBe(implicationAB);
			expect(proof.getStepCount()).toBe(0);
			expect(proof.isComplete()).toBe(false);
		});
	});

	describe("addPremise", () => {
		it("should add a premise step to the proof", () => {
			const proof = new HilbertProof(implicationAB);

			const step = proof.addPremise(A, "Given assumption");

			expect(step.index).toBe(1);
			expect(step.step).toBe(Step.Premise);
			expect(step.formula).toBe(A);
			expect(step.comment).toBe("Given assumption");
			expect(proof.getStepCount()).toBe(1);
		});

		it("should add multiple premises in order", () => {
			const proof = new HilbertProof(implicationAB);

			proof.addPremise(A);
			const secondStep = proof.addPremise(B);

			expect(secondStep.index).toBe(2);
			expect(proof.getStepCount()).toBe(2);
		});
	});

	describe("addAxiom", () => {
		it("should add an axiom step using a schema", () => {
			const proof = new HilbertProof(implicationBA);

			const step = proof.addAxiom(
				{
					formulas: [A, B],
					schema: HilbertCalculusSchema.II,
				},
				"Axiom II",
			);

			expect(step.index).toBe(1);
			expect(step.step).toBe(Step.Axiom);
			expect(step.comment).toBe("Axiom II");
			expect(proof.getStepCount()).toBe(1);
		});
	});

	describe("addDerivedStep", () => {
		it("should add a derived step from previous steps", () => {
			const proof = new HilbertProof(B);

			proof.addPremise(A);
			proof.addPremise(B);

			const derivedStep = proof.addDerivedStep(
				{
					formulas: [implicationAB, A],
					rule: HilbertCalculusRule.IE,
					derivedFrom: [1, 2],
				},
				"Modus Ponens",
			);

			expect(derivedStep[0].index).toBe(3);
			expect(derivedStep[0].step).toBe(Step.Derivation);
			expect(derivedStep[0].derivedFrom).toEqual([1, 2]);
			expect(derivedStep[0].comment).toBe("Modus Ponens");
		});
	});

	describe("getSteps", () => {
		it("should return a frozen copy of all steps", () => {
			const proof = new HilbertProof(implicationAB);
			proof.addPremise(A);
			proof.addPremise(B);

			const steps = proof.getSteps();

			expect(steps.length).toBe(2);
			expect(Object.isFrozen(steps)).toBe(true);
		});
	});

	describe("getStep", () => {
		it("should retrieve a specific step by 1-based index", () => {
			const proof = new HilbertProof(implicationAB);
			proof.addPremise(A);
			proof.addPremise(B);

			const firstStep = proof.getStep(1);
			const secondStep = proof.getStep(2);

			expect(firstStep?.formula).toBe(A);
			expect(secondStep?.formula).toBe(B);
		});

		it("should return undefined for out-of-bounds indices", () => {
			const proof = new HilbertProof(implicationAB);
			proof.addPremise(A);

			expect(proof.getStep(5)).toBeUndefined();
		});
	});

	describe("getLastStep", () => {
		it("should return the last step added to the proof", () => {
			const proof = new HilbertProof(implicationAB);
			proof.addPremise(A);
			proof.addPremise(B);

			const lastStep = proof.getLastStep();

			expect(lastStep?.index).toBe(2);
			expect(lastStep?.formula).toBe(B);
		});

		it("should return undefined when proof is empty", () => {
			const proof = new HilbertProof(implicationAB);

			expect(proof.getLastStep()).toBeUndefined();
		});
	});

	describe("isComplete", () => {
		it("should return true when the last formula equals the goal", () => {
			const proof = new HilbertProof(B);

			proof.addPremise(A);
			proof.addPremise(B);

			proof.addDerivedStep(
				{
					formulas: [implicationAB, A],
					rule: HilbertCalculusRule.IE,
					derivedFrom: [1, 2],
				},
				"Modus Ponens",
			);

			expect(proof.isComplete()).toBe(true);
		});

		it("should return false when there are only premises in the proof sequence", () => {
			const proof = new HilbertProof(A);
			proof.addPremise(A);

			expect(proof.isComplete()).toBe(false);
		});

		it("should return false when proof has no steps", () => {
			const proof = new HilbertProof(A);

			expect(proof.isComplete()).toBe(false);
		});

		it("should return false when last step does not match the goal", () => {
			const proof = new HilbertProof(implicationAB);
			proof.addPremise(A);

			expect(proof.isComplete()).toBe(false);
		});
	});

	describe("clear", () => {
		it("should remove all steps from the proof", () => {
			const proof = new HilbertProof(implicationAB);
			proof.addPremise(A);
			proof.addPremise(B);

			expect(proof.getStepCount()).toBe(2);

			proof.clear();

			expect(proof.getStepCount()).toBe(0);
			expect(proof.getLastStep()).toBeUndefined();
		});
	});

	describe("comments", () => {
		it("should provide automatic comments for the steps", () => {
			const proof = new HilbertProof(B);

			proof.addPremise(A);
			proof.addPremise(B);
			proof.addAxiom({
				formulas: [A, B],
				schema: HilbertCalculusSchema.II,
			});

			proof.addDerivedStep({
				formulas: [implicationAB, A],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [1, 2],
			});

			expect(proof.getStep(1)?.comment).toBe("Premise");
			expect(proof.getStep(2)?.comment).toBe("Premise");
			expect(proof.getStep(3)?.comment).toBe("II");
			expect(proof.getStep(4)?.comment).toBe("IE: 1, 2");
		});
	});

	describe("reiterateStep", () => {
		it("should add a reiteration step with the formula from the source step", () => {
			const proof = new HilbertProof(A);

			proof.addPremise(A);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.formula).toBe(A);
			expect(reiterationStep.step).toBe(Step.Reiteration);
			expect(reiterationStep.derivedFrom).toEqual([1]);
		});

		it("should increment step indices correctly for reiteration", () => {
			const proof = new HilbertProof(B);

			const step1 = proof.addPremise(A);
			const step2 = proof.addPremise(B);
			const step3 = proof.reiterateStep(1);

			expect(step1.index).toBe(1);
			expect(step2.index).toBe(2);
			expect(step3.index).toBe(3);
		});

		it("should use default comment format when no comment is provided", () => {
			const proof = new HilbertProof(A);

			proof.addPremise(A);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.comment).toBe("Reiteration: 1");
		});

		it("should use custom comment when provided", () => {
			const proof = new HilbertProof(A);

			proof.addPremise(A);
			const customComment = "Reiterate premise A for derivation";
			const reiterationStep = proof.reiterateStep(1, customComment);

			expect(reiterationStep.comment).toBe(customComment);
		});

		it("should throw error when source step does not exist", () => {
			const proof = new HilbertProof(A);

			proof.addPremise(A);

			expect(() => {
				proof.reiterateStep(99);
			}).toThrow("Cannot reiterate: step 99 not found in proof");
		});

		it("should allow reiterating from an axiom step", () => {
			const proof = new HilbertProof(B);

			proof.addAxiom({
				formulas: [A, B],
				schema: HilbertCalculusSchema.II,
			});

			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.derivedFrom).toEqual([1]);
			expect(reiterationStep.step).toBe(Step.Reiteration);
		});

		it("should allow reiterating from a derived step", () => {
			const proof = new HilbertProof(B);

			proof.addPremise(A);
			proof.addPremise(implicationAB);
			proof.addDerivedStep({
				formulas: [implicationAB, A],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [1, 2],
			});

			const reiterationStep = proof.reiterateStep(3);

			expect(reiterationStep.derivedFrom).toEqual([3]);
			expect(reiterationStep.formula).toStrictEqual(B);
		});

		it("should allow multiple riterations in sequence", () => {
			const proof = new HilbertProof(A);

			proof.addPremise(A);
			const reiter1 = proof.reiterateStep(1, "First reiteration");
			const reiter2 = proof.reiterateStep(1, "Second reiteration");

			expect(reiter1.index).toBe(2);
			expect(reiter2.index).toBe(3);
			expect(proof.getStepCount()).toBe(3);
		});

		it("should preserve formula and expression from source step", () => {
			const proof = new HilbertProof(implicationAB);

			const premise = proof.addPremise(implicationAB);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.formula).toEqual(premise.formula);
			expect(reiterationStep.expression).toEqual(premise.expression);
			expect(reiterationStep.stringView).toBe(premise.stringView);
		});
	});

	describe("replace", () => {
		it("should replace an atom in all proof steps", () => {
			const proof = new HilbertProof(implicationAB);

			proof.addPremise(A);
			proof.addPremise(B);

			const step1Before = proof.getStep(1) as PropProofStep;
			const stringViewBefore = step1Before.stringView;

			proof.replace(["A"], B);

			const step1After = proof.getStep(1) as PropProofStep;
			const step2After = proof.getStep(2) as PropProofStep;

			// Formulas should be updated
			expect(step1After.formula).not.toEqual(A);
			expect(step2After.formula).toEqual(B);

			// stringView should be regenerated
			expect(step1After.stringView).not.toBe(stringViewBefore);
			expect(step1After.stringView).toBe("B");
		});

		it("should not modify the goal formula", () => {
			const proof = new HilbertProof(A);

			proof.addPremise(B);

			const goalBefore = proof.getGoal();

			proof.replace(["B"], A);

			const goalAfter = proof.getGoal();

			// Goal should remain unchanged
			expect(goalAfter).toBe(goalBefore);
			expect(goalAfter).toEqual(A);
		});

		it("should replace atoms in complex formulas", () => {
			const proof = new HilbertProof(implicationAB);

			proof.addPremise(implicationAB);

			const stepBefore = proof.getStep(1) as PropProofStep;
			const stringViewBefore = stepBefore.stringView;

			proof.replace(["A"], B);

			const stepAfter = proof.getStep(1) as PropProofStep;

			// The formula should be updated and reflected in stringView
			expect(stepAfter.stringView).not.toBe(stringViewBefore);
			expect(stepAfter.stringView).toBe("(B → B)");
		});

		it("should update expression and stringView for replaced atoms", () => {
			const proof = new HilbertProof(B);

			proof.addPremise(A);

			const stepBefore = proof.getStep(1) as PropProofStep;
			const stringViewBefore = stepBefore.stringView;

			proof.replace(["A"], B);

			const stepAfter = proof.getStep(1) as PropProofStep;

			// stringView should be regenerated
			expect(stepAfter.stringView).not.toBe(stringViewBefore);
			expect(stepAfter.stringView).toBe("B");
		});

		it("should replace atom with another atom", () => {
			const proof = new HilbertProof(B);

			proof.addPremise(A);

			proof.replace(["A"], ["B"]);

			const step = proof.getStep(1) as PropProofStep;

			expect(step.stringView).toBe("B");
			expect(step.formula).toEqual(B);
		});
	});
});
