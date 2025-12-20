import * as tools from "../index";

describe("hilbert-calculus index", () => {
	it("should export HilbertAxioms", () => {
		expect(tools.HilbertAxioms).toBeDefined();
	});

	it("should export HilbertRules", () => {
		expect(tools.HilbertRules).toBeDefined();
	});

	it("should export HilbertProof", () => {
		expect(tools.HilbertProof).toBeDefined();
	});

	it("should export HilbertProofBuilder", () => {
		expect(tools.HilbertProofBuilder).toBeDefined();
	});

	it("should export buildHilbertProof", () => {
		expect(tools.buildHilbertProof).toBeDefined();
	});

	it("should export composeHilbertProof", () => {
		expect(tools.composeHilbertProof).toBeDefined();
	});

	it("should export generateHilbertProofStep", () => {
		expect(tools.generateHilbertProofStep).toBeDefined();
	});
});
