import * as classesIndex from "../index";
import { NaturalProof } from "../natural-proof";
import { NaturalProofBuilder } from "../natural-proof-builder";

describe("Natural Calculus Classes (index.ts)", () => {
	it("should have NaturalProof class", () => {
		expect(typeof classesIndex.NaturalProof).toBe("function");
		expect(classesIndex.NaturalProof).toBe(NaturalProof);
	});

	it("should have NaturalProofBuilder class", () => {
		expect(typeof classesIndex.NaturalProofBuilder).toBe("function");
		expect(classesIndex.NaturalProofBuilder).toBe(NaturalProofBuilder);
	});

	it("should export exactly two items", () => {
		const exportedItems = Object.keys(classesIndex);
		expect(exportedItems).toHaveLength(2);
		expect(exportedItems).toContain("NaturalProof");
		expect(exportedItems).toContain("NaturalProofBuilder");
	});
});
