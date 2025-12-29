import { NaturalCalculusRule, Step } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { NaturalProof } from "../natural-proof";

describe("NaturalProof", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const conjunctionAB = createPropFormula(createPropExpression("(A & B)"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));

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

		it("should handle sub-proof nested inside another sub-proof with multiple steps", () => {
			// Proof structure:
			// (1) p→q (Premise)
			// (2) q→r (Premise)
			// (3) p (Assumption)
			// (4) q (Implication Elimination: 1, 3)
			// (5) ¬r (Assumption)
			// (6) r (Implication Elimination: 2, 4)
			// (7) ¬r → r (Implication Introduction: 5, 6)
			// (8) p → (¬r → r) (Implication Introduction: 3, 7)

			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const negR = createPropFormula(createPropExpression("~r"));
			const pToQ = createPropFormula(createPropExpression("(p => q)"));
			const qToR = createPropFormula(createPropExpression("(q => r)"));
			const negRToR = createPropFormula(createPropExpression("(~r => r)"));
			const pToNegRToR = createPropFormula(
				createPropExpression("(p => (~r => r))"),
			);

			const proof = new NaturalProof(pToNegRToR);

			// Step 1: p→q (Premise)
			const step1 = proof.addPremise(pToQ);
			expect(step1.index).toBe(1);
			expect(step1.level).toBe(0);

			// Step 2: q→r (Premise)
			const step2 = proof.addPremise(qToR);
			expect(step2.index).toBe(2);
			expect(step2.level).toBe(0);

			// Step 3: p (Assumption) - opens first sub-proof
			const step3 = proof.addAssumption(p);
			expect(step3.index).toBe(3);
			expect(step3.level).toBe(1);
			expect(proof.getCurrentLevel()).toBe(1);

			// Step 4: q (Implication Elimination: 1, 3)
			const step4 = proof.addDerivedStep({
				formulas: [pToQ, p],
				rule: NaturalCalculusRule.IE,
				derivedFrom: [1, 3],
			});
			expect(step4[0].level).toBe(1);
			const step4LastIndex = step4[step4.length - 1].index;

			// Step 5: ¬r (Assumption) - opens nested sub-proof
			const step5 = proof.addAssumption(negR);
			expect(step5.index).toBeGreaterThanOrEqual(step4LastIndex);
			expect(step5.level).toBe(2);
			expect(proof.getCurrentLevel()).toBe(2);

			// Step 6: r (Implication Elimination: 2, 4)
			const step6 = proof.addDerivedStep({
				formulas: [qToR, q],
				rule: NaturalCalculusRule.IE,
				derivedFrom: [2, step4LastIndex],
			});
			expect(step6[0].level).toBe(2);

			// Step 7: ¬r → r (Implication Introduction: 5, 6) - closes nested sub-proof
			const step7 = proof.closeSubProof();
			expect(step7.level).toBe(1);
			expect(step7.formula).toEqual(negRToR);
			expect(proof.getCurrentLevel()).toBe(1);

			// Step 8: p → (¬r → r) (Implication Introduction: 3, 7) - closes first sub-proof
			const step8 = proof.closeSubProof();
			expect(step8.level).toBe(0);
			expect(step8.formula).toEqual(pToNegRToR);
			expect(proof.getCurrentLevel()).toBe(0);

			// Verify the proof is complete
			expect(proof.isComplete()).toBe(true);
			expect(proof.getStepCount()).toBeGreaterThanOrEqual(8);

			// Verify step structure
			const allSteps = proof.getSteps();
			expect(allSteps.length).toBeGreaterThanOrEqual(8);

			// Check level transitions are correct: we should see 0, 0, 1, ..., 2, 2, ..., 1, 0
			// The exact indices might vary due to derived step generation, but levels should follow the pattern
			expect(allSteps[0].level).toBe(0); // Step 1 - Premise
			expect(allSteps[1].level).toBe(0); // Step 2 - Premise
			expect(allSteps[2].level).toBe(1); // Step 3 - Assumption (level 1 opens)
			// Find the nested assumption at level 2
			const nestedAssumptionIndex = allSteps.findIndex(
				(s, i) => i > 2 && s.level === 2,
			);
			expect(nestedAssumptionIndex).toBeGreaterThan(2);
			expect(allSteps[nestedAssumptionIndex].step).toBe(Step.Assumption);
			// After nested assumption, we should have level 2 steps
			expect(allSteps[nestedAssumptionIndex + 1].level).toBe(2);
			// Find first closure back to level 1
			const firstClosureIndex = allSteps.findIndex(
				(s, i) =>
					i > nestedAssumptionIndex &&
					s.level === 1 &&
					s.step === Step.Derivation,
			);
			expect(firstClosureIndex).toBeGreaterThan(nestedAssumptionIndex);
			// Find final closure to level 0
			const finalClosureIndex = allSteps.findIndex(
				(s, i) =>
					i > firstClosureIndex && s.level === 0 && s.step === Step.Derivation,
			);
			expect(finalClosureIndex).toBeGreaterThan(firstClosureIndex);
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

		it("should prove the law of identity (F => F) by assuming F and immediately closing", () => {
			// Law of Identity: (p => p)
			// (1) p (Assumption)
			// (2) p => p (Implication Introduction: 1)
			const p = createPropFormula(createPropExpression("p"));
			const pToP = createPropFormula(createPropExpression("(p => p)"));

			const proof = new NaturalProof(pToP);

			// Step 1: Assume p
			const assumption = proof.addAssumption(p);
			expect(assumption.index).toBe(1);
			expect(assumption.level).toBe(1);
			expect(assumption.step).toBe(Step.Assumption);

			// Step 2: Close the sub-proof to derive p => p
			const closure = proof.closeSubProof();
			expect(closure.level).toBe(0);
			expect(closure.step).toBe(Step.Derivation);
			expect(closure.formula).toEqual(pToP);

			// Verify the proof is complete
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(true);
			expect(proof.getStepCount()).toBeGreaterThanOrEqual(2);

			// Verify step structure
			const allSteps = proof.getSteps();
			expect(allSteps[0].formula).toEqual(p); // First step is the assumption
			expect(allSteps[allSteps.length - 1].formula).toEqual(pToP); // Last step is p => p
		});
	});

	describe("reiterateStep", () => {
		it("should add a reiteration step with the formula from the source step", () => {
			const proof = new NaturalProof(implicationAB);

			// Add a premise at level 0
			proof.addPremise(A);
			// Add an assumption to go to level 1
			proof.addAssumption(B);
			// Reiterate the premise inside the assumption
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.formula).toBe(A);
			expect(reiterationStep.step).toBe(Step.Reiteration);
			expect(reiterationStep.level).toBe(1);
			expect(reiterationStep.derivedFrom).toEqual([1]);
		});

		it("should increment step indices correctly for reiteration", () => {
			const proof = new NaturalProof(implicationAB);

			const step1 = proof.addPremise(A);
			proof.addAssumption(B);
			const step3 = proof.reiterateStep(1);

			expect(step1.index).toBe(1);
			expect(proof.getStep(2)?.step).toBe(Step.Assumption);
			expect(step3.index).toBe(3);
		});

		it("should use default comment format when no comment is provided", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			proof.addAssumption(B);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.comment).toBe("Reiteration: 1");
		});

		it("should use custom comment when provided", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			proof.addAssumption(B);
			const customComment = "Reiterate premise A for use in derivation";
			const reiterationStep = proof.reiterateStep(1, customComment);

			expect(reiterationStep.comment).toBe(customComment);
		});

		it("should throw error when source step does not exist", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			proof.addAssumption(B);

			expect(() => {
				proof.reiterateStep(99);
			}).toThrow("Cannot reiterate: step 99 not found in proof");
		});

		it("should throw error when trying to reiterate from the same level", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addAssumption(A);
			proof.addPremise(B); // Both at level 1

			expect(() => {
				proof.reiterateStep(2); // Try to reiterate step 2 (at level 1) while at level 1
			}).toThrow(
				"Cannot reiterate: step 2 is at level 1, which is not outer to the current level 1",
			);
		});

		it("should allow reiterating from any outer level to inner level", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A); // Level 0, step 1
			proof.addAssumption(B); // Level 1, step 2
			proof.addAssumption(C); // Level 2, step 3

			// All of these should work - can reiterate from level 0 or 1 at level 2
			const reitStep1 = proof.reiterateStep(1); // From level 0 to level 2
			expect(reitStep1.level).toBe(2);

			const reitStep2 = proof.reiterateStep(2); // From level 1 to level 2
			expect(reitStep2.level).toBe(2);
		});

		it("should properly set expression field from source step formula", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A);
			proof.addAssumption(B);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.expression).toBeDefined();
			expect(Array.isArray(reiterationStep.expression)).toBe(true);
			expect(reiterationStep.expression.length).toBeGreaterThan(0);
		});

		it("should preserve stringView from source step", () => {
			const proof = new NaturalProof(implicationAB);

			const premiseStep = proof.addPremise(A);
			proof.addAssumption(B);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.stringView).toBe(premiseStep.stringView);
		});

		it("should allow reiteration from level 0 to level 1", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A); // Level 0
			proof.addAssumption(B); // Open level 1
			const reiteration = proof.reiterateStep(1); // Reiterate from level 0

			expect(reiteration.level).toBe(1);
			expect(reiteration.derivedFrom).toEqual([1]);
		});

		it("should allow reiteration from level 0 to level 2 (across nested assumptions)", () => {
			const proof = new NaturalProof(implicationAB);

			proof.addPremise(A); // Level 0
			proof.addAssumption(B); // Level 1
			proof.addAssumption(C); // Level 2
			const reiteration = proof.reiterateStep(1); // Reiterate from level 0 at level 2

			expect(reiteration.level).toBe(2);
			expect(reiteration.derivedFrom).toEqual([1]);
		});

		it("should handle reiteration with complex formulas", () => {
			const proof = new NaturalProof(implicationAB);

			const complexFormula = createPropFormula(
				createPropExpression("((A & B) | (C => D))"),
			);
			proof.addPremise(complexFormula);
			proof.addAssumption(A);
			const reiterationStep = proof.reiterateStep(1);

			expect(reiterationStep.formula).toEqual(complexFormula);
			expect(reiterationStep.expression).toBeDefined();
		});

		it("should work in context of a full proof with reiteration and derivation", () => {
			// Proof: p, p => q, ¬q ⊢ contradiction
			// (1) p (Premise)
			// (2) p => q (Premise)
			// (3) ¬q (Assumption)
			// (4) p (Reiteration: 1)
			// (5) q (Modus Ponens: 2, 4)
			// (6) ¬q → (q & ¬q) (Implication Introduction: 3, derive q & ¬q)

			const p = createPropFormula(createPropExpression("p"));
			const pToQ = createPropFormula(createPropExpression("(p => q)"));
			const negQ = createPropFormula(createPropExpression("~q"));
			const qAndNegQ = createPropFormula(createPropExpression("(q & ~q)"));

			const proof = new NaturalProof(qAndNegQ);

			// Step 1: Premise p
			const step1 = proof.addPremise(p);
			expect(step1.level).toBe(0);

			// Step 2: Premise p => q
			const step2 = proof.addPremise(pToQ);
			expect(step2.level).toBe(0);

			// Step 3: Assumption ¬q (open sub-proof)
			const step3 = proof.addAssumption(negQ);
			expect(step3.level).toBe(1);
			expect(proof.getCurrentLevel()).toBe(1);

			// Step 4: Reiterate p inside the assumption
			const step4 = proof.reiterateStep(1);
			expect(step4.formula).toEqual(p);
			expect(step4.step).toBe(Step.Reiteration);
			expect(step4.level).toBe(1);
			expect(step4.derivedFrom).toEqual([1]);

			// Step 5: Use modus ponens with reiterateated step
			const step5 = proof.addDerivedStep({
				formulas: [pToQ, p],
				rule: NaturalCalculusRule.IE,
				derivedFrom: [2, 4], // Using the reiterated step
			});
			expect(step5[0].level).toBe(1);

			// Verify the proof structure
			const allSteps = proof.getSteps();
			expect(allSteps[0].step).toBe(Step.Premise); // p
			expect(allSteps[1].step).toBe(Step.Premise); // p => q
			expect(allSteps[2].step).toBe(Step.Assumption); // ¬q
			expect(allSteps[3].step).toBe(Step.Reiteration); // p (reiterated)
		});
	});
});
