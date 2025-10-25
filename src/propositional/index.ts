/**
 * Main exports for propositional logic functionality.
 * @module Propositional
 */

/**
 * @exports PropositionalFactory - Factory for creating propositional logic expressions and formulas
 * @exports HilbertCalculus - Implementation of Hilbert-style propositional calculus
 * @exports NaturalCalculus - Implementation of natural deduction system for propositional logic
 * @exports PropositionalUtils - Utility functions for working with propositional formulas
 */
export { PropositionalFactory } from "./factory";
export { HilbertCalculus } from "./hilbert-calculus";
export { NaturalCalculus } from "./natural-calculus";
export { PropositionalUtils } from "./utils";
