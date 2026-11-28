import * as classes from "../index";

describe("resolution-calculus/classes index", () => {
	it("should export ResolutionProof", () => {
		expect(classes.ResolutionProof).toBeDefined();
	});

	it("should export ResolutionProofBuilder", () => {
		expect(classes.ResolutionProofBuilder).toBeDefined();
	});
});
