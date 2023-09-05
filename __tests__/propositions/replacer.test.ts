import mocks from "../../__mocks__/formula-items";
import replacer from "../../src/propositions/replacer";

describe("Propositional replacer tests", () => {
  it("correctly replace a variable in the table item", () => {
    expect(
      replacer.replacePropositionalVariableInDPTableItems(
        mocks.testTableItem,
        "Z",
        "P"
      )
    ).toEqual(mocks.testTableItemWithReplacedVariable);
  });

  it("correctly replace a variable in the expression", () => {
    expect(
      replacer.replaceVariableInPropositionalExpression(
        mocks.testTableItem[0].expression,
        "Z",
        "P"
      )
    ).toEqual(mocks.testTableItemWithReplacedVariable[0].expression);
  });

  it("correctly replace a variable in the raw input", () => {
    expect(
      replacer.replaceVariableInRawInput(
        mocks.testTableItem[0].rawInput,
        "Z",
        "P"
      )
    ).toEqual(mocks.testTableItemWithReplacedVariable[0].rawInput);
  });
});
