import { Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { ResolutionProof } from "../classes/resolution-proof";
import { ResolutionProofBuilder } from "../classes/resolution-proof-builder";

const formula = (expression: string) =>
	createPropFormula(createPropExpression(expression));

const views = (proof: ResolutionProof) =>
	proof.getSteps().map((step) => step.stringView);

describe("Law of Removal of Double Negation (Resolution)", () => {
	/**
	 * Proof of the law of removal of double negation:
	 * Given: ¬¬p
	 * Derive: p
	 *
	 * The clausal form conversion removes the double negation, so the
	 * ten-step Hilbert proof collapses into a single resolution step.
	 *
	 * Proof sequence:
	 * 1) {p} (Premise: ¬¬p ≡ p)
	 * 2) {¬p} (Negated goal)
	 * 3) {} (R: 1, 2)
	 */
	it("should prove p from premise ¬¬p using ResolutionProofBuilder", () => {
		const p = formula("p");

		const proof = new ResolutionProofBuilder(p)
			.addPremise(formula("~~p"))
			.addNegatedGoal()
			.resolve(1, 2)
			.build();

		expect(views(proof)).toEqual(["{p}", "{¬p}", "{}"]);
		expect(proof.getStep(1)?.step).toBe(Step.Premise);
		expect(proof.getStep(1)?.clause).toEqual([p]);
		expect(proof.getStep(2)?.step).toBe(Step.NegatedGoal);
		expect(proof.getStep(3)?.comment).toBe("R: 1, 2");
		expect(proof.getGoal()).toEqual(p);
		expect(proof.isComplete()).toBe(true);
	});

	it("should prove p from premise ¬¬p using ResolutionProof class directly", () => {
		const p = formula("p");
		const proof = new ResolutionProof(p);

		const [premise] = proof.addPremise(formula("~~p"));
		expect(premise.stringView).toBe("{p}");
		expect(proof.isComplete()).toBe(false);

		proof.addNegatedGoal();
		const [derived] = proof.resolve(1, 2);

		expect(derived.clause).toEqual([]);
		expect(derived.resolvedLiteral).toEqual(p);
		expect(proof.getStepCount()).toBe(3);
		expect(proof.isComplete()).toBe(true);
	});

	it("should prove ¬¬p => p without premises", () => {
		const proof = new ResolutionProofBuilder(formula("(~~p => p)"))
			.addNegatedGoal()
			.resolve(1, 2)
			.build();

		expect(views(proof)).toEqual(["{p}", "{¬p}", "{}"]);
		expect(proof.isComplete()).toBe(true);
	});

	it("should prove the introduction of double negation p => ¬¬p without premises", () => {
		const proof = new ResolutionProofBuilder(formula("(p => ~~p)"))
			.addNegatedGoal()
			.resolve(1, 2)
			.build();

		expect(views(proof)).toEqual(["{p}", "{¬p}", "{}"]);
		expect(proof.isComplete()).toBe(true);
	});

	it("should prove ¬¬p from premise p", () => {
		const proof = new ResolutionProofBuilder(formula("~~p"))
			.addPremise(formula("p"))
			.addNegatedGoal()
			.resolve(1, 2)
			.build();

		// ¬¬¬p is converted to the single literal ¬p
		expect(views(proof)).toEqual(["{p}", "{¬p}", "{}"]);
		expect(proof.isComplete()).toBe(true);
	});
});
