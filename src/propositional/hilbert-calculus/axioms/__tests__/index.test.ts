import * as axioms from "../index";

describe("hilbert-calculus/axioms index", () => {
	it("should export HilbertAxioms", () => {
		expect(axioms.HilbertAxioms).toBeDefined();
	});

	it("should have HilbertAxioms.II property", () => {
		expect(axioms.HilbertAxioms.II).toBeDefined();
	});

	it("should have HilbertAxioms.ID property", () => {
		expect(axioms.HilbertAxioms.ID).toBeDefined();
	});

	it("should have HilbertAxioms.IR property", () => {
		expect(axioms.HilbertAxioms.IR).toBeDefined();
	});

	it("HilbertAxioms should be frozen", () => {
		expect(Object.isFrozen(axioms.HilbertAxioms)).toBe(true);
	});
});
