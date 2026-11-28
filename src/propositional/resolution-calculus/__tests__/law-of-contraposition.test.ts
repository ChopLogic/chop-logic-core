import { Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { ResolutionProof } from "../classes/resolution-proof";
import { ResolutionProofBuilder } from "../classes/resolution-proof-builder";

const formula = (expression: string) =>
	createPropFormula(createPropExpression(expression));

const views = (proof: ResolutionProof) =>
	proof.getSteps().map((step) => step.stringView);

describe("Law of Contraposition (Resolution)", () => {
	/**
	 * Proof of the law of contraposition:
	 * Given: ¬q => ¬p
	 * Derive: p => q
	 *
	 * Proof sequence:
	 * 1) {q, ¬p} (Premise: ¬q => ¬p ≡ q ∨ ¬p)
	 * 2) {p} (Negated goal: ¬(p => q) ≡ p ∧ ¬q)
	 * 3) {¬q} (Negated goal)
	 * 4) {q} (R: 1, 2)
	 * 5) {} (R: 3, 4)
	 */
	it("should prove p => q from premise ¬q => ¬p using ResolutionProofBuilder", () => {
		const conclusion = formula("(p => q)");

		const proof = new ResolutionProofBuilder(conclusion)
			.addPremise(formula("(~q => ~p)"))
			.addNegatedGoal()
			.resolve(1, 2)
			.resolve(3, 4)
			.build();

		expect(views(proof)).toEqual(["{q, ¬p}", "{p}", "{¬q}", "{q}", "{}"]);
		expect(proof.getSteps().map((step) => step.step)).toEqual([
			Step.Premise,
			Step.NegatedGoal,
			Step.NegatedGoal,
			Step.Derivation,
			Step.Derivation,
		]);
		expect(proof.getStep(4)?.comment).toBe("R: 1, 2");
		expect(proof.getStep(4)?.resolvedLiteral).toEqual(formula("p"));
		expect(proof.getStep(5)?.comment).toBe("R: 3, 4");
		expect(proof.getStep(5)?.resolvedLiteral).toEqual(formula("q"));
		expect(proof.getGoal()).toEqual(conclusion);
		expect(proof.isComplete()).toBe(true);
	});

	it("should prove p => q from premise ¬q => ¬p using ResolutionProof class directly", () => {
		const proof = new ResolutionProof(formula("(p => q)"));

		proof.addPremise(formula("(~q => ~p)"));
		proof.addNegatedGoal();
		// Resolve on q first, then on p
		proof.resolve(1, 3);
		expect(proof.getLastStep()?.stringView).toBe("{¬p}");
		expect(proof.isComplete()).toBe(false);
		proof.resolve(2, 4);

		expect(proof.getStepCount()).toBe(5);
		expect(proof.getLastStep()?.stringView).toBe("{}");
		expect(proof.isComplete()).toBe(true);
	});

	/**
	 * The law as a theorem, without premises:
	 * Derive: (p => q) => (¬q => ¬p)
	 *
	 * 1) {¬p, q}  2) {¬q}  3) {p} (Negated goal)
	 * 4) {¬p} (R: 1, 2)
	 * 5) {} (R: 3, 4)
	 */
	it("should prove (p => q) => (¬q => ¬p) without premises", () => {
		const proof = new ResolutionProofBuilder(
			formula("((p => q) => (~q => ~p))"),
		)
			.addNegatedGoal()
			.resolve(1, 2)
			.resolve(3, 4)
			.build();

		expect(views(proof)).toEqual(["{¬p, q}", "{¬q}", "{p}", "{¬p}", "{}"]);
		expect(
			proof
				.getSteps()
				.slice(0, 3)
				.map((step) => step.step),
		).toEqual([Step.NegatedGoal, Step.NegatedGoal, Step.NegatedGoal]);
		expect(proof.isComplete()).toBe(true);
	});

	it("should not prove the converse ¬p => ¬q from p => q", () => {
		const proof = new ResolutionProof(formula("(~p => ~q)"));
		proof.addPremise(formula("(p => q)"));
		proof.addNegatedGoal();

		expect(views(proof)).toEqual(["{¬p, q}", "{¬p}", "{q}"]);

		// No two clauses contain a complementary pair, so the clause set is saturated
		for (const [i, j] of [
			[1, 2],
			[1, 3],
			[2, 3],
		]) {
			expect(() => proof.resolve(i, j)).toThrow(
				"Resolution is not applicable to the given clauses.",
			);
		}
		expect(proof.getStepCount()).toBe(3);
		expect(proof.isComplete()).toBe(false);
	});
});
