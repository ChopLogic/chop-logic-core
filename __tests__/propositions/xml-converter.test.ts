import converterXML from "../../src/propositions/xml-converter";
import tMocks from "../../__mocks__/table-items";

describe("Propositional xml converter tests", () => {
  it("dpToXML() method returns a correct array of dp table items", () => {
    const fileData = converterXML.dpToXML(tMocks.dpTableDataIE);
    expect(fileData).toEqual(tMocks.dpIEtoXML);
  });

  it("npToXML() method returns a correct array of np table items", () => {
    const fileData = converterXML.npToXML(tMocks.randomNaturalProof);
    expect(fileData).toEqual(tMocks.randomNaturalProofXML);
  });
});
