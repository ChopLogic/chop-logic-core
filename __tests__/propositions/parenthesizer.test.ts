import mocks from "../../__mocks__/formula-items";
import parenthesizer from "../../src/propositions/parenthesizer";

describe("Propositional parenthesizer tests", () => {
  it("parenthesizeVariables() test", () => {
    expect(
      parenthesizer.parenthesizeVariables([mocks.oneVariableExpression[1]])
    ).toEqual(mocks.oneVariableExpression);
    expect(
      parenthesizer.parenthesizeVariables([
        mocks.propositionalSymbols[5],
        mocks.propositionalSymbols[1],
        mocks.propositionalSymbols[5],
      ])
    ).toEqual(mocks.twoVariablesExpression);
  });

  it("parenthesizeNegations() test with one negation", () => {
    expect(
      parenthesizer.parenthesizeNegations(mocks.oneVariableExpression)
    ).toEqual(mocks.oneVariableExpression);
    const testInput = [
      mocks.propositionalSymbols[0],
      { ...mocks.propositionalSymbols[7], position: 1 },
      { ...mocks.propositionalSymbols[5], position: 2 },
      { ...mocks.propositionalSymbols[6], position: 3 },
    ];

    expect(parenthesizer.parenthesizeNegations(testInput)).toEqual(
      mocks.oneNegationExpression
    );
  });

  it("parenthesizeNegations() test with three negations", () => {
    const testInput = [
      mocks.propositionalSymbols[0],
      { ...mocks.propositionalSymbols[0], position: 1 },
      { ...mocks.propositionalSymbols[0], position: 2 },
      { ...mocks.propositionalSymbols[7], position: 3 },
      { ...mocks.propositionalSymbols[5], position: 4 },
      { ...mocks.propositionalSymbols[6], position: 5 },
    ];
    expect(parenthesizer.parenthesizeNegations(testInput)).toEqual(
      mocks.threeNegationsExpression
    );
  });

  it("parenthesizeNegations() test without negations", () => {
    expect(
      parenthesizer.parenthesizeNegations(mocks.oneVariableExpression)
    ).toEqual(mocks.oneVariableExpression);
  });
});
