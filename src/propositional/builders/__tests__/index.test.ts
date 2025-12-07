import { createOperator } from "../create-operator";
import { createPropExpression } from "../create-prop-expression";
import { createPropFormula } from "../create-prop-formula";
import { createPropSymbol } from "../create-prop-symbol";
import * as builders from "../index";

describe("Builders index file", () => {
	it("should have all expected functions available", () => {
		expect(typeof builders.createOperator).toBe("function");
		expect(builders.createOperator).toBe(createOperator);

		expect(typeof builders.createPropExpression).toBe("function");
		expect(builders.createPropExpression).toBe(createPropExpression);

		expect(typeof builders.createPropFormula).toBe("function");
		expect(builders.createPropFormula).toBe(createPropFormula);

		expect(typeof builders.createPropSymbol).toBe("function");
		expect(builders.createPropSymbol).toBe(createPropSymbol);
	});
});
