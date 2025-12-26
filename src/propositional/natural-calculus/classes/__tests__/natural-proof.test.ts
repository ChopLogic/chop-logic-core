import { NaturalCalculusRule, Step } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { NaturalProof } from "../natural-proof";

describe("NaturalProof", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const conjunctionAB = createPropFormula(createPropExpression("(A & B)"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationBC = createPropFormula(createPropExpression("(B => C)"));

	describe("constructor", () => {
		it("should create a new proof with a goal formula", () => {
			const proof = new NaturalProof(implicationAB);

			expect(proof.getGoal()).toBe(implicationAB);
			expect(proof.getStepCount()).toBe(0);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(false);
		});
	});

	describe("addPremise", () => {
		it("should add a premise step at the current level", () => {
			const proof = new NaturalProof(implicationAB);

			const step = proof.addPremise(A, "Given assumption");

			expect(step.index).toBe(1);
			expect(step.step).toBe(Step.Premise);
			expect(step.formula).toBe(A);
			expect(step.level).toBe(0);
			expect(step.comment).toBe("Given assumption");
			expect(proof.getStepCount()).toBe(1);
			expect(proof.getCurrentLevel()).toBe(0);
		});

		it("should add multiple premises in order", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			const secondStep = proof.addPremise(B);

			expect(secondStep.index).toBe(2);
			expect(proof.getStepCount()).toBe(2);
		});

		it("should add premises at nested levels inside assumptions", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			proof.addAssumption(B);
			const nestedPremise = proof.addPremise(C);

			expect(nestedPremise.level).toBe(1);
			expect(nestedPremise.index).toBe(3);
		});
	});

	describe("addAssumption", () => {
		it("should add an assumption and increase the current level", () => {
			const proof = new NaturalProof(implicationAB);

			const step = proof.addAssumption(A, "Assume A");

			expect(step.index).toBe(1);
			expect(step.step).toBe(Step.Assumption);
			expect(step.formula).toBe(A);
			expect(step.level).toBe(1);
			expect(step.comment).toBe("Assume A");
			expect(proof.getCurrentLevel()).toBe(1);
			expect(proof.getStepCount()).toBe(1);
		});

		it("should support nested assumptions", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			const secondAssumption = proof.addAssumption(B);

			expect(secondAssumption.level).toBe(2);
			expect(proof.getCurrentLevel()).toBe(2);
			expect(proof.getStepCount()).toBe(2);
		});
	});

	describe("addDerivedStep", () => {
		it("should add a derived step at the current level", () => {
			const proof = new NaturalProof(conjunctionAB);

			proof.addPremise(A);
			proof.addPremise(B);

			const derivedSteps = proof.addDerivedStep({
				formulas: [A, B],
				rule: NaturalCalculusRule.CI,
				derivedFrom: [1, 2],
			});

			expect(derivedSteps.length).toBeGreaterThan(0);
			expect(derivedSteps[0].step).toBe(Step.Derivation);
			expect(derivedSteps[0].level).toBe(0);
			expect(derivedSteps[0].derivedFrom).toEqual([1, 2]);
		});

		it("should add derived steps with custom comment", () => {
			const proof = new NaturalProof(conjunctionAB);

			proof.addPremise(A);
			proof.addPremise(B);

			const derivedSteps = proof.addDerivedStep({
				formulas: [A, B],
				rule: NaturalCalculusRule.CI,
				derivedFrom: [1, 2],
			});

			expect(derivedSteps[0].comment).toBe("CI: 1, 2");
		});

		it("should add derived steps inside assumptions at nested level", () => {
			const disjunctionAB = createPropFormula(createPropExpression("(A | B)"));
			const proof = new NaturalProof(disjunctionAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			const derivedSteps = proof.addDerivedStep({
				formulas: [A, B],
				rule: NaturalCalculusRule.DI,
				derivedFrom: [1, 2],
			});

			expect(derivedSteps[0].level).toBe(1);
		});

		it("should increment step indices correctly", () => {
			const proof = new NaturalProof(conjunctionAB);

			proof.addPremise(A);
			proof.addPremise(B);
			const derivedSteps = proof.addDerivedStep({
				formulas: [A, B],
				rule: NaturalCalculusRule.CI,
				derivedFrom: [1, 2],
			});

			const lastStep = derivedSteps[derivedSteps.length - 1];
			expect(lastStep.index).toBeGreaterThan(2);
		});
	});

	describe("closeSubProof", () => {
		it("should close a sub-proof and decrease the current level", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			expect(proof.getCurrentLevel()).toBe(1);

			const closingStep = proof.closeSubProof();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(closingStep.level).toBe(0);
			expect(closingStep.step).toBe(Step.Derivation);
		});

		it("should throw an error when closing at level 0", () => {
			const proof = new NaturalProof(implicationAB);

			expect(() => {
				proof.closeSubProof();
			}).toThrow("Cannot close sub-proof when already at level 0");
		});

		it("should allow nested sub-proof closure", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addAssumption(B);
			expect(proof.getCurrentLevel()).toBe(2);

			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(1);

			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(0);
		});

		it("should add closing step with custom comment", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			const closingStep = proof.closeSubProof("Custom explanation");

			expect(closingStep.comment).toBe("Custom explanation");
		});
	});

	describe("getSteps", () => {
		it("should return a frozen copy of all steps", () => {
			const proof = new NaturalProof(conjunctionAB);
			proof.addPremise(A);
			proof.addPremise(B);

			const steps = proof.getSteps();

			expect(steps.length).toBe(2);
			expect(Object.isFrozen(steps)).toBe(true);
		});

		it("should include steps from nested levels", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			proof.addAssumption(B);
			proof.addPremise(C);

			const steps = proof.getSteps();

			expect(steps.length).toBe(3);
			expect(steps[0].level).toBe(0);
			expect(steps[1].level).toBe(1);
			expect(steps[2].level).toBe(1);
		});
	});

	describe("getStep", () => {
		it("should retrieve a specific step by 1-based index", () => {
			const proof = new NaturalProof(conjunctionAB);
			proof.addPremise(A);
			proof.addPremise(B);

			const firstStep = proof.getStep(1);
			const secondStep = proof.getStep(2);

			expect(firstStep?.formula).toBe(A);
			expect(secondStep?.formula).toBe(B);
		});

		it("should return undefined for out-of-bounds indices", () => {
			const proof = new NaturalProof(implicationAB);
			proof.addPremise(A);

			expect(proof.getStep(5)).toBeUndefined();
		});
	});

	describe("getLastStep", () => {
		it("should return the last step added to the proof", () => {
			const proof = new NaturalProof(implicationAB);
			proof.addPremise(A);
			proof.addPremise(B);

			const lastStep = proof.getLastStep();

			expect(lastStep?.index).toBe(2);
			expect(lastStep?.formula).toBe(B);
		});

		it("should return undefined when proof is empty", () => {
			const proof = new NaturalProof(implicationAB);

			expect(proof.getLastStep()).toBeUndefined();
		});

		it("should return the most recently added step after closing sub-proofs", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			const closingStep = proof.closeSubProof();

			const lastStep = proof.getLastStep();
			expect(lastStep?.formula).toEqual(closingStep.formula);
		});
	});

	describe("isComplete", () => {
		it("should return true when last formula equals goal and level is 0", () => {
			const proof = new NaturalProof(B);

			proof.addPremise(A);
			proof.addPremise(B);

			expect(proof.isComplete()).toBe(true);
		});

		it("should return false when proof is empty", () => {
			const proof = new NaturalProof(A);

			expect(proof.isComplete()).toBe(false);
		});

		it("should return false when last step does not match goal", () => {
			const proof = new NaturalProof(conjunctionAB);
			proof.addPremise(A);
			proof.addAssumption(B);
			proof.closeSubProof();

			expect(proof.isComplete()).toBe(false);
		});

		it("should return false when still inside a sub-proof (level > 0)", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(implicationAB);

			expect(proof.getCurrentLevel()).toBe(1);
			expect(proof.isComplete()).toBe(false);
		});

		it("should return true when goal is reached with a premise at level 0", () => {
			const proof = new NaturalProof(A);
			proof.addPremise(A);

			expect(proof.isComplete()).toBe(true);
		});

		it("should return true for a simple implication proof with sub-proof", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			const closingStep = proof.closeSubProof();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.getLastStep()?.formula).toEqual(closingStep.formula);
			expect(proof.isComplete()).toBe(true);
		});
	});

	describe("getCurrentLevel", () => {
		it("should return 0 at the start", () => {
			const proof = new NaturalProof(implicationAB);

			expect(proof.getCurrentLevel()).toBe(0);
		});

		it("should increase when adding an assumption", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			expect(proof.getCurrentLevel()).toBe(1);

			proof.addAssumption(B);
			expect(proof.getCurrentLevel()).toBe(2);
		});

		it("should decrease when closing a sub-proof", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			expect(proof.getCurrentLevel()).toBe(1);

			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(0);
		});
	});

	describe("clear", () => {
		it("should remove all steps from the proof", () => {
			const proof = new NaturalProof(implicationAB);
			proof.addPremise(A);
			proof.addPremise(B);

			expect(proof.getStepCount()).toBe(2);

			proof.clear();

			expect(proof.getStepCount()).toBe(0);
			expect(proof.getLastStep()).toBeUndefined();
			expect(proof.getCurrentLevel()).toBe(0);
		});

		it("should reset level to 0 after clearing", () => {
			const proof = new NaturalProof(implicationAB);
			proof.addAssumption(A);

			expect(proof.getCurrentLevel()).toBe(1);

			proof.clear();

			expect(proof.getCurrentLevel()).toBe(0);
		});
	});

	describe("integration scenarios", () => {
		it("should handle a simple proof without sub-proofs", () => {
			const proof = new NaturalProof(B);

			proof.addPremise(A);
			proof.addPremise(B);

			expect(proof.getStepCount()).toBe(2);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(true);
		});

		it("should handle a proof with a single sub-proof", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B);
			proof.closeSubProof();

			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(true);
		});

		it("should handle multiple nested sub-proofs", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			expect(proof.getCurrentLevel()).toBe(1);

			proof.addAssumption(B);
			expect(proof.getCurrentLevel()).toBe(2);

			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(1);

			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(0);
		});

		it("should properly track indices across multiple operations", () => {
			const proof = new NaturalProof(implicationAB);

			const step1 = proof.addPremise(A);
			proof.addAssumption(B);
			const step3 = proof.addPremise(C);
			const closingStep = proof.closeSubProof();

			expect(step1.index).toBe(1);
			expect(proof.getStep(2)?.step).toBe(Step.Assumption);
			expect(step3.index).toBe(3);
			expect(closingStep.index).toBeGreaterThan(3);
		});

		it("should handle multiple sub-proofs at the same level correctly", () => {
			const D = createPropFormula(createPropExpression("D"));
			const E = createPropFormula(createPropExpression("E"));
			const implicationDE = createPropFormula(createPropExpression("(D => E)"));

			const proof = new NaturalProof(implicationAB);

			// First sub-proof: A => B
			proof.addAssumption(A);
			proof.addPremise(B);
			const step1Closure = proof.closeSubProof();
			expect(step1Closure.formula).toEqual(implicationAB);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(step1Closure.step).toBe(Step.Derivation);

			// Verify we're back at level 0
			expect(proof.getCurrentLevel()).toBe(0);

			// Now if we were to do a second sub-proof at level 0 (starting a new assumption)
			proof.addAssumption(D);
			proof.addPremise(E);
			const step2Closure = proof.closeSubProof();
			expect(step2Closure.formula).toEqual(implicationDE);
			expect(proof.getCurrentLevel()).toBe(0);

			// Verify that the second closure correctly references the D assumption, not the A assumption
			const allSteps = proof.getSteps();
			expect(allSteps[allSteps.length - 1]).toEqual(step2Closure);
		});
	});
});
