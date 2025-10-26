import { createOperator } from "./create-operator";
import { createPropExpression } from "./create-prop-expression";
import { createPropFormula } from "./create-prop-formula";
import { createPropSymbol } from "./create-prop-symbol";

/**
 * Factory utilities for creating propositional logic components.
 * Provides methods to create well-formed formulas, expressions, symbols, and operators.
 *
 * @namespace
 * @category Utilities
 */
export const PropositionalFactory = Object.freeze({
	createExpression: createPropExpression,
	createFormula: createPropFormula,
	createSymbol: createPropSymbol,
	createOperator: createOperator,
});
