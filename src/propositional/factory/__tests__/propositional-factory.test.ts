import { createPropExpression } from "../create-prop-expression";
import { createPropFormula } from "../create-prop-formula";
import { createPropSymbol } from "../create-prop-symbol";
import { PropositionalFactory } from "../index";

describe("PropositionalFactory", () => {
	it("should have all expected rules with correct references", () => {
		expect(PropositionalFactory).toMatchObject({
			createExpression: createPropExpression,
			createFormula: createPropFormula,
			createSymbol: createPropSymbol,
		});
	});

	it("should be immutable", () => {
		expect(Object.isFrozen(PropositionalFactory)).toBe(true);

		expect(() => {
			// @ts-expect-error checking that the object is frozen
			PropositionalFactory.createPropSymbol = jest.fn();
		}).toThrow();
	});
});
