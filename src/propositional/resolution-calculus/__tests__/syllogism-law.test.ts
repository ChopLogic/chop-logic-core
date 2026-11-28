import { Step } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { ResolutionProof } from "../classes/resolution-proof";
import { ResolutionProofBuilder } from "../classes/resolution-proof-builder";

const formula = (expression: string) =>
	createPropFormula(createPropExpression(expression));

const views = (proof: ResolutionProof) =>
	proof.getSteps().map((step) => step.stringView);

describe("Syllogism Law (Transitivity of Implication, Resolution)", () => {
	/**
	 * Proof of the syllogism law:
	 * Given: p => q and q => r
	 * Derive: p => r
	 *
	 * Proof sequence:
	 * 1) {¬p, q} (Premise)
	 * 2) {¬q, r} (Premise)
	 * 3) {p} (Negated goal: ¬(p => r) ≡ p ∧ ¬r)
	 * 4) {¬r} (Negated goal)
	 * 5) {q} (R: 1, 3)
	 * 6) {r} (R: 2, 5)
	 * 7) {} (R: 4, 6)
	 */
	it("should prove p => r from premises p => q and q => r", () => {
		const conclusion = formula("(p => r)");

		const proof = new ResolutionProofBuilder(conclusion)
			.addPremise(formula("(p => q)"))
			.addPremise(formula("(q => r)"))
			.addNegatedGoal()
			.resolve(1, 3)
			.resolve(2, 5)
			.resolve(4, 6)
			.build();

		expect(proof.getStepCount()).toBe(7);
		expect(proof.getGoal()).toEqual(conclusion);
		expect(views(proof)).toEqual([
			"{¬p, q}",
			"{¬q, r}",
			"{p}",
			"{¬r}",
			"{q}",
			"{r}",
			"{}",
		]);
		expect(proof.getSteps().map((step) => step.step)).toEqual([
			Step.Premise,
			Step.Premise,
			Step.NegatedGoal,
			Step.NegatedGoal,
			Step.Derivation,
			Step.Derivation,
			Step.Derivation,
		]);
		expect(proof.getSteps().map((step) => step.comment)).toEqual([
			"Premise",
			"Premise",
			"Negated goal",
			"Negated goal",
			"R: 1, 3",
			"R: 2, 5",
			"R: 4, 6",
		]);
		expect(proof.getSteps().map((step) => step.derivedFrom)).toEqual([
			undefined,
			undefined,
			undefined,
			undefined,
			[1, 3],
			[2, 5],
			[4, 6],
		]);
		expect(proof.isComplete()).toBe(true);
	});

	/**
	 * Resolving the premises first derives the syllogism itself as a clause:
	 * 5) {¬p, r} (R: 1, 2) — the clausal form of p => r
	 * 6) {r} (R: 3, 5)
	 * 7) {} (R: 4, 6)
	 */
	it("should prove p => r using ResolutionProof class directly, resolving the premises first", () => {
		const conclusion = formula("(p => r)");
		const proof = new ResolutionProof(conclusion);

		proof.addPremise(formula("(p => q)"));
		proof.addPremise(formula("(q => r)"));

		const [syllogism] = proof.resolve(1, 2);
		expect(syllogism.clause).toEqual([formula("~p"), formula("r")]);
		expect(syllogism.resolvedLiteral).toEqual(formula("q"));
		expect(proof.isComplete()).toBe(false);

		proof.addNegatedGoal();
		expect(proof.isComplete()).toBe(false);
		proof.resolve(4, 3);
		proof.resolve(5, 6);

		expect(views(proof)).toEqual([
			"{¬p, q}",
			"{¬q, r}",
			"{¬p, r}",
			"{p}",
			"{¬r}",
			"{r}",
			"{}",
		]);
		expect(proof.getStepCount()).toBe(7);
		expect(proof.isComplete()).toBe(true);
	});

	it("should prove ((p => q) ∧ (q => r)) => (p => r) without premises", () => {
		const proof = new ResolutionProofBuilder(
			formula("(((p => q) & (q => r)) => (p => r))"),
		)
			.addNegatedGoal()
			.resolve(1, 3)
			.resolve(2, 5)
			.resolve(4, 6)
			.build();

		expect(views(proof)).toEqual([
			"{¬p, q}",
			"{¬q, r}",
			"{p}",
			"{¬r}",
			"{q}",
			"{r}",
			"{}",
		]);
		expect(proof.isComplete()).toBe(true);
	});

	it("should not prove r => p from premises p => q and q => r", () => {
		const proof = new ResolutionProof(formula("(r => p)"));
		proof.addPremise(formula("(p => q)"));
		proof.addPremise(formula("(q => r)"));
		proof.addNegatedGoal();

		expect(views(proof)).toEqual(["{¬p, q}", "{¬q, r}", "{r}", "{¬p}"]);

		// The only applicable resolution yields {¬p, r}, which resolves with nothing new
		proof.resolve(1, 2);
		expect(proof.getLastStep()?.stringView).toBe("{¬p, r}");
		expect(() => proof.resolve(5, 3)).toThrow(
			"Resolution is not applicable to the given clauses.",
		);
		expect(() => proof.resolve(5, 4)).toThrow(
			"Resolution is not applicable to the given clauses.",
		);
		expect(proof.hasEmptyClause()).toBe(false);
		expect(proof.isComplete()).toBe(false);
	});
});
