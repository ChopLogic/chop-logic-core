import { tokenizePropositionalInput } from '../tokenize-propositional-input';

describe('tokenizePropositionalInput', () => {
  it('should correctly tokenize "(A => B) & ~C"', () => {
    expect(tokenizePropositionalInput('(A => B) & ~C')).toEqual(['(', 'A', '=>', 'B', ')', '&', '~', 'C']);
  });

  it('should correctly tokenize "(A <=> B  )|| ~~C  "', () => {
    expect(tokenizePropositionalInput('(A <=> B  )|| ~~C  ')).toEqual(['(', 'A', '<=>', 'B', ')', '|', '|', '~', '~', 'C']);
  });

  it('should correctly tokenize "ABC <=> DFR"', () => {
    expect(tokenizePropositionalInput('ABC <=> DFR')).toEqual(['ABC', '<=>', 'DFR']);
  });

  it('should correctly tokenize "p | q & ~r"', () => {
    expect(tokenizePropositionalInput('p | q & ~r')).toEqual(['p', '|', 'q', '&', '~', 'r']);
  });

  it('should correctly tokenize a single letter', () => {
    expect(tokenizePropositionalInput('z')).toEqual(['z']);
  });

  it('should correctly tokenize a single glyph', () => {
    expect(tokenizePropositionalInput('~')).toEqual(['~']);
  });

  it('should correctly tokenize a single glyph consisted of several characters', () => {
    expect(tokenizePropositionalInput('=>')).toEqual(['=>']);
  });

  it('should correctly tokenize complex expressions with multiple operators', () => {
    expect(tokenizePropositionalInput('((A & B) => C) | D')).toEqual(['(', '(', 'A', '&', 'B', ')', '=>', 'C', ')', '|', 'D']);
  });

  it('should throw an error for invalid characters (numbers, special symbols)', () => {
    expect(() => tokenizePropositionalInput('1234*&2%')).toThrow('Invalid character(s) found in input: "1234*&2%".');
  });

  it('should throw an error for mixed valid and invalid input', () => {
    expect(() => tokenizePropositionalInput('A & B @ C')).toThrow('Invalid character(s) found in input: "A & B @ C".');
  });

  it('should throw an error for numbers', () => {
    expect(() => tokenizePropositionalInput('1&2')).toThrow('Invalid character(s) found in input: "1&2".');
  });

  it('should throw an error for non latin letters', () => {
    expect(() => tokenizePropositionalInput('Ü')).toThrow('Invalid character(s) found in input: "Ü".');
  });

  it('should throw an error for non latin letters that look like English ones', () => {
    expect(() => tokenizePropositionalInput('А & С')).toThrow('Invalid character(s) found in input: "А & С".');
  });

  it('should handle empty input gracefully', () => {
    expect(tokenizePropositionalInput('')).toEqual([]);
  });
});
