import * as classes from "../index";

describe("hilbert-calculus/classes index", () => {
	it("should export HilbertProof", () => {
		expect(classes.HilbertProof).toBeDefined();
	});

	it("should export HilbertProofBuilder", () => {
		expect(classes.HilbertProofBuilder).toBeDefined();
	});
});
