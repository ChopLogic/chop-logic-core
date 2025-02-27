import { Glyph, GlyphType, Operator } from '../../enums';
import { PropSymbol } from '../../models';
import { Propositions } from '../creator';

describe('Propositions.createOperator', () => {
  it('should return Operator.Not for Negation glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Negation], type: GlyphType.Operator, position: 0, view: '~' };
    expect(Propositions.createOperator(symbol)).toBe(Operator.Not);
  });

  it('should return Operator.And for Conjunction glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Conjunction], type: GlyphType.Operator, position: 1, view: '&' };
    expect(Propositions.createOperator(symbol)).toBe(Operator.And);
  });

  it('should return Operator.Or for Disjunction glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Disjunction], type: GlyphType.Operator, position: 2, view: '|' };
    expect(Propositions.createOperator(symbol)).toBe(Operator.Or);
  });

  it('should return Operator.Implies for Implication glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Implication], type: GlyphType.Operator, position: 3, view: '=>' };
    expect(Propositions.createOperator(symbol)).toBe(Operator.Implies);
  });

  it('should return Operator.Equiv for Equivalence glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Equivalence], type: GlyphType.Operator, position: 4, view: '<=>' };
    expect(Propositions.createOperator(symbol)).toBe(Operator.Equiv);
  });

  it('should return Operator.Var for a variable type symbol', () => {
    const symbol: PropSymbol = { atom: ['P'], type: GlyphType.Variable, position: 5, view: 'P' };
    expect(Propositions.createOperator(symbol)).toBe(Operator.Var);
  });

  it('should throw an error for an unrecognized symbol that is not a variable', () => {
    const symbol: PropSymbol = { atom: ['#'], type: GlyphType.Operator, position: 6, view: '#' };
    expect(() => Propositions.createOperator(symbol)).toThrow('Cannot create an operator from symbol "#".');
  });
});
