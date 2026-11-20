import * as generators from "../index";

describe("resolution-calculus/generators index", () => {
	it("should export buildResolutionProof", () => {
		expect(generators.buildResolutionProof).toBeDefined();
	});

	it("should export composeResolutionProof", () => {
		expect(generators.composeResolutionProof).toBeDefined();
	});

	it("should export generateResolutionProofSteps", () => {
		expect(generators.generateResolutionProofSteps).toBeDefined();
	});
});
