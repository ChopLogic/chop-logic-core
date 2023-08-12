import { helloWorld } from "../src/index";
import npmPackage from "../src/index";

describe("NPM Package", () => {
  it("should be an object", () => {
    expect(npmPackage).toBeInstanceOf(Object);
  });

  it("should have a helloWorld property", () => {
    expect(npmPackage).toHaveProperty("helloWorld");
  });
});

describe("Hello World Function", () => {
  it("should be a function", () => {
    expect(helloWorld).toBeInstanceOf(Function);
  });

  it("should return the hello world message", () => {
    const expected = "Hello World from my example modern npm package!";
    const actual = helloWorld();
    expect(actual).toBe(expected);
  });
});
