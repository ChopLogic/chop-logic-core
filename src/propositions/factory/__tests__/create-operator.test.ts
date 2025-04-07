import { PropSymbol } from '../../../types';
import { createOperator } from '../create-operator';
import { Glyph, GlyphType, Operator } from '../../../enums';

describe('createOperator', () => {
  it('should return Operator.Not for Negation glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Negation], type: GlyphType.Operator, position: 0, view: '~' };
    expect(createOperator(symbol)).toBe(Operator.Not);
  });

  it('should return Operator.And for Conjunction glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Conjunction], type: GlyphType.Operator, position: 1, view: '&' };
    expect(createOperator(symbol)).toBe(Operator.And);
  });

  it('should return Operator.Or for Disjunction glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Disjunction], type: GlyphType.Operator, position: 2, view: '|' };
    expect(createOperator(symbol)).toBe(Operator.Or);
  });

  it('should return Operator.Implies for Implication glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Implication], type: GlyphType.Operator, position: 3, view: '=>' };
    expect(createOperator(symbol)).toBe(Operator.Implies);
  });

  it('should return Operator.ReversedImplies for Reversed Implication glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.ReversedImplication], type: GlyphType.Operator, position: 4, view: '<=' };
    expect(createOperator(symbol)).toBe(Operator.ReversedImplies);
  });

  it('should return Operator.Equiv for Equivalence glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Equivalence], type: GlyphType.Operator, position: 5, view: '<=>' };
    expect(createOperator(symbol)).toBe(Operator.Equiv);
  });

  it('should return Operator.Xor for Exclusive Conjunction (XOR) glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.ExclusiveConjunction], type: GlyphType.Operator, position: 6, view: '^' };
    expect(createOperator(symbol)).toBe(Operator.Xor);
  });

  it('should return Operator.Nand for Sheffer Stroke (NAND) glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.ShefferStroke], type: GlyphType.Operator, position: 7, view: '!&' };
    expect(createOperator(symbol)).toBe(Operator.Nand);
  });

  it('should return Operator.Nor for Webb Operation (NOR) glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.WebbOperation], type: GlyphType.Operator, position: 8, view: '!|' };
    expect(createOperator(symbol)).toBe(Operator.Nor);
  });

  it('should return Operator.AntiImplies for Anti-Implication glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.AntiImplication], type: GlyphType.Operator, position: 9, view: '!=>' };
    expect(createOperator(symbol)).toBe(Operator.AntiImplies);
  });

  it('should return Operator.ReversedAntiImplies for Reversed Anti-Implication glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.ReversedAntiImplication], type: GlyphType.Operator, position: 10, view: '!<=' };
    expect(createOperator(symbol)).toBe(Operator.ReversedAntiImplies);
  });

  it('should return Operator.Contradiction for Contradiction glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Contradiction], type: GlyphType.Operator, position: 11, view: '#' };
    expect(createOperator(symbol)).toBe(Operator.Contradiction);
  });

  it('should return Operator.Tautology for Tautology glyph', () => {
    const symbol: PropSymbol = { atom: [Glyph.Tautology], type: GlyphType.Operator, position: 12, view: '@' };
    expect(createOperator(symbol)).toBe(Operator.Tautology);
  });

  it('should return Operator.Var for a variable type symbol', () => {
    const symbol: PropSymbol = { atom: ['P'], type: GlyphType.Variable, position: 13, view: 'P' };
    expect(createOperator(symbol)).toBe(Operator.Var);
  });

  it('should throw an error for an unrecognized symbol that is not a variable', () => {
    const symbol: PropSymbol = { atom: ['+'], type: GlyphType.Operator, position: 14, view: '+' };
    expect(() => createOperator(symbol)).toThrow('Cannot create an operator from symbol "+".');
  });
});
