import {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	Step,
} from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { HilbertProof } from "../classes/hilbert-proof";
import { HilbertProofBuilder } from "../classes/hilbert-proof-builder";

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
				rule: HilbertCalculusRule.IE,
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
				rule: HilbertCalculusRule.IE,
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
			rule: HilbertCalculusRule.IE,
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
			rule: HilbertCalculusRule.IE,
			derivedFrom: [3, 4],
		});

		expect(proof.getStepCount()).toBe(5);
		expect(proof.isComplete()).toBe(true);
		expect(proof.getLastStep()?.formula).toEqual(conclusion);
		expect(proof.getGoal()).toEqual(conclusion);
	});
});
