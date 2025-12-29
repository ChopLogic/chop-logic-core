import { NaturalCalculusRule } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import { buildNaturalProof } from "../build-natural-proof";

describe("buildNaturalProof function", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));

	it("should create a builder and allow chaining", () => {
		const proof = buildNaturalProof(implicationAB)
			.addAssumption(A, "Assume A")
			.addPremise(B, "Given B")
			.closeSubProof("A => B")
			.build();

		expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
		expect(proof.getGoal()).toBe(implicationAB);
		expect(proof.getCurrentLevel()).toBe(0);
	});

	it("should support fluent API usage", () => {
		const proof = buildNaturalProof(B)
			.addPremise(A, "Given A")
			.addPremise(B, "Given B")
			.build();

		expect(proof.getStepCount()).toBe(2);
		expect(proof.isComplete()).toBe(true);
	});

	it("should support chaining with derived steps", () => {
		const conjunctionAB = createPropFormula(createPropExpression("(A & B)"));

		const proof = buildNaturalProof(conjunctionAB)
			.addPremise(A)
			.addPremise(B)
			.addDerivedStep({
				formulas: [A, B],
				rule: NaturalCalculusRule.CI,
				derivedFrom: [1, 2],
			})
			.build();

		expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
		expect(proof.getLastStep()?.step).toBe("Derivation");
	});

	it("should support nested sub-proofs with fluent API", () => {
		const p = createPropFormula(createPropExpression("p"));
		const q = createPropFormula(createPropExpression("q"));
		const negR = createPropFormula(createPropExpression("~r"));
		const pToQ = createPropFormula(createPropExpression("(p => q)"));
		const qToR = createPropFormula(createPropExpression("(q => r)"));
		const pToNegRToR = createPropFormula(
			createPropExpression("(p => (~r => r))"),
		);

		const proof = buildNaturalProof(pToNegRToR)
			.addPremise(pToQ)
			.addPremise(qToR)
			.addAssumption(p)
			.addDerivedStep({
				formulas: [pToQ, p],
				rule: NaturalCalculusRule.IE,
				derivedFrom: [1, 3],
			})
			.addAssumption(negR)
			.addDerivedStep({
				formulas: [qToR, q],
				rule: NaturalCalculusRule.IE,
				derivedFrom: [2, 4],
			})
			.closeSubProof()
			.closeSubProof()
			.build();

		expect(proof.getCurrentLevel()).toBe(0);
		expect(proof.isComplete()).toBe(true);
	});
});
