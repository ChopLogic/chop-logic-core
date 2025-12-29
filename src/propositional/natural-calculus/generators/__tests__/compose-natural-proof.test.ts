import { NaturalCalculusRule } from "../../../../enums";
import { createPropExpression, createPropFormula } from "../../../builders";
import type { NaturalProofBuilder } from "../../classes/natural-proof-builder";
import { composeNaturalProof } from "../compose-natural-proof";

describe("composeNaturalProof function", () => {
	const A = createPropFormula(createPropExpression("A"));
	const B = createPropFormula(createPropExpression("B"));
	const C = createPropFormula(createPropExpression("C"));
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const implicationBC = createPropFormula(createPropExpression("(B => C)"));

	it("should compose proof from step generators", () => {
		const createPremises = (builder: NaturalProofBuilder) => {
			builder.addPremise(A, "First premise");
			builder.addPremise(B, "Second premise");
		};

		const createAssumption = (builder: NaturalProofBuilder) => {
			builder.addAssumption(C, "Assume C");
		};

		const proof = composeNaturalProof(
			implicationBC,
			createPremises,
			createAssumption,
		);

		expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
		expect(proof.getStep(1)?.formula).toBe(A);
		expect(proof.getStep(2)?.formula).toBe(B);
	});

	it("should compose with multiple generators in order", () => {
		const gen1 = (builder: NaturalProofBuilder) => builder.addPremise(A);
		const gen2 = (builder: NaturalProofBuilder) => builder.addPremise(B);
		const gen3 = (builder: NaturalProofBuilder) => builder.addPremise(C);

		const proof = composeNaturalProof(C, gen1, gen2, gen3);

		expect(proof.getStepCount()).toBe(3);
		expect(proof.isComplete()).toBe(true);
	});

	it("should work with no generators", () => {
		const proof = composeNaturalProof(implicationAB);

		expect(proof.getStepCount()).toBe(0);
		expect(proof.getGoal()).toBe(implicationAB);
	});

	it("should compose proof with sub-proofs", () => {
		const createMainProof = (builder: NaturalProofBuilder) => {
			builder.addAssumption(A, "Assume A");
			builder.addPremise(B, "Given B");
		};

		const closeSubProof = (builder: NaturalProofBuilder) => {
			builder.closeSubProof("A => B");
		};

		const proof = composeNaturalProof(
			implicationAB,
			createMainProof,
			closeSubProof,
		);

		expect(proof.getCurrentLevel()).toBe(0);
		expect(proof.isComplete()).toBe(true);
	});

	it("should compose complex proof with nested sub-proofs", () => {
		const p = createPropFormula(createPropExpression("p"));
		const pToP = createPropFormula(createPropExpression("(p => p)"));

		const createIdentity = (builder: NaturalProofBuilder) => {
			builder.addAssumption(p);
		};

		const closeIdentity = (builder: NaturalProofBuilder) => {
			builder.closeSubProof();
		};

		const proof = composeNaturalProof(pToP, createIdentity, closeIdentity);

		expect(proof.isComplete()).toBe(true);
		expect(proof.getLastStep()?.formula).toEqual(pToP);
	});

	it("should compose with derived steps", () => {
		const conjunctionAB = createPropFormula(createPropExpression("(A & B)"));

		const addPremises = (builder: NaturalProofBuilder) => {
			builder.addPremise(A);
			builder.addPremise(B);
		};

		const deriveConjunction = (builder: NaturalProofBuilder) => {
			builder.addDerivedStep({
				formulas: [A, B],
				rule: NaturalCalculusRule.CI,
				derivedFrom: [1, 2],
			});
		};

		const proof = composeNaturalProof(
			conjunctionAB,
			addPremises,
			deriveConjunction,
		);

		expect(proof.getStepCount()).toBeGreaterThanOrEqual(3);
		expect(proof.getLastStep()?.step).toBe("Derivation");
	});

	it("should compose multiple independent sub-proofs", () => {
		const D = createPropFormula(createPropExpression("D"));
		const E = createPropFormula(createPropExpression("E"));

		const createFirstSubProof = (builder: NaturalProofBuilder) => {
			builder.addAssumption(A);
			builder.addPremise(B);
		};

		const closeFirstSubProof = (builder: NaturalProofBuilder) => {
			builder.closeSubProof();
		};

		const createSecondSubProof = (builder: NaturalProofBuilder) => {
			builder.addAssumption(D);
			builder.addPremise(E);
		};

		const closeSecondSubProof = (builder: NaturalProofBuilder) => {
			builder.closeSubProof();
		};

		const proof = composeNaturalProof(
			implicationAB,
			createFirstSubProof,
			closeFirstSubProof,
			createSecondSubProof,
			closeSecondSubProof,
		);

		expect(proof.getCurrentLevel()).toBe(0);
		expect(proof.getStepCount()).toBeGreaterThanOrEqual(6);
	});
});
