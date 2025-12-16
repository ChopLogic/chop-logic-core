import { createPropExpression, createPropFormula } from "../../../builders";
import { buildHilbertProof } from "../build-hilbert-proof";
import { extendHilbertProof } from "../extend-hilbert-proof";

describe("extendHilbertProof function", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));

	it("should extend an existing proof with new steps", () => {
		const basePath = buildHilbertProof(implicationAB)
			.addPremise(A, "Base premise")
			.build();

		const extended = extendHilbertProof(basePath, (builder) => {
			builder.addPremise(B, "Extended premise");
		});

		expect(extended.getStepCount()).toBe(2);
	});

	it("should preserve goal and existing steps", () => {
		const basePath = buildHilbertProof(implicationAB)
			.addPremise(A)
			.addPremise(B)
			.build();

		const extended = extendHilbertProof(basePath, (builder) => {
			builder.addPremise(C);
		});

		expect(extended.getGoal()).toBe(implicationAB);
		expect(extended.getStepCount()).toBe(3);
	});
});
