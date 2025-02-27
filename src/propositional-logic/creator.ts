import { Glyph, Operator, GlyphType } from '../enums';
import { PropSymbol } from '../models';

export class Propositions {
  static createOperator(symbol: PropSymbol): Operator {
    switch (symbol.atom[0]) {
      case Glyph.Negation: {
        return Operator.Not;
      }
      case Glyph.Conjunction: {
        return Operator.And;
      }
      case Glyph.Disjunction: {
        return Operator.Or;
      }
      case Glyph.Implication: {
        return Operator.Implies;
      }
      case Glyph.Equivalence: {
        return Operator.Equiv;
      }
      default: {
        if (symbol.type === GlyphType.Variable) {
          return Operator.Var;
        } else {
          throw new Error(`Cannot create an operator from symbol "${symbol.atom[0]}".`);
        }
      }
    }
  }
}
