import { createPropExpression } from './create-prop-expression';
import { createPropFormula } from './create-prop-formula';

export const PropositionalFactory = Object.freeze({
  createExpression: createPropExpression,
  createFormula: createPropFormula,
});
