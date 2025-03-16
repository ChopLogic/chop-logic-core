import { createPropSymbol } from '../create-prop-symbol';
import { PropSymbol } from '../../../common/types';
import { Glyph, GlyphType, GlyphUnicode } from '../../../common/enums';

describe('createPropSymbol', () => {
  it('should create a parenthesis symbol for "("', () => {
    expect(createPropSymbol(Glyph.OpenParenthesis, 0)).toEqual<PropSymbol>({
      position: 0,
      atom: [Glyph.OpenParenthesis],
      type: GlyphType.Parenthesis,
      view: GlyphUnicode.OpenParenthesis,
    });
  });

  it('should create a parenthesis symbol for ")"', () => {
    expect(createPropSymbol(Glyph.CloseParenthesis, 1)).toEqual<PropSymbol>({
      position: 1,
      atom: [Glyph.CloseParenthesis],
      type: GlyphType.Parenthesis,
      view: GlyphUnicode.CloseParenthesis,
    });
  });

  it('should create an operator symbol for "&" (Conjunction)', () => {
    expect(createPropSymbol(Glyph.Conjunction, 2)).toEqual<PropSymbol>({
      position: 2,
      atom: [Glyph.Conjunction],
      type: GlyphType.Operator,
      view: GlyphUnicode.Conjunction,
    });
  });

  it('should create an operator symbol for "|" (Disjunction)', () => {
    expect(createPropSymbol(Glyph.Disjunction, 3)).toEqual<PropSymbol>({
      position: 3,
      atom: [Glyph.Disjunction],
      type: GlyphType.Operator,
      view: GlyphUnicode.Disjunction,
    });
  });

  it('should create a variable symbol for "P"', () => {
    expect(createPropSymbol('P', 4)).toEqual<PropSymbol>({
      position: 4,
      atom: ['P'],
      type: GlyphType.Variable,
      view: 'p',
    });
  });

  it('should create a variable symbol for "q"', () => {
    expect(createPropSymbol('q', 5)).toEqual<PropSymbol>({
      position: 5,
      atom: ['q'],
      type: GlyphType.Variable,
      view: 'q',
    });
  });

  it('should create a variable symbol for "⊕"', () => {
    expect(createPropSymbol(Glyph.ExclusiveConjunction, 5)).toEqual<PropSymbol>({
      position: 5,
      atom: ['^'],
      type: GlyphType.Operator,
      view: '⊕',
    });
  });

  it('should create a variable symbol for "↚"', () => {
    expect(createPropSymbol(Glyph.ReversedAntiImplication, 57)).toEqual<PropSymbol>({
      position: 57,
      atom: ['!<='],
      type: GlyphType.Operator,
      view: '↚',
    });
  });

  it('should create a variable symbol for "@"', () => {
    expect(createPropSymbol(Glyph.Tautology, 1)).toEqual<PropSymbol>({
      position: 1,
      atom: ['@'],
      type: GlyphType.Operator,
      view: '⊤',
    });
  });

  it('should throw an error for an invalid character', () => {
    expect(() => createPropSymbol('+', 6)).toThrow('Cannot create a propositional symbol from the character "+".');
  });

  it('should throw an error for an empty string', () => {
    expect(() => createPropSymbol('', 7)).toThrow('Cannot create a propositional symbol from the character "".');
  });

  it('should use only the first letter of a multi-character variable', () => {
    expect(createPropSymbol('XYZ', 8)).toEqual<PropSymbol>({
      position: 8,
      atom: ['XYZ'],
      type: GlyphType.Variable,
      view: 'x', // Only the first letter, in lowercase
    });
  });
});
