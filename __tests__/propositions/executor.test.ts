import executor from "../../src/propositions/executor";
import mocks from "../../__mocks__/formula-items";
import tMocks from "../../__mocks__/table-items";

describe("Propositional executor tests:", () => {
  it("performIE() creates a correct modus ponens", () => {
    expect(
      executor.performIE(
        mocks.implicationEliminationFormula,
        mocks.implicationEliminationAntecedent
      )
    ).toEqual(mocks.implicationEliminationConsequent);
    expect(
      executor.performIE(
        mocks.implicationEliminationAntecedent,
        mocks.implicationEliminationFormula
      )
    ).toEqual(mocks.implicationEliminationConsequent);
    expect(
      executor.performIE(mocks.propositionalFormula, mocks.firstSubFormula)
    ).toEqual(mocks.secondSubFormula);
  });

  it("performIE() throws an error if arguments are not valid", () => {
    expect(() => {
      executor.performIE(
        mocks.implicationEliminationFormula,
        mocks.implicationEliminationConsequent
      );
    }).toThrow(Error);
    expect(() => {
      executor.performIE(mocks.propositionalFormula, mocks.secondSubFormula);
    }).toThrow(Error);
  });

  it("performCI() creates correct conjunctions", () => {
    const data = {
      level: 0,
      dataLength: 1,
      selectedItems: [tMocks.npTableCIandCE[0]],
      assumptionId: null,
    };
    expect(executor.performCI({ ...data })).toEqual([
      { ...tMocks.npTableCIandCE[1], id: expect.any(String) },
    ]);
  });

  it("performCE() creates correct conjunctions", () => {
    const data = {
      level: 0,
      dataLength: 2,
      selectedItems: [tMocks.npTableCIandCE[1]],
      assumptionId: null,
    };
    expect(executor.performCE({ ...data })).toEqual([
      { ...tMocks.npTableCIandCE[2], id: expect.any(String) },
      { ...tMocks.npTableCIandCE[3], id: expect.any(String) },
    ]);
  });

  it("performIEforNP() creates a correct modus ponens", () => {
    const data = {
      level: 1,
      dataLength: 2,
      selectedItems: [
        tMocks.npTableDataIEandII[0],
        tMocks.npTableDataIEandII[1],
      ],
      assumptionId: tMocks.npTableDataIEandII[1].assumptionId,
    };
    expect(executor.performIEforNP({ ...data })).toEqual({
      ...tMocks.npTableDataIEandII[2],
      id: expect.any(String),
    });
  });

  it("performII() should exit the sub-proof correctly", () => {
    const data = {
      level: 1,
      dataLength: 3,
      selectedItems: [
        tMocks.npTableDataIEandII[1],
        tMocks.npTableDataIEandII[2],
      ],
      assumptionId: null,
    };
    expect(executor.performII({ ...data })).toEqual({
      ...tMocks.npTableDataIEandII[3],
      id: expect.any(String),
    });
  });

  it("performDI() creates correct disjunctions", () => {
    const data = {
      level: 0,
      dataLength: 1,
      selectedItems: [tMocks.npTableDI[0]],
      assumptionId: null,
      rawInput: "f",
    };
    expect(executor.performDI({ ...data })).toEqual([
      { ...tMocks.npTableDI[1], id: expect.any(String) },
      { ...tMocks.npTableDI[2], id: expect.any(String) },
    ]);
  });

  it("performDE() eliminates the disjunction correctly", () => {
    const data = {
      level: 2,
      dataLength: 3,
      selectedItems: [
        tMocks.npTableDE[0],
        tMocks.npTableDE[1],
        tMocks.npTableDE[2],
      ],
      assumptionId: tMocks.npTableDE[2].assumptionId,
    };
    expect(executor.performDE({ ...data })).toEqual({
      ...tMocks.npTableDE[3],
      id: expect.any(String),
    });
  });

  it("performNI() creates a correct negation", () => {
    const data = {
      level: 1,
      dataLength: 2,
      selectedItems: [tMocks.npTableNIandNE[0], tMocks.npTableNIandNE[1]],
      assumptionId: tMocks.npTableNIandNE[1].assumptionId,
    };
    expect(executor.performNI({ ...data })).toEqual({
      ...tMocks.npTableNIandNE[2],
      id: expect.any(String),
    });
  });

  it("performNE() eliminates two negations correctly", () => {
    const data = {
      level: 1,
      dataLength: 3,
      selectedItems: [tMocks.npTableNIandNE[2]],
      assumptionId: tMocks.npTableNIandNE[2].assumptionId,
    };
    expect(executor.performNE({ ...data })).toEqual({
      ...tMocks.npTableNIandNE[3],
      id: expect.any(String),
    });
  });

  it("performEE() eliminates the equivalence correctly", () => {
    const data = {
      level: 1,
      dataLength: 4,
      selectedItems: [tMocks.npTableEIandEE[3]],
      assumptionId: tMocks.npTableEIandEE[3].assumptionId,
    };
    expect(executor.performEE({ ...data })).toEqual([
      { ...tMocks.npTableEIandEE[4], id: expect.any(String) },
      { ...tMocks.npTableEIandEE[5], id: expect.any(String) },
    ]);
  });

  it("performEE() should throw an error if the input is incorrect", () => {
    const data = {
      level: 0,
      dataLength: 1,
      selectedItems: [tMocks.npTableEIandEE[0]],
      assumptionId: tMocks.npTableEIandEE[0].assumptionId,
    };

    expect(() => {
      executor.performEE({ ...data });
    }).toThrow(Error);
  });

  it("performEI() creates correct equivalences", () => {
    const data = {
      level: 1,
      dataLength: 2,
      selectedItems: [tMocks.npTableEIandEE[0], tMocks.npTableEIandEE[1]],
      assumptionId: tMocks.npTableEIandEE[1].assumptionId,
    };
    expect(executor.performEI({ ...data })).toEqual([
      { ...tMocks.npTableEIandEE[2], id: expect.any(String) },
      { ...tMocks.npTableEIandEE[3], id: expect.any(String) },
    ]);
  });

  it("performEI() should throw an error if the input is incorrect", () => {
    const data = {
      level: 0,
      dataLength: 2,
      selectedItems: [tMocks.npTableEIandEE[0], tMocks.npTableEIandEE[3]],
      assumptionId: tMocks.npTableEIandEE[3].assumptionId,
    };

    expect(() => {
      executor.performEI({ ...data });
    }).toThrow(Error);
  });
});
