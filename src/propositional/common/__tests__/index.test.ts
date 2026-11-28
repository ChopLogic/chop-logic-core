import * as common from "../index";

describe("common index", () => {
	it("should export BaseProof", () => {
		expect(typeof common.BaseProof).toBe("function");
	});

	it("should export replaceAtomInProofStep", () => {
		expect(typeof common.replaceAtomInProofStep).toBe("function");
	});
});
