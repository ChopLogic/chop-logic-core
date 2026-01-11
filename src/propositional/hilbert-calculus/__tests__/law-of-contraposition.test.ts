import { HilbertCalculusRule, Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { HilbertProof } from "../classes/hilbert-proof";
import { HilbertProofBuilder } from "../classes/hilbert-proof-builder";

describe("Law of Contraposition", () => {
	/**
	 * Proof of the law of contraposition:
	 * Given: ¬q => ¬p
	 * Derive: p => q
	 *
	 * Proof sequence:
	 * 1) ¬q => ¬p (Premise - the contrapositive form)
	 * 2) p => q (Derived using IR: applies contraposition directly)
	 */
	it("should prove p => q from premise ¬q => ¬p using Implication Reversal rule", () => {
		const conclusion = createPropFormula(createPropExpression("(p => q)"));
		const contrapositive = createPropFormula(
			createPropExpression("(~q => ~p)"),
		);

		const proof = new HilbertProofBuilder(conclusion)
			.addPremise(contrapositive)
			.addDerivedStep({
				formulas: [contrapositive],
				rule: HilbertCalculusRule.IR,
				derivedFrom: [1],
			})
			.build();

		expect(proof.getStepCount()).toBe(2);
		expect(proof.getGoal()).toEqual(conclusion);
		expect(proof.isComplete()).toBe(true);
		expect(proof.getLastStep()?.formula).toEqual(conclusion);
		expect(proof.getLastStep()?.step).toBe(Step.Derivation);
	});

	it("should prove p => q from premise ¬q => ¬p using HilbertProof class directly", () => {
		const conclusion = createPropFormula(createPropExpression("(p => q)"));
		const contrapositive = createPropFormula(
			createPropExpression("(~q => ~p)"),
		);

		const proof = new HilbertProof(conclusion);

		proof.addPremise(contrapositive);
		proof.addDerivedStep({
			formulas: [contrapositive],
			rule: HilbertCalculusRule.IR,
			derivedFrom: [1],
		});

		expect(proof.getStepCount()).toBe(2);
		expect(proof.getGoal()).toEqual(conclusion);
		expect(proof.isComplete()).toBe(true);
		expect(proof.getLastStep()?.formula).toEqual(conclusion);
		expect(proof.getLastStep()?.step).toBe(Step.Derivation);
	});
});
