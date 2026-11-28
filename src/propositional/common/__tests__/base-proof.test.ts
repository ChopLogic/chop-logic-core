import { Operator, Step } from "../../../enums";
import type { BaseProofStep, PropFormula } from "../../../models";
import { BaseProof } from "../base-proof";

interface TestStep extends BaseProofStep {
	payload: { value: string };
}

class TestProof extends BaseProof<TestStep> {
	add(steps: TestStep[], comment?: string): TestStep[] {
		return this.pushSteps(steps, comment);
	}

	stored(index: number, action: string): TestStep {
		return this.getStoredStep(index, action);
	}

	override isComplete(): boolean {
		return this.steps.length > 0;
	}
}

const goal: PropFormula = { operator: Operator.Var, values: ["A"] };

const createStep = (index: number, comment = ""): TestStep => ({
	index,
	step: Step.Premise,
	comment,
	payload: { value: `step-${index}` },
});

describe("BaseProof", () => {
	describe("goal", () => {
		it("should store a copy of the goal", () => {
			const input = structuredClone(goal);
			const proof = new TestProof(input);

			input.values = ["B"];

			expect(proof.getGoal()).toStrictEqual(goal);
		});

		it("should return a copy of the goal", () => {
			const proof = new TestProof(goal);
			const returned = proof.getGoal();

			returned.values = ["B"];

			expect(proof.getGoal()).toStrictEqual(goal);
		});
	});

	describe("pushSteps", () => {
		it("should append steps and return them", () => {
			const proof = new TestProof(goal);

			const added = proof.add([createStep(1), createStep(2)]);

			expect(added).toStrictEqual([createStep(1), createStep(2)]);
			expect(proof.getStepCount()).toBe(2);
			expect(proof.getSteps()).toStrictEqual([createStep(1), createStep(2)]);
		});

		it("should apply a non-empty comment to every step", () => {
			const proof = new TestProof(goal);

			const added = proof.add([createStep(1, "a"), createStep(2, "b")], "c");

			expect(added.map((step) => step.comment)).toStrictEqual(["c", "c"]);
			expect(proof.getSteps().map((step) => step.comment)).toStrictEqual([
				"c",
				"c",
			]);
		});

		it("should keep existing comments when the comment is empty or missing", () => {
			const proof = new TestProof(goal);

			proof.add([createStep(1, "a")], "");
			proof.add([createStep(2, "b")]);

			expect(proof.getSteps().map((step) => step.comment)).toStrictEqual([
				"a",
				"b",
			]);
		});

		it("should detach stored steps from the input", () => {
			const proof = new TestProof(goal);
			const input = createStep(1);

			proof.add([input]);
			input.payload.value = "changed";

			expect(proof.getStep(1)?.payload.value).toBe("step-1");
		});

		it("should detach returned steps from the stored ones", () => {
			const proof = new TestProof(goal);

			const [returned] = proof.add([createStep(1)]);
			returned.payload.value = "changed";

			expect(proof.getStep(1)?.payload.value).toBe("step-1");
		});
	});

	describe("getSteps", () => {
		it("should return an empty frozen array for an empty proof", () => {
			const steps = new TestProof(goal).getSteps();

			expect(steps).toStrictEqual([]);
			expect(Object.isFrozen(steps)).toBe(true);
		});

		it("should return copies of the steps", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1)]);

			const [step] = proof.getSteps();
			step.payload.value = "changed";

			expect(proof.getStep(1)?.payload.value).toBe("step-1");
		});
	});

	describe("getStep", () => {
		it("should return the step at a 1-based index", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1), createStep(2)]);

			expect(proof.getStep(1)).toStrictEqual(createStep(1));
			expect(proof.getStep(2)).toStrictEqual(createStep(2));
		});

		it("should return undefined for out-of-range indexes", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1)]);

			expect(proof.getStep(0)).toBeUndefined();
			expect(proof.getStep(2)).toBeUndefined();
		});

		it("should return a copy", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1)]);

			const step = proof.getStep(1) as TestStep;
			step.payload.value = "changed";

			expect(proof.getStep(1)?.payload.value).toBe("step-1");
		});
	});

	describe("getLastStep", () => {
		it("should return undefined for an empty proof", () => {
			expect(new TestProof(goal).getLastStep()).toBeUndefined();
		});

		it("should return a copy of the last step", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1), createStep(2)]);

			const last = proof.getLastStep() as TestStep;
			expect(last).toStrictEqual(createStep(2));

			last.payload.value = "changed";
			expect(proof.getLastStep()?.payload.value).toBe("step-2");
		});
	});

	describe("getStoredStep", () => {
		it("should return the stored step", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1)]);

			expect(proof.stored(1, "inspect")).toStrictEqual(createStep(1));
		});

		it("should throw a descriptive error for a missing step", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1)]);

			expect(() => proof.stored(0, "inspect")).toThrow(
				"Cannot inspect: step 0 not found in proof",
			);
			expect(() => proof.stored(2, "reiterate")).toThrow(
				"Cannot reiterate: step 2 not found in proof",
			);
		});
	});

	describe("clear", () => {
		it("should remove all steps and keep the goal", () => {
			const proof = new TestProof(goal);
			proof.add([createStep(1), createStep(2)]);

			proof.clear();

			expect(proof.getStepCount()).toBe(0);
			expect(proof.getSteps()).toStrictEqual([]);
			expect(proof.getGoal()).toStrictEqual(goal);
			expect(proof.isComplete()).toBe(false);
		});
	});
});
