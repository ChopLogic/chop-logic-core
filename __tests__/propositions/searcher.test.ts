import mocks from "../../__mocks__/formula-items";
import searcher from "../../src/propositions/searcher";

describe("Propositional searcher tests", () => {
  it("findClosestParenthesisIndexes() returns the closest index", () => {
    expect(searcher.findClosestParenthesisIndexes(1, [2, 5, 4])).toBe(2);
    expect(searcher.findClosestParenthesisIndexes(3, [2, 5, 4])).toBe(4);
    expect(searcher.findClosestParenthesisIndexes(3, [2, 5, 6, 7])).toBe(5);
  });

  it("findClosestParenthesisIndexes() throws an error if inputs are invalid", () => {
    expect(() => {
      searcher.findClosestParenthesisIndexes(6, [2, 5, 4]);
    }).toThrow(Error);
    expect(() => {
      searcher.findClosestParenthesisIndexes(-1, [-2, -5, -4]);
    }).toThrow(Error);
    expect(() => {
      searcher.findClosestParenthesisIndexes(Infinity, [NaN, NaN, NaN]);
    }).toThrow(Error);
  });

  it("findMatchingCloseParenthesis() test", () => {
    expect(
      searcher.findMatchingCloseParenthesis(
        mocks.propositionalExpression,
        mocks.propositionalExpression[0]
      )
    ).toEqual(mocks.propositionalExpression[26]);
    expect(
      searcher.findMatchingCloseParenthesis(
        mocks.propositionalExpression,
        mocks.propositionalExpression[1]
      )
    ).toEqual(mocks.propositionalExpression[6]);
    expect(
      searcher.findMatchingCloseParenthesis(
        mocks.propositionalExpression,
        mocks.propositionalExpression[9]
      )
    ).toEqual(mocks.propositionalExpression[17]);
    expect(
      searcher.findMatchingCloseParenthesis(
        [],
        mocks.propositionalExpression[9]
      )
    ).toEqual(undefined);
  });

  it("findMatchingOpenParenthesis() test", () => {
    expect(
      searcher.findMatchingOpenParenthesis(
        mocks.propositionalExpression,
        mocks.propositionalExpression[26]
      )
    ).toEqual(mocks.propositionalExpression[0]);
    expect(
      searcher.findMatchingOpenParenthesis(
        mocks.propositionalExpression,
        mocks.propositionalExpression[5]
      )
    ).toEqual(mocks.propositionalExpression[3]);
    expect(
      searcher.findMatchingOpenParenthesis(
        mocks.propositionalExpression,
        mocks.propositionalExpression[17]
      )
    ).toEqual(mocks.propositionalExpression[9]);
    expect(
      searcher.findMatchingOpenParenthesis(
        [],
        mocks.propositionalExpression[17]
      )
    ).toEqual(undefined);
  });
});
