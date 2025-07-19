import { conjunctionElimination } from "../conjunction-elimination";
import { conjunctionIntroduction } from "../conjunction-introduction";
import { disjunctionElimination } from "../disjunction-elimination";
import { disjunctionIntroduction } from "../disjunction-introduction";
import { equivalenceElimination } from "../equivalence-elimination";
import { equivalenceIntroduction } from "../equivalence-introduction";
import { generateNaturalProofSteps } from "../generate-natural-proof-steps";
import { implicationElimination } from "../implication-elimination";
import { implicationIntroduction } from "../implication-introduction";
import { NaturalCalculus } from "../index";
import { negationElimination } from "../negation-elimination";
import { negationIntroduction } from "../negation-introduction";

describe("NaturalCalculus", () => {
	it("should have all expected rules with correct references", () => {
		expect(NaturalCalculus).toMatchObject({
			NI: negationIntroduction,
			CI: conjunctionIntroduction,
			DI: disjunctionIntroduction,
			II: implicationIntroduction,
			EI: equivalenceIntroduction,
			NE: negationElimination,
			CE: conjunctionElimination,
			DE: disjunctionElimination,
			IE: implicationElimination,
			EE: equivalenceElimination,
			generateSteps: generateNaturalProofSteps,
		});
	});

	it("should be immutable", () => {
		expect(Object.isFrozen(NaturalCalculus)).toBe(true);

		expect(() => {
			// @ts-expect-error checking that the object is frozen
			NaturalCalculus.NI = jest.fn();
		}).toThrow();
	});
});
