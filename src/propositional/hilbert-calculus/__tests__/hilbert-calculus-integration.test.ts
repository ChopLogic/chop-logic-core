import { HilbertCalculusSchema, Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { HilbertProof } from "../classes/hilbert-proof";
import { HilbertProofBuilder } from "../classes/hilbert-proof-builder";

describe("Hilbert Calculus Integration Tests", () => {
	describe("Syllogism Law (Transitivity of Implication)", () => {
		/**
		 * Proof of the syllogism law:
		 * Given: p => q and q => r
		 * Derive: p => r
		 *
		 * Proof sequence:
		 * 1) p => q (Premise)
		 * 2) q => r (Premise)
		 * 3) (p => (q => r)) => ((p => q) => (p => r)) (ID - Implication Distribution)
		 * 4) (q => r) => (p => (q => r)) (IC - Implication Introduction)
		 * 5) p => (q => r) (IE: 2,4 - Implication Elimination)
		 * 6) (p => q) => (p => r) (IE: 3,5 - Implication Elimination)
		 * 7) p => r (IE: 1,6 - Implication Elimination)
		 */
		it("should prove p => r from premises p => q and q => r", () => {
			// Create the base formulas
			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const r = createPropFormula(createPropExpression("r"));

			// Create the conclusion: p -> r
			const conclusion = createPropFormula(createPropExpression("(p => r)"));

			// Create the proof
			const proof = new HilbertProofBuilder(conclusion)
				.addPremise(createPropFormula(createPropExpression("(p => q)")))
				.addPremise(createPropFormula(createPropExpression("(q => r)")))
				.addAxiom({
					formulas: [p, q, r],
					schema: HilbertCalculusSchema.ID,
				})
				.addAxiom({
					formulas: [q, p],
					schema: HilbertCalculusSchema.II,
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(q => r)")),
						createPropFormula(
							createPropExpression("((q => r) => (p => (q => r)))"),
						),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [2, 4],
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(p => (q => r))")),
						createPropFormula(
							createPropExpression(
								"((p => (q => r)) => ((p => q) => (p => r)))",
							),
						),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [3, 5],
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(p => q)")),
						createPropFormula(createPropExpression("((p => q) => (p => r))")),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [1, 6],
				})
				.build();

			// Verify the proof structure
			expect(proof.getStepCount()).toBe(7);
			expect(proof.getGoal()).toEqual(conclusion);

			// Verify each step
			const step1 = proof.getStep(1);
			expect(step1?.index).toBe(1);
			expect(step1?.step).toBe(Step.Premise);
			expect(step1?.comment).toBe("Premise");

			const step2 = proof.getStep(2);
			expect(step2?.index).toBe(2);
			expect(step2?.step).toBe(Step.Premise);
			expect(step2?.comment).toBe("Premise");

			const step3 = proof.getStep(3);
			expect(step3?.index).toBe(3);
			expect(step3?.step).toBe(Step.Axiom);
			expect(step3?.comment).toBe("ID");

			const step4 = proof.getStep(4);
			expect(step4?.index).toBe(4);
			expect(step4?.step).toBe(Step.Axiom);
			expect(step4?.comment).toBe("II");

			const step5 = proof.getStep(5);
			expect(step5?.index).toBe(5);
			expect(step5?.step).toBe(Step.Derivation);
			expect(step5?.comment).toBe("IE: 2, 4");
			expect(step5?.derivedFrom).toEqual([2, 4]);

			const step6 = proof.getStep(6);
			expect(step6?.index).toBe(6);
			expect(step6?.step).toBe(Step.Derivation);
			expect(step6?.comment).toBe("IE: 3, 5");
			expect(step6?.derivedFrom).toEqual([3, 5]);

			const step7 = proof.getStep(7);
			expect(step7?.index).toBe(7);
			expect(step7?.step).toBe(Step.Derivation);
			expect(step7?.comment).toBe("IE: 1, 6");
			expect(step7?.derivedFrom).toEqual([1, 6]);
			expect(step7?.formula).toEqual(conclusion);
		});

		it("should prove p => r using HilbertProof class directly", () => {
			const p = createPropFormula(createPropExpression("p"));
			const q = createPropFormula(createPropExpression("q"));
			const r = createPropFormula(createPropExpression("r"));
			const conclusion = createPropFormula(createPropExpression("(p => r)"));

			const proof = new HilbertProof(conclusion);

			proof.addPremise(createPropFormula(createPropExpression("(p => q)")));
			proof.addPremise(createPropFormula(createPropExpression("(q => r)")));
			proof.addAxiom({
				formulas: [p, q, r],
				schema: HilbertCalculusSchema.ID,
			});
			proof.addAxiom({
				formulas: [q, p],
				schema: HilbertCalculusSchema.II,
			});
			expect(proof.isComplete()).toBe(false);
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(q => r)")),
					createPropFormula(
						createPropExpression("((q => r) => (p => (q => r)))"),
					),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [2, 4],
			});
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(p => (q => r))")),
					createPropFormula(
						createPropExpression("((p => (q => r)) => ((p => q) => (p => r)))"),
					),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [3, 5],
			});
			expect(proof.isComplete()).toBe(false);
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(p => q)")),
					createPropFormula(createPropExpression("((p => q) => (p => r))")),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [1, 6],
			});

			expect(proof.getStepCount()).toBe(7);
			expect(proof.isComplete()).toBe(true);
			expect(proof.getLastStep()?.formula).toEqual(conclusion);
			expect(proof.getGoal()).toEqual(conclusion);
		});
	});

	describe("Law of Tautology", () => {
		/**
		 * Proof of the law of tautology:
		 * Derive: p => p without any premises
		 *
		 * Proof sequence:
		 * 1) (p => ((p => p) => p)) => ((p => (p => p)) => (p => p)) (ID)
		 * 2) p => ((p => p) => p) (II)
		 * 3) (p => (p => p)) => (p => p) (IE: 1,2)
		 * 4) p => (p => p) (II)
		 * 5) p => p (IE: 3,4)
		 */
		it("should prove p => p without premises", () => {
			const p = createPropFormula(createPropExpression("p"));
			const conclusion = createPropFormula(createPropExpression("(p => p)"));

			const proof = new HilbertProofBuilder(conclusion)
				.addAxiom({
					formulas: [p, p, p],
					schema: HilbertCalculusSchema.ID,
				})
				.addAxiom({
					formulas: [p, p],
					schema: HilbertCalculusSchema.II,
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(p => ((p => p) => p))")),
						createPropFormula(
							createPropExpression(
								"((p => ((p => p) => p)) => ((p => (p => p)) => (p => p)))",
							),
						),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [1, 2],
				})
				.addAxiom({
					formulas: [p, p],
					schema: HilbertCalculusSchema.II,
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(p => (p => p))")),
						createPropFormula(
							createPropExpression("((p => (p => p)) => (p => p))"),
						),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [3, 4],
				})
				.build();

			// Verify the proof structure
			expect(proof.getStepCount()).toBe(5);
			expect(proof.getGoal()).toEqual(conclusion);

			// Verify each step
			const step1 = proof.getStep(1);
			expect(step1?.index).toBe(1);
			expect(step1?.step).toBe(Step.Axiom);
			expect(step1?.comment).toBe("ID");

			const step2 = proof.getStep(2);
			expect(step2?.index).toBe(2);
			expect(step2?.step).toBe(Step.Axiom);
			expect(step2?.comment).toBe("II");

			const step3 = proof.getStep(3);
			expect(step3?.index).toBe(3);
			expect(step3?.step).toBe(Step.Derivation);
			expect(step3?.comment).toBe("IE: 1, 2");
			expect(step3?.derivedFrom).toEqual([1, 2]);

			const step4 = proof.getStep(4);
			expect(step4?.index).toBe(4);
			expect(step4?.step).toBe(Step.Axiom);
			expect(step4?.comment).toBe("II");

			const step5 = proof.getStep(5);
			expect(step5?.index).toBe(5);
			expect(step5?.step).toBe(Step.Derivation);
			expect(step5?.comment).toBe("IE: 3, 4");
			expect(step5?.derivedFrom).toEqual([3, 4]);
			expect(step5?.formula).toEqual(conclusion);
		});

		it("should prove p => p using HilbertProof class directly", () => {
			const p = createPropFormula(createPropExpression("p"));
			const conclusion = createPropFormula(createPropExpression("(p => p)"));

			const proof = new HilbertProof(conclusion);

			proof.addAxiom({
				formulas: [p, p, p],
				schema: HilbertCalculusSchema.ID,
			});
			proof.addAxiom({
				formulas: [p, p],
				schema: HilbertCalculusSchema.II,
			});
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(p => ((p => p) => p))")),
					createPropFormula(
						createPropExpression(
							"((p => ((p => p) => p)) => ((p => (p => p)) => (p => p)))",
						),
					),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [1, 2],
			});
			expect(proof.isComplete()).toBe(false);
			proof.addAxiom({
				formulas: [p, p],
				schema: HilbertCalculusSchema.II,
			});
			expect(proof.isComplete()).toBe(false);
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(p => (p => p))")),
					createPropFormula(
						createPropExpression("((p => (p => p)) => (p => p))"),
					),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [3, 4],
			});

			expect(proof.getStepCount()).toBe(5);
			expect(proof.isComplete()).toBe(true);
			expect(proof.getLastStep()?.formula).toEqual(conclusion);
			expect(proof.getGoal()).toEqual(conclusion);
		});
	});

	describe("Law of Removal of Double Negation", () => {
		/**
		 * Proof of the law of removal of double negation:
		 * Given: ¬¬p (double negation of p)
		 * Derive: p
		 *
		 * Proof sequence:
		 * 1) ¬¬p (Premise)
		 * 2) (¬p → ¬¬p) → ((¬p → ¬p) → p) (IR)
		 * 3) (¬p → (¬¬p → ¬p)) → ((¬p → ¬¬p) → (¬p → ¬p)) (ID)
		 * 4) ¬p → (¬¬p → ¬p) (II)
		 * 5) (¬p → ¬¬p) → (¬p → ¬p) (IE: 4,3)
		 * 6) ¬¬p → (¬p → ¬¬p) (II)
		 * 7) ¬p → ¬¬p (IE: 1,6)
		 * 8) ¬p → ¬p (IE: 5,7)
		 * 9) (¬p → ¬p) → p (IE: 2,7)
		 * 10) p (IE: 8,9)
		 */
		it("should prove p from premise ¬¬p using HilbertProofBuilder", () => {
			const p = createPropFormula(createPropExpression("p"));
			const notP = createPropFormula(createPropExpression("~p"));
			const notNotP = createPropFormula(createPropExpression("~~p"));
			const conclusion = p;

			const proof = new HilbertProofBuilder(conclusion)
				.addPremise(notNotP)
				.addAxiom({
					formulas: [notP, notNotP, p],
					schema: HilbertCalculusSchema.IR,
				})
				.addAxiom({
					formulas: [notP, notNotP, notP],
					schema: HilbertCalculusSchema.ID,
				})
				.addAxiom({
					formulas: [notP, notNotP],
					schema: HilbertCalculusSchema.II,
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(~p => (~~p => ~p))")),
						createPropFormula(
							createPropExpression(
								"((~p => (~~p => ~p)) => ((~p => ~~p) => (~p => ~p)))",
							),
						),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [4, 3],
				})
				.addAxiom({
					formulas: [notNotP, notP],
					schema: HilbertCalculusSchema.II,
				})
				.addDerivedStep({
					formulas: [
						notNotP,
						createPropFormula(createPropExpression("(~~p => (~p => ~~p))")),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [1, 6],
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(
							createPropExpression("((~p => ~~p) => (~p => ~p))"),
						),
						createPropFormula(createPropExpression("(~p => ~~p)")),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [5, 7],
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(
							createPropExpression("((~p => ~~p) => ((~p => ~p) => p))"),
						),
						createPropFormula(createPropExpression("(~p => ~~p)")),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [2, 7],
				})
				.addDerivedStep({
					formulas: [
						createPropFormula(createPropExpression("(~p => ~p)")),
						createPropFormula(createPropExpression("((~p => ~p) => p)")),
					],
					schema: HilbertCalculusSchema.IE,
					derivedFrom: [8, 9],
				})
				.build();

			expect(proof.getStepCount()).toBe(10);
			expect(proof.getGoal()).toEqual(conclusion);
			expect(proof.isComplete()).toBe(true);
			expect(proof.getLastStep()?.formula).toEqual(conclusion);
		});

		it("should prove p from premise ¬¬p using HilbertProof class directly", () => {
			const p = createPropFormula(createPropExpression("p"));
			const notP = createPropFormula(createPropExpression("~p"));
			const notNotP = createPropFormula(createPropExpression("~~p"));

			const proof = new HilbertProof(p);

			proof.addPremise(notNotP);
			proof.addAxiom({
				formulas: [notP, notNotP, p],
				schema: HilbertCalculusSchema.IR,
			});
			proof.addAxiom({
				formulas: [notP, notNotP, notP],
				schema: HilbertCalculusSchema.ID,
			});
			proof.addAxiom({
				formulas: [notP, notNotP],
				schema: HilbertCalculusSchema.II,
			});
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(~p => (~~p => ~p))")),
					createPropFormula(
						createPropExpression(
							"((~p => (~~p => ~p)) => ((~p => ~~p) => (~p => ~p)))",
						),
					),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [4, 3],
			});
			proof.addAxiom({
				formulas: [notNotP, notP],
				schema: HilbertCalculusSchema.II,
			});
			proof.addDerivedStep({
				formulas: [
					notNotP,
					createPropFormula(createPropExpression("(~~p => (~p => ~~p))")),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [1, 6],
			});
			proof.addDerivedStep({
				formulas: [
					createPropFormula(
						createPropExpression("((~p => ~~p) => (~p => ~p))"),
					),
					createPropFormula(createPropExpression("(~p => ~~p)")),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [5, 7],
			});
			proof.addDerivedStep({
				formulas: [
					createPropFormula(
						createPropExpression("((~p => ~~p) => ((~p => ~p) => p))"),
					),
					createPropFormula(createPropExpression("(~p => ~~p)")),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [2, 7],
			});
			proof.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(~p => ~p)")),
					createPropFormula(createPropExpression("((~p => ~p) => p)")),
				],
				schema: HilbertCalculusSchema.IE,
				derivedFrom: [8, 9],
			});

			expect(proof.getStepCount()).toBe(10);
			expect(proof.getGoal()).toEqual(p);
			expect(proof.isComplete()).toBe(true);
			expect(proof.getLastStep()?.formula).toEqual(p);
		});
	});
});
