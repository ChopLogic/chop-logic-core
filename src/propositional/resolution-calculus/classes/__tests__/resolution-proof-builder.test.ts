import { Operator, Step } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { ResolutionProof } from "../resolution-proof";
import { ResolutionProofBuilder } from "../resolution-proof-builder";

const v = (name: string): PropFormula => ({
	operator: Operator.Var,
	values: [name],
});
const not = (formula: PropFormula): PropFormula => ({
	operator: Operator.Not,
	values: [formula],
});
const implies = (a: PropFormula, b: PropFormula): PropFormula => ({
	operator: Operator.Implies,
	values: [a, b],
});

const p = v("p");
const q = v("q");
const r = v("r");

describe("ResolutionProofBuilder", () => {
	it("builds a ResolutionProof with the goal", () => {
		const proof = new ResolutionProofBuilder(r).build();
		expect(proof).toBeInstanceOf(ResolutionProof);
		expect(proof.getGoal()).toStrictEqual(r);
	});

	it("chains every step method", () => {
		const builder = new ResolutionProofBuilder(r);
		const result = builder
			.addPremise(p, "P")
			.addPremiseClause([not(p), q], "PQ")
			.addPremise(implies(q, r))
			.addNegatedGoal("NG")
			.resolve(1, 2, "MP")
			.resolve(3, 5)
			.resolve(4, 6)
			.reiterateStep(7, "Again");

		expect(result).toBe(builder);

		const steps = builder.build().getSteps();
		expect(steps.map((step) => step.stringView)).toEqual([
			"{p}",
			"{¬p, q}",
			"{¬q, r}",
			"{¬r}",
			"{q}",
			"{r}",
			"{}",
			"{}",
		]);
		expect(steps.map((step) => step.comment)).toEqual([
			"P",
			"PQ",
			"Premise",
			"NG",
			"MP",
			"R: 3, 5",
			"R: 4, 6",
			"Again",
		]);
		expect(steps[3].step).toBe(Step.NegatedGoal);
		expect(builder.build().isComplete()).toBe(true);
	});

	it("replaces atoms through the builder", () => {
		const proof = new ResolutionProofBuilder(r)
			.addPremiseClause([p])
			.replace(["p"], ["s"])
			.build();
		expect(proof.getStep(1)?.stringView).toBe("{s}");
	});

	it("runs buildSteps with the builder itself", () => {
		const builder = new ResolutionProofBuilder(r);
		const callback = jest.fn((b: ResolutionProofBuilder) => {
			b.addPremise(p);
		});

		expect(builder.buildSteps(callback)).toBe(builder);
		expect(callback).toHaveBeenCalledWith(builder);
		expect(builder.preview().getStepCount()).toBe(1);
	});

	it("preview returns the same proof instance as build", () => {
		const builder = new ResolutionProofBuilder(r);
		expect(builder.preview()).toBe(builder.build());
	});

	it("propagates errors from the proof", () => {
		const builder = new ResolutionProofBuilder(r).addNegatedGoal();
		expect(() => builder.addNegatedGoal()).toThrow(
			"The negated goal has already been added to the proof.",
		);
		expect(() => builder.resolve(1, 2)).toThrow(
			"Cannot resolve: step 2 not found in proof",
		);
		expect(() => builder.reiterateStep(5)).toThrow(
			"Cannot reiterate: step 5 not found in proof",
		);
		expect(() => builder.addPremiseClause([implies(p, q)])).toThrow(
			"Invalid clause: a clause must contain only literals (p or ¬p).",
		);
	});
});
