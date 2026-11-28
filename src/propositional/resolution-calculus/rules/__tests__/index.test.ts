import * as rules from "../index";
import { resolutionRule } from "../resolution";

describe("resolution-calculus/rules index", () => {
	it("should export ResolutionRules", () => {
		expect(rules.ResolutionRules).toBeDefined();
	});

	it("should map ResolutionRules.R to resolutionRule", () => {
		expect(rules.ResolutionRules.R).toBe(resolutionRule);
	});

	it("ResolutionRules should be frozen", () => {
		expect(Object.isFrozen(rules.ResolutionRules)).toBe(true);
	});
});
