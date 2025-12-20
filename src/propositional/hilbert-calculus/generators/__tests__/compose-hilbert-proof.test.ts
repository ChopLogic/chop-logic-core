import { HilbertCalculusSchema } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import type { HilbertProofBuilder } from "../../classes/hilbert-proof-builder";
import { composeHilbertProof } from "../compose-hilbert-proof";

describe("composeHilbertProof function", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationAC = createPropFormula(createPropExpression("(A => C)"));

	it("should compose proof from step generators", () => {
		const createPremises = (builder: HilbertProofBuilder) => {
			builder.addPremise(A, "First");
			builder.addPremise(B, "Second");
		};

		const createAxioms = (builder: HilbertProofBuilder) => {
			builder.addAxiom(
				{
					formulas: [A, B, C],
					schema: HilbertCalculusSchema.II,
				},
				"Axiom",
			);
		};

		const proof = composeHilbertProof(
			implicationAB,
			createPremises,
			createAxioms,
		);

		expect(proof.getStepCount()).toBe(3);
		expect(proof.getStep(1)?.formula).toBe(A);
		expect(proof.getStep(2)?.formula).toBe(B);
	});

	it("should compose with multiple generators in order", () => {
		const gen1 = (builder: HilbertProofBuilder) => builder.addPremise(A);
		const gen2 = (builder: HilbertProofBuilder) => builder.addPremise(B);
		const gen3 = (builder: HilbertProofBuilder) => builder.addPremise(C);

		const proof = composeHilbertProof(implicationAC, gen1, gen2, gen3);

		expect(proof.getStepCount()).toBe(3);
	});

	it("should work with no generators", () => {
		const proof = composeHilbertProof(implicationAB);

		expect(proof.getStepCount()).toBe(0);
		expect(proof.getGoal()).toBe(implicationAB);
	});
});
