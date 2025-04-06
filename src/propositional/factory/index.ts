import { createPropExpression } from './create-prop-expression';
import { createPropFormula } from './create-prop-formula';
import { createPropSymbol } from './create-prop-symbol';
import { createOperator } from './create-operator';

export const PropositionalFactory = Object.freeze({
  createExpression: createPropExpression,
  createFormula: createPropFormula,
  createSymbol: createPropSymbol,
  createOperator: createOperator,
});
