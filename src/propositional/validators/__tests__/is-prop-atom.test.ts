import { Operator } from "../../../enums";
import type { PropAtom, PropFormula } from "../../../models";
import { isPropAtom } from "../is-prop-atom";

describe("isPropAtom", () => {
	describe("should return true for valid PropAtom values", () => {
		it("returns true for a single-character variable", () => {
			const atom: PropAtom = ["p"];
			expect(isPropAtom(atom)).toBe(true);
		});

		it("returns true for a multi-character variable name", () => {
			const atom: PropAtom = ["myVariable"];
			expect(isPropAtom(atom)).toBe(true);
		});

		it("returns true for an empty string variable", () => {
			const atom: PropAtom = [""];
			expect(isPropAtom(atom)).toBe(true);
		});

		it("returns true for a variable with special characters", () => {
			const atom: PropAtom = ["x_1"];
			expect(isPropAtom(atom)).toBe(true);
		});
	});

	describe("should return false for invalid values", () => {
		it("returns false for an empty array", () => {
			expect(isPropAtom([])).toBe(false);
		});

		it("returns false for an array with more than one element", () => {
			expect(isPropAtom(["p", "q"])).toBe(false);
		});

		it("returns false for an array with a number", () => {
			expect(isPropAtom([123])).toBe(false);
		});

		it("returns false for an array with null", () => {
			expect(isPropAtom([null])).toBe(false);
		});

		it("returns false for an array with undefined", () => {
			expect(isPropAtom([undefined])).toBe(false);
		});

		it("returns false for an array with an object", () => {
			expect(isPropAtom([{ name: "p" }])).toBe(false);
		});

		it("returns false for an array with a boolean", () => {
			expect(isPropAtom([true])).toBe(false);
		});
	});

	describe("should return false for non-array values", () => {
		it("returns false for null", () => {
			expect(isPropAtom(null)).toBe(false);
		});

		it("returns false for undefined", () => {
			expect(isPropAtom(undefined)).toBe(false);
		});

		it("returns false for a string", () => {
			expect(isPropAtom("p")).toBe(false);
		});

		it("returns false for a number", () => {
			expect(isPropAtom(42)).toBe(false);
		});

		it("returns false for an object", () => {
			expect(isPropAtom({ value: "p" })).toBe(false);
		});

		it("returns false for a PropFormula", () => {
			const formula: PropFormula = {
				operator: Operator.Var,
				values: ["p"],
			};
			expect(isPropAtom(formula)).toBe(false);
		});
	});

	describe("type narrowing", () => {
		it("narrows the type correctly when true", () => {
			const value: unknown = ["p"];
			if (isPropAtom(value)) {
				// TypeScript should recognize value as PropAtom here
				const atomName: string = value[0];
				expect(atomName).toBe("p");
			} else {
				fail("Expected value to be a PropAtom");
			}
		});

		it("correctly distinguishes PropAtom from PropFormula in union", () => {
			const atomValue: PropFormula | PropAtom = ["q"];
			const formulaValue: PropFormula | PropAtom = {
				operator: Operator.Var,
				values: ["q"],
			};

			expect(isPropAtom(atomValue)).toBe(true);
			expect(isPropAtom(formulaValue)).toBe(false);
		});
	});
});
