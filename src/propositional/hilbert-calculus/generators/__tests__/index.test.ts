import * as generators from "../index";

describe("hilbert-calculus/generators index", () => {
	it("should export buildHilbertProof", () => {
		expect(generators.buildHilbertProof).toBeDefined();
	});

	it("should export composeHilbertProof", () => {
		expect(generators.composeHilbertProof).toBeDefined();
	});

	it("should export generateHilbertProofStep", () => {
		expect(generators.generateHilbertProofStep).toBeDefined();
	});
});
