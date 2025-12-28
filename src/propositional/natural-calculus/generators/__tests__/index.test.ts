import { buildNaturalProof } from "../build-natural-proof";
import { composeNaturalProof } from "../compose-natural-proof";
import { generateNaturalProofSteps } from "../generate-natural-proof-steps";
import * as generatorsIndex from "../index";

describe("Natural Calculus Generators (index.ts)", () => {
	it("should have buildNaturalProof function", () => {
		expect(typeof generatorsIndex.buildNaturalProof).toBe("function");
		expect(generatorsIndex.buildNaturalProof).toBe(buildNaturalProof);
	});

	it("should have composeNaturalProof function", () => {
		expect(typeof generatorsIndex.composeNaturalProof).toBe("function");
		expect(generatorsIndex.composeNaturalProof).toBe(composeNaturalProof);
	});

	it("should have generateNaturalProofSteps function", () => {
		expect(typeof generatorsIndex.generateNaturalProofSteps).toBe("function");
		expect(generatorsIndex.generateNaturalProofSteps).toBe(
			generateNaturalProofSteps,
		);
	});

	it("should export exactly three functions", () => {
		const exportedItems = Object.keys(generatorsIndex);
		expect(exportedItems).toHaveLength(3);
		expect(exportedItems).toContain("buildNaturalProof");
		expect(exportedItems).toContain("composeNaturalProof");
		expect(exportedItems).toContain("generateNaturalProofSteps");
	});
});
