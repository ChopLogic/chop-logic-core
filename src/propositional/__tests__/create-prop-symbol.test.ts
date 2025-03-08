import { createPropositionalSymbol } from '../create-prop-symbol';
import { PropSymbol } from '../../common/types';
import { Glyph, GlyphType, GlyphUnicode } from '../../common/enums';

describe('createPropositionalSymbol', () => {
  it('should create a parenthesis symbol for "("', () => {
    expect(createPropositionalSymbol(Glyph.OpenParenthesis, 0)).toEqual<PropSymbol>({
      position: 0,
      atom: [Glyph.OpenParenthesis],
      type: GlyphType.Parenthesis,
      view: GlyphUnicode.OpenParenthesis,
    });
  });

  it('should create a parenthesis symbol for ")"', () => {
    expect(createPropositionalSymbol(Glyph.CloseParenthesis, 1)).toEqual<PropSymbol>({
      position: 1,
      atom: [Glyph.CloseParenthesis],
      type: GlyphType.Parenthesis,
      view: GlyphUnicode.CloseParenthesis,
    });
  });

  it('should create an operator symbol for "&" (Conjunction)', () => {
    expect(createPropositionalSymbol(Glyph.Conjunction, 2)).toEqual<PropSymbol>({
      position: 2,
      atom: [Glyph.Conjunction],
      type: GlyphType.Operator,
      view: GlyphUnicode.Conjunction,
    });
  });

  it('should create an operator symbol for "|" (Disjunction)', () => {
    expect(createPropositionalSymbol(Glyph.Disjunction, 3)).toEqual<PropSymbol>({
      position: 3,
      atom: [Glyph.Disjunction],
      type: GlyphType.Operator,
      view: GlyphUnicode.Disjunction,
    });
  });

  it('should create a variable symbol for "P"', () => {
    expect(createPropositionalSymbol('P', 4)).toEqual<PropSymbol>({
      position: 4,
      atom: ['P'],
      type: GlyphType.Variable,
      view: 'p',
    });
  });

  it('should create a variable symbol for "q"', () => {
    expect(createPropositionalSymbol('q', 5)).toEqual<PropSymbol>({
      position: 5,
      atom: ['q'],
      type: GlyphType.Variable,
      view: 'q',
    });
  });

  it('should create a variable symbol for "⊕"', () => {
    expect(createPropositionalSymbol(Glyph.ExclusiveConjunction, 5)).toEqual<PropSymbol>({
      position: 5,
      atom: ['^'],
      type: GlyphType.Operator,
      view: '⊕',
    });
  });

  it('should create a variable symbol for "↚"', () => {
    expect(createPropositionalSymbol(Glyph.ReversedAntiImplication, 57)).toEqual<PropSymbol>({
      position: 57,
      atom: ['!<='],
      type: GlyphType.Operator,
      view: '↚',
    });
  });

  it('should create a variable symbol for "@"', () => {
    expect(createPropositionalSymbol(Glyph.Tautology, 1)).toEqual<PropSymbol>({
      position: 1,
      atom: ['@'],
      type: GlyphType.Operator,
      view: '⊤',
    });
  });

  it('should throw an error for an invalid character', () => {
    expect(() => createPropositionalSymbol('+', 6)).toThrow('Cannot create a propositional symbol from the character "+".');
  });

  it('should throw an error for an empty string', () => {
    expect(() => createPropositionalSymbol('', 7)).toThrow('Cannot create a propositional symbol from the character "".');
  });

  it('should use only the first letter of a multi-character variable', () => {
    expect(createPropositionalSymbol('XYZ', 8)).toEqual<PropSymbol>({
      position: 8,
      atom: ['XYZ'],
      type: GlyphType.Variable,
      view: 'x', // Only the first letter, in lowercase
    });
  });
});
