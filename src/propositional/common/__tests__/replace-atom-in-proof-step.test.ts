import { Step } from "../../../enums";
import type { PropProofStep } from "../../../models";
import { createPropExpression, createPropFormula } from "../../builders";
import { convertPropFormulaToExpression } from "../../converters";
import { replaceAtomInProofStep } from "../replace-atom-in-proof-step";

describe("replaceAtomInProofStep", () => {
	const implicationAB = createPropFormula(createPropExpression("(A => B)"));
	const conjunctionCD = createPropFormula(createPropExpression("(C & D)"));

	const createStep = (): PropProofStep => ({
		index: 3,
		step: Step.Derivation,
		formula: implicationAB,
		expression: convertPropFormulaToExpression(implicationAB),
		stringView: "(A => B)",
		comment: "Some comment",
		derivedFrom: [1, 2],
		level: 1,
		assumptionIndex: 2,
	});

	it("should replace the atom and regenerate formula, expression and stringView", () => {
		const result = replaceAtomInProofStep(createStep(), ["A"], conjunctionCD);
		const expected = createPropFormula(createPropExpression("((C & D) => B)"));

		expect(result.formula).toStrictEqual(expected);
		expect(result.expression).toStrictEqual(
			convertPropFormulaToExpression(expected),
		);
		expect(result.stringView).toBe("((C ∧ D) → B)");
	});

	it("should keep all other fields", () => {
		const result = replaceAtomInProofStep(createStep(), ["A"], ["C"]);

		expect(result.index).toBe(3);
		expect(result.step).toBe(Step.Derivation);
		expect(result.comment).toBe("Some comment");
		expect(result.derivedFrom).toStrictEqual([1, 2]);
		expect(result.level).toBe(1);
		expect(result.assumptionIndex).toBe(2);
	});

	it("should leave the step unchanged in content when the atom is absent", () => {
		const step = createStep();
		const result = replaceAtomInProofStep(step, ["Z"], ["C"]);

		expect(result.formula).toStrictEqual(implicationAB);
		expect(result.stringView).toBe("(A → B)");
	});

	it("should not mutate the input step or share references with it", () => {
		const step = createStep();
		const snapshot = structuredClone(step);

		const result = replaceAtomInProofStep(step, ["A"], ["C"]);

		expect(step).toStrictEqual(snapshot);
		expect(result).not.toBe(step);
		expect(result.derivedFrom).not.toBe(step.derivedFrom);
	});
});
