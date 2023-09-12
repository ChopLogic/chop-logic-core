import npmPackage from "../src/index";

describe("NPM Package", () => {
  it("should be an object", () => {
    expect(npmPackage).toBeInstanceOf(Object);
  });

  it("should have a propositionalConverter property", () => {
    expect(npmPackage).toHaveProperty("propositionalConverter");
  });

  it("should have a propositionalXMLConverter property", () => {
    expect(npmPackage).toHaveProperty("propositionalXMLConverter");
  });

  it("should have a truthTableGenerator property", () => {
    expect(npmPackage).toHaveProperty("truthTableGenerator");
  });

  it("should have a propositionalExecutor property", () => {
    expect(npmPackage).toHaveProperty("propositionalExecutor");
  });

  it("should have a propositionalValidator property", () => {
    expect(npmPackage).toHaveProperty("propositionalValidator");
  });

  it("should have a propositionalReplacer property", () => {
    expect(npmPackage).toHaveProperty("propositionalReplacer");
  });
});
