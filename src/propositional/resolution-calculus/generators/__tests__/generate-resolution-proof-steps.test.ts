import { Operator, ResolutionCalculusRule, Step } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { generateResolutionProofSteps } from "../generate-resolution-proof-steps";

const v = (name: string): PropFormula => ({
	operator: Operator.Var,
	values: [name],
});
const not = (formula: PropFormula): PropFormula => ({
	operator: Operator.Not,
	values: [formula],
});

const p = v("p");
const q = v("q");
const r = v("r");

describe("generateResolutionProofSteps", () => {
	it("builds a premise step", () => {
		expect(
			generateResolutionProofSteps<Step.Premise>({
				index: 1,
				step: Step.Premise,
				payload: { clause: [not(p), q] },
			}),
		).toEqual([
			{
				index: 1,
				step: Step.Premise,
				clause: [not(p), q],
				stringView: "{¬p, q}",
				comment: "Premise",
			},
		]);
	});

	it("builds a negated goal step", () => {
		expect(
			generateResolutionProofSteps<Step.NegatedGoal>({
				index: 3,
				step: Step.NegatedGoal,
				payload: { clause: [not(r)] },
			}),
		).toEqual([
			{
				index: 3,
				step: Step.NegatedGoal,
				clause: [not(r)],
				stringView: "{¬r}",
				comment: "Negated goal",
			},
		]);
	});

	it("builds a reiteration step with the default comment", () => {
		const [step] = generateResolutionProofSteps<Step.Reiteration>({
			index: 2,
			step: Step.Reiteration,
			payload: { clause: [] },
		});
		expect(step.comment).toBe("Reiteration");
		expect(step.stringView).toBe("{}");
	});

	it("builds a derived step with the resolved literal", () => {
		expect(
			generateResolutionProofSteps<Step.Derivation>({
				index: 3,
				step: Step.Derivation,
				payload: {
					clauses: [
						[p, q],
						[not(q), r],
					],
					rule: ResolutionCalculusRule.R,
					derivedFrom: [1, 2],
				},
			}),
		).toEqual([
			{
				index: 3,
				step: Step.Derivation,
				clause: [p, r],
				stringView: "{p, r}",
				comment: "R: 1, 2",
				derivedFrom: [1, 2],
				resolvedLiteral: q,
			},
		]);
	});

	it("reports the positive literal when the first clause holds the negation", () => {
		const [step] = generateResolutionProofSteps<Step.Derivation>({
			index: 3,
			step: Step.Derivation,
			payload: {
				clauses: [
					[not(q), r],
					[p, q],
				],
				rule: ResolutionCalculusRule.R,
				derivedFrom: [2, 1],
			},
		});
		expect(step.resolvedLiteral).toEqual(q);
		expect(step.comment).toBe("R: 2, 1");
	});

	it("builds one step per resolvent with consecutive indexes", () => {
		const steps = generateResolutionProofSteps<Step.Derivation>({
			index: 5,
			step: Step.Derivation,
			payload: {
				clauses: [
					[p, q],
					[not(p), not(q)],
				],
				rule: ResolutionCalculusRule.R,
				derivedFrom: [1, 2],
			},
		});

		expect(steps.map((step) => step.index)).toEqual([5, 6]);
		expect(steps.map((step) => step.stringView)).toEqual([
			"{q, ¬q}",
			"{p, ¬p}",
		]);
		expect(steps.map((step) => step.resolvedLiteral)).toEqual([p, q]);
	});

	it("throws if resolution is not applicable", () => {
		expect(() =>
			generateResolutionProofSteps<Step.Derivation>({
				index: 3,
				step: Step.Derivation,
				payload: {
					clauses: [[p], [q]],
					rule: ResolutionCalculusRule.R,
					derivedFrom: [1, 2],
				},
			}),
		).toThrow("Resolution is not applicable to the given clauses.");
	});
});
