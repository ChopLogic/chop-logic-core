import { Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { ResolutionProof } from "../classes/resolution-proof";
import { ResolutionProofBuilder } from "../classes/resolution-proof-builder";

const formula = (expression: string) =>
	createPropFormula(createPropExpression(expression));

describe("Law of Tautology (Resolution)", () => {
	/**
	 * Proof of the law of tautology:
	 * Derive: p => p without any premises
	 *
	 * Negated goal: ¬(p => p) ≡ p ∧ ¬p
	 *
	 * Proof sequence:
	 * 1) {p} (Negated goal)
	 * 2) {¬p} (Negated goal)
	 * 3) {} (R: 1, 2)
	 */
	it("should prove p => p without premises using ResolutionProofBuilder", () => {
		const conclusion = formula("(p => p)");

		const proof = new ResolutionProofBuilder(conclusion)
			.addNegatedGoal()
			.resolve(1, 2)
			.build();

		expect(proof.getStepCount()).toBe(3);
		expect(proof.getGoal()).toEqual(conclusion);

		const step1 = proof.getStep(1);
		expect(step1?.step).toBe(Step.NegatedGoal);
		expect(step1?.stringView).toBe("{p}");
		expect(step1?.comment).toBe("Negated goal");

		const step2 = proof.getStep(2);
		expect(step2?.step).toBe(Step.NegatedGoal);
		expect(step2?.stringView).toBe("{¬p}");

		const step3 = proof.getStep(3);
		expect(step3?.step).toBe(Step.Derivation);
		expect(step3?.clause).toEqual([]);
		expect(step3?.stringView).toBe("{}");
		expect(step3?.comment).toBe("R: 1, 2");
		expect(step3?.derivedFrom).toEqual([1, 2]);
		expect(step3?.resolvedLiteral).toEqual(formula("p"));

		expect(proof.isComplete()).toBe(true);
	});

	it("should prove p => p using ResolutionProof class directly", () => {
		const conclusion = formula("(p => p)");
		const proof = new ResolutionProof(conclusion);

		expect(proof.isComplete()).toBe(false);
		proof.addNegatedGoal();
		expect(proof.isComplete()).toBe(false);
		proof.resolve(2, 1);

		expect(proof.getStepCount()).toBe(3);
		expect(proof.getLastStep()?.comment).toBe("R: 2, 1");
		expect(proof.hasEmptyClause()).toBe(true);
		expect(proof.isComplete()).toBe(true);
	});

	it("should keep the tautological clause {¬p, p} when p => p is a premise", () => {
		const proof = new ResolutionProof(formula("q"));
		const [step] = proof.addPremise(formula("(p => p)"));

		expect(step.stringView).toBe("{¬p, p}");
	});

	it("should only produce tautologies when resolving {¬p, p} with itself", () => {
		const proof = new ResolutionProof(formula("q"));
		proof.addPremise(formula("(p => p)"));
		const resolvents = proof.resolve(1, 1);

		expect(resolvents.map((step) => step.stringView)).toEqual([
			"{p, ¬p}",
			"{¬p, p}",
		]);
		expect(proof.hasEmptyClause()).toBe(false);
	});

	it("should not prove q from the tautology p => p", () => {
		const proof = new ResolutionProof(formula("q"));
		proof.addPremise(formula("(p => p)"));
		proof.addNegatedGoal();

		expect(proof.getSteps().map((step) => step.stringView)).toEqual([
			"{¬p, p}",
			"{¬q}",
		]);
		expect(() => proof.resolve(1, 2)).toThrow(
			"Resolution is not applicable to the given clauses.",
		);
		expect(proof.isComplete()).toBe(false);
	});
});
