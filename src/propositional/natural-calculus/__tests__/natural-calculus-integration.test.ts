import { NaturalCalculusRule, Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { NaturalProof } from "../classes/natural-proof";
import { NaturalProofBuilder } from "../classes/natural-proof-builder";

describe("Natural Calculus Integration Tests", () => {
	describe("Modus Tollendo Ponens (Disjunction with Negation)", () => {
		/**
		 * Proof of Modus Tollendo Ponens:
		 * Given: p ∨ q and ¬p
		 * Derive: q
		 *
		 * Proof sequence:
		 * (1) p ∨ q (Premise)
		 * (2) ¬p (Premise)
		 * (3) p (Assumption)
		 * (4) ¬q (Assumption)
		 * (5) p (Reiteration: 3)
		 * (6) ¬q → p (Implication Introduction: 4, 5) - closing sub-proof
		 * (7) ¬q (Assumption)
		 * (8) ¬p (Reiteration: 2)
		 * (9) ¬q → ¬p (Implication Introduction: 7, 8) - closing sub-proof
		 * (10) ¬¬q (Negation Introduction: 6, 9)
		 * (11) q (Negation Elimination: 10)
		 * (12) p→q (Implication Introduction: 3, 11) - closing sub-proof
		 * (13) q (Assumption)
		 * (14) q→q (Implication Introduction: 13, 13) - closing sub-proof
		 * (15) q (Disjunction Elimination: 1, 12, 14)
		 */
		it("should prove q from premises p ∨ q and ¬p using NaturalProofBuilder", () => {
			// Create base formulas
			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const pOrQ = createPropFormula(createPropExpression("(p | q)"));
			const notP = createPropFormula(createPropExpression("~p"));
			const notQ = createPropFormula(createPropExpression("~q"));
			const notNotQ = createPropFormula(createPropExpression("~~q"));
			const negNotQToP = createPropFormula(createPropExpression("(~q => p)"));
			const negNotQToNegP = createPropFormula(
				createPropExpression("(~q => ~p)"),
			);
			const pToQ = createPropFormula(createPropExpression("(p => q)"));
			const qToQ = createPropFormula(createPropExpression("(q => q)"));

			// Build the proof step by step
			const proof = new NaturalProofBuilder(q)
				.addPremise(pOrQ)
				.addPremise(notP)
				.addAssumption(p)
				.addAssumption(notQ)
				.reiterateStep(3)
				.closeSubProof()
				.addAssumption(notQ)
				.reiterateStep(2)
				.closeSubProof()
				.addDerivedStep({
					formulas: [negNotQToP, negNotQToNegP],
					rule: NaturalCalculusRule.NI,
					derivedFrom: [6, 9],
				})
				.addDerivedStep({
					formulas: [notNotQ],
					rule: NaturalCalculusRule.NE,
					derivedFrom: [10],
				})
				.closeSubProof()
				.addAssumption(q)
				.closeSubProof()
				.addDerivedStep({
					formulas: [pOrQ, pToQ, qToQ],
					rule: NaturalCalculusRule.DE,
					derivedFrom: [1, 12, 14],
				})
				.build();

			// Verify proof structure
			expect(proof.getGoal()).toEqual(q);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.isComplete()).toBe(true);

			// Verify key steps
			const step5 = proof.getStep(5);
			expect(step5?.step).toBe(Step.Reiteration);
			expect(step5?.formula).toEqual(p);
			expect(step5?.derivedFrom).toEqual([3]);

			const step8 = proof.getStep(8);
			expect(step8?.step).toBe(Step.Reiteration);
			expect(step8?.formula).toEqual(notP);
			expect(step8?.derivedFrom).toEqual([2]);

			// Verify the last step is the conclusion
			const lastStep = proof.getLastStep();
			expect(lastStep?.formula).toEqual(q);
			expect(lastStep?.step).toBe(Step.Derivation);
		});

		it("should prove q from premises p ∨ q and ¬p using NaturalProof class directly", () => {
			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const pOrQ = createPropFormula(createPropExpression("(p | q)"));
			const notP = createPropFormula(createPropExpression("~p"));
			const notQ = createPropFormula(createPropExpression("~q"));
			const notNotQ = createPropFormula(createPropExpression("~~q"));
			const negNotQToP = createPropFormula(createPropExpression("(~q => p)"));
			const negNotQToNegP = createPropFormula(
				createPropExpression("(~q => ~p)"),
			);
			const pToQ = createPropFormula(createPropExpression("(p => q)"));
			const qToQ = createPropFormula(createPropExpression("(q => q)"));

			const proof = new NaturalProof(q);

			proof.addPremise(pOrQ);
			proof.addPremise(notP);
			proof.addAssumption(p);
			proof.addAssumption(notQ);
			proof.reiterateStep(3);
			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(1);
			proof.addAssumption(notQ);
			proof.reiterateStep(2);
			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(1);
			proof.addDerivedStep({
				formulas: [negNotQToP, negNotQToNegP],
				rule: NaturalCalculusRule.NI,
				derivedFrom: [6, 9],
			});
			proof.addDerivedStep({
				formulas: [notNotQ],
				rule: NaturalCalculusRule.NE,
				derivedFrom: [10],
			});
			proof.closeSubProof();
			expect(proof.getCurrentLevel()).toBe(0);
			proof.addAssumption(q);
			proof.closeSubProof();
			proof.addDerivedStep({
				formulas: [pOrQ, pToQ, qToQ],
				rule: NaturalCalculusRule.DE,
				derivedFrom: [1, 12, 14],
			});

			// Verify proof properties
			expect(proof.isComplete()).toBe(true);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.getGoal()).toEqual(q);

			// Verify reiteration steps
			const step5 = proof.getStep(5);
			expect(step5?.step).toBe(Step.Reiteration);
			expect(step5?.formula).toEqual(p);

			const step8 = proof.getStep(8);
			expect(step8?.step).toBe(Step.Reiteration);
			expect(step8?.formula).toEqual(notP);

			// Verify final step
			const lastStep = proof.getLastStep();
			expect(lastStep?.formula).toEqual(q);
			expect(lastStep?.step).toBe(Step.Derivation);
			expect(lastStep?.derivedFrom).toEqual([1, 12, 14]);
		});

		it("should have correct step count and maintain proper nesting levels", () => {
			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const pOrQ = createPropFormula(createPropExpression("(p | q)"));
			const notP = createPropFormula(createPropExpression("~p"));
			const notQ = createPropFormula(createPropExpression("~q"));
			const notNotQ = createPropFormula(createPropExpression("~~q"));
			const negNotQToP = createPropFormula(createPropExpression("(~q => p)"));
			const negNotQToNegP = createPropFormula(
				createPropExpression("(~q => ~p)"),
			);
			const pToQ = createPropFormula(createPropExpression("(p => q)"));
			const qToQ = createPropFormula(createPropExpression("(q => q)"));

			const proof = new NaturalProofBuilder(q)
				.addPremise(pOrQ)
				.addPremise(notP)
				.addAssumption(p)
				.addAssumption(notQ)
				.reiterateStep(3)
				.closeSubProof()
				.addAssumption(notQ)
				.reiterateStep(2)
				.closeSubProof()
				.addDerivedStep({
					formulas: [negNotQToP, negNotQToNegP],
					rule: NaturalCalculusRule.NI,
					derivedFrom: [6, 9],
				})
				.addDerivedStep({
					formulas: [notNotQ],
					rule: NaturalCalculusRule.NE,
					derivedFrom: [10],
				})
				.closeSubProof()
				.addAssumption(q)
				.closeSubProof()
				.addDerivedStep({
					formulas: [pOrQ, pToQ, qToQ],
					rule: NaturalCalculusRule.DE,
					derivedFrom: [1, 12, 14],
				})
				.build();

			// Verify final properties
			expect(proof.isComplete()).toBe(true);
			expect(proof.getCurrentLevel()).toBe(0);
			expect(proof.getGoal()).toEqual(q);
			expect(proof.getStepCount()).toBe(15);
		});
	});
});
