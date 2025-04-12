import { Glyph, Operator } from '../enums';

/**
 * Converts a given Operator into its corresponding Glyph.
 *
 * @param {Operator} operator - The logical operator to convert.
 * @returns {Glyph} - The corresponding glyph.
 * @throws {Error} If the operator is not recognized.
 */
export function getOperatorGlyph(operator: Operator): Glyph {
  switch (operator) {
    case Operator.Not:
      return Glyph.Negation;
    case Operator.And:
      return Glyph.Conjunction;
    case Operator.Or:
      return Glyph.Disjunction;
    case Operator.Implies:
      return Glyph.Implication;
    case Operator.ReversedImplies:
      return Glyph.ReversedImplication;
    case Operator.Equiv:
      return Glyph.Equivalence;
    case Operator.Xor:
      return Glyph.ExclusiveConjunction;
    case Operator.Nand:
      return Glyph.ShefferStroke;
    case Operator.Nor:
      return Glyph.WebbOperation;
    case Operator.AntiImplies:
      return Glyph.AntiImplication;
    case Operator.ReversedAntiImplies:
      return Glyph.ReversedAntiImplication;
    case Operator.Contradiction:
      return Glyph.Contradiction;
    case Operator.Tautology:
      return Glyph.Tautology;
    default:
      throw new Error(`Cannot convert operator "${operator}" to a glyph.`);
  }
}
