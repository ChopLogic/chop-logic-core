import { generateHilbertProofStep } from "../generate-hilbert-proof-step";
import { implicationDistribution } from "../implication-distribution";
import { implicationElimination } from "../implication-elimination";
import { implicationIntroduction } from "../implication-introduction";
import { implicationReversal } from "../implication-reversal";
import { HilbertCalculus } from "../index";

describe("HilbertCalculus", () => {
	it("should have all expected rules with correct references", () => {
		expect(HilbertCalculus).toMatchObject({
			II: implicationIntroduction,
			ID: implicationDistribution,
			IR: implicationReversal,
			IE: implicationElimination,
			generateStep: generateHilbertProofStep,
		});
	});

	it("should be immutable", () => {
		expect(Object.isFrozen(HilbertCalculus)).toBe(true);

		expect(() => {
			// @ts-expect-error checking that the object is frozen
			HilbertCalculus.II = jest.fn();
		}).toThrow();
	});
});
