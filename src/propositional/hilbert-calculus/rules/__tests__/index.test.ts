import * as rules from "../index";

describe("hilbert-calculus/rules index", () => {
	it("should export HilbertRules", () => {
		expect(rules.HilbertRules).toBeDefined();
	});

	it("should have HilbertRules.IE property", () => {
		expect(rules.HilbertRules.IE).toBeDefined();
	});

	it("should have HilbertRules.ID property", () => {
		expect(rules.HilbertRules.ID).toBeDefined();
	});

	it("should have HilbertRules.II property", () => {
		expect(rules.HilbertRules.II).toBeDefined();
	});

	it("should have HilbertRules.II property", () => {
		expect(rules.HilbertRules.II).toBeDefined();
	});

	it("HilbertRules should be frozen", () => {
		expect(Object.isFrozen(rules.HilbertRules)).toBe(true);
	});
});
