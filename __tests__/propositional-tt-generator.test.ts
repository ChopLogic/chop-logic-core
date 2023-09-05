import generator from "../src/propositions/tt-generator";
import mocks from "../__mocks__/formula-items";
import { PropositionalOperator } from "../src/enums/propositional-operator";
import { LogicalSymbolHexCode } from "../src/enums/logical-symbols";

describe("Truth Table Generator tests", () => {
  it("createVariableColumn() method returns a correct TruthTableColumn", () => {
    const column1 = generator.createVariableColumn("p", 0);
    const column2 = generator.createVariableColumn("q", 2);
    expect(column1).toEqual({
      field: "p",
      depth: 0,
      operator: "VAR",
      title: "P",
      operands: [],
    });
    expect(column2).toEqual({
      field: "q",
      depth: 2,
      operator: "VAR",
      title: "Q",
      operands: [],
    });
  });

  it("createNegationColumn() method returns a correct TruthTableColumn", () => {
    const column = generator.createNegationColumn(mocks.propositionalAtom, 0);
    expect(column).toEqual({
      field: "¬ P",
      depth: 0,
      operator: "NOT",
      title: "¬ P",
      operands: ["P"],
    });
    const column2 = generator.createNegationColumn(mocks.firstSubFormula, 1);
    expect(column2).toEqual({
      field: "¬ ¬ P",
      depth: 1,
      operator: "NOT",
      title: "¬ ¬ P",
      operands: ["¬ P"],
    });
  });

  it("createBinaryColumn() method returns a correct TruthTableColumn", () => {
    const column = generator.createBinaryColumn({
      firstOperand: mocks.propositionalAtom,
      secondOperand: mocks.propositionalAtom,
      depth: 0,
      operator: PropositionalOperator.And,
      symbol: LogicalSymbolHexCode.Conjunction,
    });

    expect(column).toEqual({
      field: "P ∧ P",
      depth: 0,
      operator: "AND",
      title: "P ∧ P",
      operands: ["P", "P"],
    });

    const column2 = generator.createBinaryColumn({
      firstOperand: mocks.firstSubFormula,
      secondOperand: mocks.secondSubFormula,
      depth: 1,
      operator: PropositionalOperator.Implies,
      symbol: LogicalSymbolHexCode.Implication,
    });

    expect(column2).toEqual({
      field: "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P",
      depth: 1,
      operator: "IMPLIES",
      title: "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P",
      operands: ["¬ P", "( P ∧ Q ) ⇒ ¬ P"],
    });
  });

  it("generateTrueFalseCombinations() method creates correct arrays of values", () => {
    const arr1 = generator.generateTrueFalseCombinations(1);
    const arr2 = generator.generateTrueFalseCombinations(2);
    const arr3 = generator.generateTrueFalseCombinations(3);
    const arr4 = generator.generateTrueFalseCombinations(4);

    expect(arr1).toEqual([false, true]);

    expect(arr2).toEqual([false, false, false, true, true, false, true, true]);

    expect(arr3).toEqual([
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
    ]);

    expect(arr4).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
    ]);
  });

  it("splitBooleanArrayByVarsCount() method splits the array correctly", () => {
    const arr1 = generator.generateTrueFalseCombinations(1);
    const arr2 = generator.generateTrueFalseCombinations(2);
    const arr3 = generator.generateTrueFalseCombinations(3);
    const arr4 = generator.generateTrueFalseCombinations(4);

    const split1 = generator.splitBooleanArrayByVarsCount(1, arr1);
    const split2 = generator.splitBooleanArrayByVarsCount(2, arr2);
    const split3 = generator.splitBooleanArrayByVarsCount(3, arr3);
    const split4 = generator.splitBooleanArrayByVarsCount(4, arr4);

    expect(split1).toEqual([[false], [true]]);
    expect(split2).toEqual([
      [false, false],
      [false, true],
      [true, false],
      [true, true],
    ]);
    expect(split3).toEqual([
      [false, false, false],
      [false, false, true],
      [false, true, false],
      [false, true, true],
      [true, false, false],
      [true, false, true],
      [true, true, false],
      [true, true, true],
    ]);
    expect(split4).toEqual([
      [false, false, false, false],
      [false, false, false, true],
      [false, false, true, false],
      [false, false, true, true],
      [false, true, false, false],
      [false, true, false, true],
      [false, true, true, false],
      [false, true, true, true],
      [true, false, false, false],
      [true, false, false, true],
      [true, false, true, false],
      [true, false, true, true],
      [true, true, false, false],
      [true, true, false, true],
      [true, true, true, false],
      [true, true, true, true],
    ]);
  });

  it("generateVariableValues() method create correct truth sets", () => {
    const set1 = generator.generateVariableValues(mocks.propositionalAtom);
    const set2 = generator.generateVariableValues(mocks.firstSubFormula);
    const set3 = generator.generateVariableValues(mocks.secondSubFormula);
    const set4 = generator.generateVariableValues(mocks.propositionalFormula);
    const set5 = generator.generateVariableValues(
      mocks.contradictionRealizationFormula
    );

    expect(set1).toEqual([{ P: false }, { P: true }]);
    expect(set2).toEqual([{ P: false }, { P: true }]);
    expect(set3).toEqual([
      { P: false, Q: false },
      { P: false, Q: true },
      { P: true, Q: false },
      { P: true, Q: true },
    ]);
    expect(set4).toEqual([
      { P: false, Q: false },
      { P: false, Q: true },
      { P: true, Q: false },
      { P: true, Q: true },
    ]);
    expect(set5).toEqual([
      { P: false, Q: false, R: false },
      { P: false, Q: false, R: true },
      { P: false, Q: true, R: false },
      { P: false, Q: true, R: true },
      { P: true, Q: false, R: false },
      { P: true, Q: false, R: true },
      { P: true, Q: true, R: false },
      { P: true, Q: true, R: true },
    ]);
  });

  it("getVariables() method returns the array of variables from a formula", () => {
    const set1 = generator.getVariables(mocks.propositionalAtom);
    const set2 = generator.getVariables(mocks.firstSubFormula);
    const set3 = generator.getVariables(mocks.secondSubFormula);
    const set4 = generator.getVariables(mocks.propositionalFormula);
    const set5 = generator.getVariables(mocks.contradictionRealizationFormula);

    expect(set1).toEqual(["P"]);
    expect(set2).toEqual(["P"]);
    expect(set3).toEqual(["P", "Q"]);
    expect(set4).toEqual(["P", "Q"]);
    expect(set5).toEqual(["P", "Q", "R"]);
  });

  it("generateColumnsFromFormula() method returns a correct column array from a formula", () => {
    const set1 = generator.generateColumnsFromFormula(mocks.propositionalAtom);
    const set2 = generator.generateColumnsFromFormula(mocks.firstSubFormula);
    const set3 = generator.generateColumnsFromFormula(mocks.secondSubFormula);
    const set4 = generator.generateColumnsFromFormula(
      mocks.propositionalFormula
    );
    const set5 = generator.generateColumnsFromFormula(
      mocks.contradictionRealizationFormula
    );

    expect(set1).toEqual([
      {
        field: "P",
        depth: 0,
        operator: "VAR",
        title: "P",
        operands: [],
      },
    ]);
    expect(set2).toEqual([
      {
        field: "P",
        depth: 1,
        operator: "VAR",
        title: "P",
        operands: [],
      },
      {
        field: "¬ P",
        depth: 0,
        operator: "NOT",
        title: "¬ P",
        operands: ["P"],
      },
    ]);
    expect(set3).toEqual([
      {
        field: "P",
        depth: 2,
        operator: "VAR",
        title: "P",
        operands: [],
      },
      {
        field: "Q",
        depth: 2,
        operator: "VAR",
        title: "Q",
        operands: [],
      },
      {
        field: "P ∧ Q",
        depth: 1,
        operator: "AND",
        title: "P ∧ Q",
        operands: ["P", "Q"],
      },
      {
        field: "¬ P",
        depth: 1,
        operator: "NOT",
        title: "¬ P",
        operands: ["P"],
      },
      {
        field: "P ∧ Q ⇒ ¬ P",
        depth: 0,
        operator: "IMPLIES",
        title: "P ∧ Q ⇒ ¬ P",
        operands: ["P ∧ Q", "¬ P"],
      },
    ]);
    expect(set4).toEqual([
      {
        field: "P",
        depth: 3,
        operator: "VAR",
        title: "P",
        operands: [],
      },
      {
        field: "Q",
        depth: 3,
        operator: "VAR",
        title: "Q",
        operands: [],
      },
      {
        field: "P ∧ Q",
        depth: 2,
        operator: "AND",
        title: "P ∧ Q",
        operands: ["P", "Q"],
      },
      {
        field: "¬ P",
        depth: 2,
        operator: "NOT",
        title: "¬ P",
        operands: ["P"],
      },
      {
        field: "¬ P",
        depth: 1,
        operator: "NOT",
        title: "¬ P",
        operands: ["P"],
      },
      {
        field: "P ∧ Q ⇒ ¬ P",
        depth: 1,
        operator: "IMPLIES",
        title: "P ∧ Q ⇒ ¬ P",
        operands: ["P ∧ Q", "¬ P"],
      },
      {
        field: "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P",
        depth: 0,
        operator: "IMPLIES",
        title: "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P",
        operands: ["¬ P", "( P ∧ Q ) ⇒ ¬ P"],
      },
    ]);
    expect(set5).toEqual([
      {
        field: "P",
        depth: 5,
        operator: "VAR",
        title: "P",
        operands: [],
      },
      {
        field: "Q",
        depth: 5,
        operator: "VAR",
        title: "Q",
        operands: [],
      },
      {
        field: "R",
        depth: 5,
        operator: "VAR",
        title: "R",
        operands: [],
      },
      {
        field: "P ⇒ Q",
        depth: 4,
        operator: "IMPLIES",
        title: "P ⇒ Q",
        operands: ["P", "Q"],
      },
      {
        field: "¬ R",
        depth: 4,
        operator: "NOT",
        title: "¬ R",
        operands: ["R"],
      },
      {
        field: "P ⇒ Q",
        depth: 3,
        operator: "IMPLIES",
        title: "P ⇒ Q",
        operands: ["P", "Q"],
      },
      {
        field: "¬ P ⇒ Q",
        depth: 3,
        operator: "NOT",
        title: "¬ P ⇒ Q",
        operands: ["P ⇒ Q"],
      },
      {
        field: "¬ ¬ R",
        depth: 3,
        operator: "NOT",
        title: "¬ ¬ R",
        operands: ["¬ R"],
      },
      {
        field: "¬ P ⇒ Q",
        depth: 2,
        operator: "NOT",
        title: "¬ P ⇒ Q",
        operands: ["P ⇒ Q"],
      },
      {
        field: "¬ R",
        depth: 2,
        operator: "NOT",
        title: "¬ R",
        operands: ["R"],
      },
      {
        field: "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R",
        depth: 2,
        operator: "IMPLIES",
        title: "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R",
        operands: ["¬ ( P ⇒ Q )", "¬ ¬ R"],
      },
      {
        field: "P ⇒ Q",
        depth: 2,
        operator: "IMPLIES",
        title: "P ⇒ Q",
        operands: ["P", "Q"],
      },
      {
        field: "¬ ( P ⇒ Q ) ⇒ ¬ R",
        depth: 1,
        operator: "IMPLIES",
        title: "¬ ( P ⇒ Q ) ⇒ ¬ R",
        operands: ["¬ ( P ⇒ Q )", "¬ R"],
      },
      {
        field: "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q",
        depth: 1,
        operator: "IMPLIES",
        title: "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q",
        operands: ["¬ ( P ⇒ Q ) ⇒ ¬ ¬ R", "P ⇒ Q"],
      },
      {
        field: "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )",
        depth: 0,
        operator: "IMPLIES",
        title: "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )",
        operands: ["¬ ( P ⇒ Q ) ⇒ ¬ R", "( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )"],
      },
    ]);
  });

  it("calculateTableData() method returns correct truth sets for a formula", () => {
    const columns1 = generator.generateColumnsFromFormula(
      mocks.propositionalAtom
    );
    const columns2 = generator.generateColumnsFromFormula(
      mocks.firstSubFormula
    );
    const columns3 = generator.generateColumnsFromFormula(
      mocks.secondSubFormula
    );
    const columns4 = generator.generateColumnsFromFormula(
      mocks.propositionalFormula
    );
    const columns5 = generator.generateColumnsFromFormula(
      mocks.contradictionRealizationFormula
    );

    const set1 = generator.calculateTableData({
      formula: mocks.propositionalAtom,
      columns: columns1,
    });
    const set2 = generator.calculateTableData({
      formula: mocks.firstSubFormula,
      columns: columns2,
    });
    const set3 = generator.calculateTableData({
      formula: mocks.secondSubFormula,
      columns: columns3,
    });
    const set4 = generator.calculateTableData({
      formula: mocks.propositionalFormula,
      columns: columns4,
    });
    const set5 = generator.calculateTableData({
      formula: mocks.contradictionRealizationFormula,
      columns: columns5,
    });

    expect(set1).toEqual([
      { id: expect.any(String), P: "0" },
      { id: expect.any(String), P: "1" },
    ]);
    expect(set2).toEqual([
      { id: expect.any(String), P: "0", "¬ P": "1" },
      { id: expect.any(String), P: "1", "¬ P": "0" },
    ]);
    expect(set3).toEqual([
      {
        id: expect.any(String),
        P: "0",
        Q: "0",
        "P ∧ Q": "0",
        "¬ P": "1",
        "P ∧ Q ⇒ ¬ P": "1",
      },
      {
        id: expect.any(String),
        P: "0",
        Q: "1",
        "P ∧ Q": "0",
        "¬ P": "1",
        "P ∧ Q ⇒ ¬ P": "1",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "0",
        "P ∧ Q": "0",
        "¬ P": "0",
        "P ∧ Q ⇒ ¬ P": "1",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "1",
        "P ∧ Q": "1",
        "¬ P": "0",
        "P ∧ Q ⇒ ¬ P": "0",
      },
    ]);
    expect(set4).toEqual([
      {
        id: expect.any(String),
        P: "0",
        Q: "0",
        "P ∧ Q": "0",
        "¬ P": "1",
        "P ∧ Q ⇒ ¬ P": "1",
        "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P": "0",
      },
      {
        id: expect.any(String),
        P: "0",
        Q: "1",
        "P ∧ Q": "0",
        "¬ P": "1",
        "P ∧ Q ⇒ ¬ P": "1",
        "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P": "0",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "0",
        "P ∧ Q": "0",
        "¬ P": "0",
        "P ∧ Q ⇒ ¬ P": "1",
        "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P": "1",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "1",
        "P ∧ Q": "1",
        "¬ P": "0",
        "P ∧ Q ⇒ ¬ P": "0",
        "¬ P ⇒ ( P ∧ Q ) ⇒ ¬ P": "1",
      },
    ]);
    expect(set5).toEqual([
      {
        id: expect.any(String),
        P: "0",
        Q: "0",
        R: "0",
        "P ⇒ Q": "1",
        "¬ R": "1",
        "¬ P ⇒ Q": "0",
        "¬ ¬ R": "0",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "0",
        Q: "0",
        R: "1",
        "P ⇒ Q": "1",
        "¬ R": "0",
        "¬ P ⇒ Q": "0",
        "¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "0",
        Q: "1",
        R: "0",
        "P ⇒ Q": "1",
        "¬ R": "1",
        "¬ P ⇒ Q": "0",
        "¬ ¬ R": "0",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "0",
        Q: "1",
        R: "1",
        "P ⇒ Q": "1",
        "¬ R": "0",
        "¬ P ⇒ Q": "0",
        "¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "0",
        R: "0",
        "P ⇒ Q": "0",
        "¬ R": "1",
        "¬ P ⇒ Q": "1",
        "¬ ¬ R": "0",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "0",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "0",
        R: "1",
        "P ⇒ Q": "0",
        "¬ R": "0",
        "¬ P ⇒ Q": "1",
        "¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "0",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "1",
        R: "0",
        "P ⇒ Q": "1",
        "¬ R": "1",
        "¬ P ⇒ Q": "0",
        "¬ ¬ R": "0",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
      {
        id: expect.any(String),
        P: "1",
        Q: "1",
        R: "1",
        "P ⇒ Q": "1",
        "¬ R": "0",
        "¬ P ⇒ Q": "0",
        "¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ⇒ P ⇒ Q": "1",
        "¬ ( P ⇒ Q ) ⇒ ¬ R ⇒ ( ¬ ( P ⇒ Q ) ⇒ ¬ ¬ R ) ⇒ ( P ⇒ Q )": "0",
      },
    ]);
  });
});
