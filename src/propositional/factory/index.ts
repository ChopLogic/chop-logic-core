import { createOperator } from "./create-operator";
import { createPropExpression } from "./create-prop-expression";
import { createPropFormula } from "./create-prop-formula";
import { createPropSymbol } from "./create-prop-symbol";

export const PropositionalFactory = Object.freeze({
	createExpression: createPropExpression,
	createFormula: createPropFormula,
	createSymbol: createPropSymbol,
	createOperator: createOperator,
});
