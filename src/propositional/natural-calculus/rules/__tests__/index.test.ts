import { NaturalRules } from "../index";

describe("Natural Calculus Rules (index.ts)", () => {
	it("should have NaturalRules object as a frozen object", () => {
		expect(typeof NaturalRules).toBe("object");
		expect(NaturalRules).not.toBeNull();
		expect(Object.isFrozen(NaturalRules)).toBe(true);
	});

	describe("Introduction rules", () => {
		it("should have negation introduction rule (NI)", () => {
			expect(typeof NaturalRules.NI).toBe("function");
		});

		it("should have conjunction introduction rule (CI)", () => {
			expect(typeof NaturalRules.CI).toBe("function");
		});

		it("should have disjunction introduction rule (DI)", () => {
			expect(typeof NaturalRules.DI).toBe("function");
		});

		it("should have implication introduction rule (II)", () => {
			expect(typeof NaturalRules.II).toBe("function");
		});

		it("should have equivalence introduction rule (EI)", () => {
			expect(typeof NaturalRules.EI).toBe("function");
		});
	});

	describe("Elimination rules", () => {
		it("should have negation elimination rule (NE)", () => {
			expect(typeof NaturalRules.NE).toBe("function");
		});

		it("should have conjunction elimination rule (CE)", () => {
			expect(typeof NaturalRules.CE).toBe("function");
		});

		it("should have disjunction elimination rule (DE)", () => {
			expect(typeof NaturalRules.DE).toBe("function");
		});

		it("should have implication elimination rule (IE)", () => {
			expect(typeof NaturalRules.IE).toBe("function");
		});

		it("should have equivalence elimination rule (EE)", () => {
			expect(typeof NaturalRules.EE).toBe("function");
		});
	});

	it("should contain exactly 10 rules", () => {
		const ruleKeys = Object.keys(NaturalRules);
		expect(ruleKeys).toHaveLength(10);
	});

	it("should contain all expected rule abbreviations", () => {
		const ruleKeys = Object.keys(NaturalRules);
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
