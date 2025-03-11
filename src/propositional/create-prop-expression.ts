import { PropSymbol } from '../common/types';
import { tokenizeString } from '../common/utils/tokenize-string';
import { createPropositionalSymbol } from './create-prop-symbol';

/**
 * Converts a logical expression string into an array of PropSymbols.
 *
 * - Uses `tokenizeString` to split the input string into tokens.
 * - Uses `createPropositionalSymbol` to convert tokens into `PropSymbol` objects.
 * - Assigns an index-based position to each symbol.
 *
 * @param input - The logical expression as a string.
 * @returns An array of `PropSymbol` objects representing the parsed expression.
 * @throws Will throw an error if the input contains invalid characters.
 */
export function createPropExpression(input: string): PropSymbol[] {
  const tokens = tokenizeString(input);
  return tokens.map((token, index) => createPropositionalSymbol(token, index));
}
