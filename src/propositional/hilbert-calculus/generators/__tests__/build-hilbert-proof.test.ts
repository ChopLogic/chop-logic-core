import { HilbertCalculusSchema } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { buildHilbertProof } from "../build-hilbert-proof";

describe("buildHilbertProof function", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationAC = createPropFormula(createPropExpression("(A => C)"));

	it("should create a builder and allow chaining", () => {
		const proof = buildHilbertProof(implicationAB)
			.addPremise(A, "Given")
			.addAxiom(
				{
					formulas: [A, B],
					schema: HilbertCalculusSchema.II,
				},
				"Axiom II",
			)
			.build();

		expect(proof.getStepCount()).toBe(2);
		expect(proof.getGoal()).toBe(implicationAB);
	});

	it("should support fluent API usage", () => {
		const proof = buildHilbertProof(implicationAC)
			.addPremise(A)
			.addPremise(B)
			.addPremise(C)
			.build();

		expect(proof.getStepCount()).toBe(3);
	});
});
