import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { ResolutionProof } from "../../classes/resolution-proof";
import type { ResolutionProofBuilder } from "../../classes/resolution-proof-builder";
import { composeResolutionProof } from "../compose-resolution-proof";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const r: PropFormula = { operator: Operator.Var, values: ["r"] };
const pImpliesR: PropFormula = { operator: Operator.Implies, values: [p, r] };

describe("composeResolutionProof", () => {
	it("returns an empty proof without generators", () => {
		const proof = composeResolutionProof(r);
		expect(proof).toBeInstanceOf(ResolutionProof);
		expect(proof.getGoal()).toBe(r);
		expect(proof.getStepCount()).toBe(0);
	});

	it("applies the generators in order", () => {
		const addPremises = (builder: ResolutionProofBuilder) => {
			builder.addPremise(p).addPremise(pImpliesR);
		};
		const refute = (builder: ResolutionProofBuilder) => {
			builder.addNegatedGoal().resolve(1, 2).resolve(3, 4);
		};

		const proof = composeResolutionProof(r, addPremises, refute);

		expect(proof.getSteps().map((step) => step.stringView)).toEqual([
			"{p}",
			"{¬p, r}",
			"{¬r}",
			"{r}",
			"{}",
		]);
		expect(proof.isComplete()).toBe(true);
	});
});
