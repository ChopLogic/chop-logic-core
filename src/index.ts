import { PropositionalFactory } from './propositional/factory';
import { HilbertCalculus } from './propositional/hilbert-calculus';
import { NaturalCalculus } from './propositional/natural-calculus';
import { applyPropFormulaChecks } from './propositional/checks';
import { PropositionalToolkit } from './propositional/toolkit';
import { Tokenizer } from './tokenizer';

export default {
  Tokenizer,
  PropositionalFactory,
  PropositionalToolkit,
  HilbertCalculus,
  NaturalCalculus,
  applyPropFormulaChecks,
};
