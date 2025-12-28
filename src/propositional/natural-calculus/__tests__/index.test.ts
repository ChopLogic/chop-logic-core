import * as classesIndex from "../classes/index";
import * as generatorsIndex from "../generators/index";
import * as naturalCalculus from "../index";
import { NaturalRules } from "../rules/index";

describe("Natural Calculus Module (index.ts)", () => {
	describe("Classes exports", () => {
		it("should have NaturalProof class", () => {
			expect(typeof naturalCalculus.NaturalProof).toBe("function");
			expect(naturalCalculus.NaturalProof).toBe(classesIndex.NaturalProof);
		});

		it("should have NaturalProofBuilder class", () => {
			expect(typeof naturalCalculus.NaturalProofBuilder).toBe("function");
			expect(naturalCalculus.NaturalProofBuilder).toBe(
				classesIndex.NaturalProofBuilder,
			);
		});
	});

	describe("Generators exports", () => {
		it("should have buildNaturalProof function", () => {
			expect(typeof naturalCalculus.buildNaturalProof).toBe("function");
			expect(naturalCalculus.buildNaturalProof).toBe(
				generatorsIndex.buildNaturalProof,
			);
		});

		it("should have composeNaturalProof function", () => {
			expect(typeof naturalCalculus.composeNaturalProof).toBe("function");
			expect(naturalCalculus.composeNaturalProof).toBe(
				generatorsIndex.composeNaturalProof,
			);
		});

		it("should have generateNaturalProofSteps function", () => {
			expect(typeof naturalCalculus.generateNaturalProofSteps).toBe("function");
			expect(naturalCalculus.generateNaturalProofSteps).toBe(
				generatorsIndex.generateNaturalProofSteps,
			);
		});
	});

	describe("Rules exports", () => {
		it("should have NaturalRules object", () => {
			expect(typeof naturalCalculus.NaturalRules).toBe("object");
			expect(naturalCalculus.NaturalRules).toBe(NaturalRules);
		});

		it("should have all 10 natural deduction rules", () => {
			const ruleKeys = Object.keys(naturalCalculus.NaturalRules);
			expect(ruleKeys).toHaveLength(10);
			const expectedRules = [
				"NI",
				"CI",
				"DI",
				"II",
				"EI",
				"NE",
				"CE",
				"DE",
				"IE",
				"EE",
			];
			expect(ruleKeys.sort()).toEqual(expectedRules.sort());
		});
	});

	it("should export all classes, generators, and rules", () => {
		const exportedItems = Object.keys(naturalCalculus);
		expect(exportedItems).toContain("NaturalProof");
		expect(exportedItems).toContain("NaturalProofBuilder");
		expect(exportedItems).toContain("buildNaturalProof");
		expect(exportedItems).toContain("composeNaturalProof");
		expect(exportedItems).toContain("generateNaturalProofSteps");
		expect(exportedItems).toContain("NaturalRules");
	});

	it("should export exactly 6 items", () => {
		const exportedItems = Object.keys(naturalCalculus);
		expect(exportedItems).toHaveLength(6);
	});
});
