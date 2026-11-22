import { Operator } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { ResolutionProofBuilder } from "../../classes/resolution-proof-builder";
import { buildResolutionProof } from "../build-resolution-proof";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };

describe("buildResolutionProof", () => {
	it("returns a builder for the goal", () => {
		const builder = buildResolutionProof(p);
		expect(builder).toBeInstanceOf(ResolutionProofBuilder);
		expect(builder.build().getGoal()).toStrictEqual(p);
	});

	it("returns a new builder on every call", () => {
		expect(buildResolutionProof(p)).not.toBe(buildResolutionProof(p));
	});

	it("builds a complete proof fluently", () => {
		const proof = buildResolutionProof(p)
			.addPremise(p)
			.addNegatedGoal()
			.resolve(1, 2)
			.build();
		expect(proof.isComplete()).toBe(true);
	});
});
