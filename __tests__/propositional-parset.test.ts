import mocks from "../__mocks__/formula-items";
import parser from "../src/propositions/parser";

describe("Propositional parser tests", () => {
  it("getCharsArray() method returns a correct array", () => {
    expect(parser.getCharsArray("abc")).toEqual(["a", "b", "c"]);
    expect(parser.getCharsArray("a b c")).toEqual(["a", "b", "c"]);
    expect(parser.getCharsArray("   a  bc  ")).toEqual(["a", "b", "c"]);
    expect(parser.getCharsArray("")).toEqual([]);
    expect(parser.getCharsArray("1")).toEqual(["1"]);
  });

  it("joinLogicalSymbols() method returns a correct array", () => {
    expect(parser.joinLogicalSymbols(["a", "b", "c"])).toEqual(["a", "b", "c"]);
    expect(parser.joinLogicalSymbols(["=", ">"])).toEqual(["=>"]);
    expect(parser.joinLogicalSymbols(["<", "=", ">"])).toEqual(["<=>"]);
    expect(parser.joinLogicalSymbols(["<", "=", ">", "a", "b"])).toEqual([
      "<=>",
      "a",
      "b",
    ]);
    expect(parser.joinLogicalSymbols(["a", "=", ">", "c"])).toEqual([
      "a",
      "=>",
      "c",
    ]);
    expect(parser.joinLogicalSymbols(["a", "&", "c"])).toEqual(["a", "&", "c"]);
  });

  it("splitExpressionByPosition() method returns two sub expressions", () => {
    expect(
      parser.splitExpressionByPosition(7, mocks.propositionalExpression)
    ).toEqual({
      firstArgument: mocks.firstSubExpression,
      secondArgument: mocks.secondSubExpression,
    });
    expect(
      parser.splitExpressionByPosition(18, mocks.secondSubExpression)
    ).toEqual({
      firstArgument: mocks.thirdSubExpression,
      secondArgument: mocks.fourthSubExpression,
    });
    expect(
      parser.splitExpressionByPosition(13, mocks.thirdSubExpression)
    ).toEqual({
      firstArgument: mocks.secondVariable,
      secondArgument: mocks.thirdVariable,
    });
  });

  it("splitExpressionByPosition() method throws an error if the given arguments are incorrect", () => {
    expect(() => {
      parser.splitExpressionByPosition(100, mocks.firstSubExpression);
    }).toThrow(Error);
    expect(() => {
      parser.splitExpressionByPosition(-1, mocks.firstSubExpression);
    }).toThrow(Error);
    expect(() => {
      parser.splitExpressionByPosition(2, mocks.secondSubExpression);
    }).toThrow(Error);
    expect(() => {
      parser.splitExpressionByPosition(0, []);
    }).toThrow(Error);
  });

  it("removeSurroundingElements() method returns a correct propositional expression", () => {
    expect(
      parser.removeSurroundingElements([
        mocks.openParenthesis,
        ...mocks.firstSubExpression,
        mocks.openParenthesis,
      ])
    ).toEqual(mocks.firstSubExpression);
    expect(
      parser.removeSurroundingElements([
        mocks.openParenthesis,
        ...mocks.secondSubExpression,
        mocks.openParenthesis,
      ])
    ).toEqual(mocks.secondSubExpression);
    expect(
      parser.removeSurroundingElements([
        mocks.openParenthesis,
        mocks.openParenthesis,
      ])
    ).toEqual([]);
    expect(parser.removeSurroundingElements([])).toEqual([]);
  });

  it("removeSurroundingElements() method returns a generic array", () => {
    expect(parser.removeSurroundingElements([1, 2, 3, 4, 5])).toEqual([
      2, 3, 4,
    ]);
    expect(parser.removeSurroundingElements(["a", "b", "c"])).toEqual(["b"]);
    expect(parser.removeSurroundingElements(["a", "c"])).toEqual([]);
    expect(parser.removeSurroundingElements([])).toEqual([]);
  });

  it("extractAllSubExpressions() method returns an array of correct propositional expressions", () => {
    expect(parser.extractAllSubExpressions([])).toEqual([]);
    expect(
      parser.extractAllSubExpressions(mocks.propositionalExpression)
    ).toEqual([
      mocks.fourthVariable,
      mocks.fourthSubExpression,
      mocks.thirdVariable,
      mocks.secondVariable,
      mocks.thirdSubExpression,
      mocks.secondSubExpression,
      mocks.firstVariable,
      mocks.firstSubExpression,
      mocks.propositionalExpression,
    ]);
    expect(parser.extractAllSubExpressions(mocks.secondSubExpression)).toEqual([
      mocks.fourthVariable,
      mocks.fourthSubExpression,
      mocks.thirdVariable,
      mocks.secondVariable,
      mocks.thirdSubExpression,
      mocks.secondSubExpression,
    ]);
    expect(parser.extractAllSubExpressions(mocks.thirdSubExpression)).toEqual([
      mocks.thirdVariable,
      mocks.secondVariable,
      mocks.thirdSubExpression,
    ]);
    expect(parser.extractAllSubExpressions(mocks.fourthSubExpression)).toEqual([
      mocks.fourthVariable,
      mocks.fourthSubExpression,
    ]);
  });

  it("extractAllSubExpressions() method throws an error if the input expression is incorrect", () => {
    expect(() => {
      parser.extractAllSubExpressions([mocks.openParenthesis]);
    }).toThrow(Error);
    expect(() => {
      parser.extractAllSubExpressions([
        mocks.openParenthesis,
        ...mocks.fourthSubExpression,
      ]);
    }).toThrow(Error);
  });

  it("getAllIndexesOfTheSymbol() method returns an array of indexes", () => {
    expect(
      parser.getAllIndexesOfTheSymbol(mocks.propositionalExpression, "p")
    ).toEqual([4, 11, 22]);
    expect(
      parser.getAllIndexesOfTheSymbol(mocks.propositionalExpression, "q")
    ).toEqual([15]);
    expect(
      parser.getAllIndexesOfTheSymbol(mocks.propositionalExpression, "=>")
    ).toEqual([7, 18]);
    expect(
      parser.getAllIndexesOfTheSymbol(mocks.firstSubExpression, "~")
    ).toEqual([1]);
    expect(
      parser.getAllIndexesOfTheSymbol(mocks.firstSubExpression, ")")
    ).toEqual([4, 5]);
    expect(
      parser.getAllIndexesOfTheSymbol(mocks.firstSubExpression, "s")
    ).toEqual([]);
    expect(parser.getAllIndexesOfTheSymbol([], ")")).toEqual([]);
  });

  it("findMainOperator() method returns a correct propositional symbol", () => {
    expect(parser.findMainOperator(mocks.propositionalExpression)).toEqual(
      mocks.propositionalExpression[7]
    );
    expect(parser.findMainOperator(mocks.firstSubExpression)).toEqual(
      mocks.firstSubExpression[1]
    );
    expect(parser.findMainOperator(mocks.secondSubExpression)).toEqual(
      mocks.secondSubExpression[10]
    );
    expect(parser.findMainOperator(mocks.thirdSubExpression)).toEqual(
      mocks.thirdSubExpression[4]
    );
    expect(parser.findMainOperator(mocks.fourthSubExpression)).toEqual(
      mocks.fourthSubExpression[1]
    );
    expect(parser.findMainOperator(mocks.firstVariable)).toEqual(
      mocks.firstVariable[1]
    );
    expect(parser.findMainOperator(mocks.secondVariable)).toEqual(
      mocks.secondVariable[1]
    );
  });

  it("findMainOperator() method throws an error if the input expression is incorrect", () => {
    expect(() => {
      parser.findMainOperator([mocks.openParenthesis]);
    }).toThrow(Error);
    expect(() => {
      parser.findMainOperator([]);
    }).toThrow(Error);
    expect(() => {
      parser.findMainOperator([
        mocks.openParenthesis,
        mocks.openParenthesis,
        mocks.openParenthesis,
      ]);
    }).toThrow(Error);
  });
});
