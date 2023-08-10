import { testFunc } from "../src";

describe("Test", () => {
  it("testFunc 1", () => {
    expect(testFunc("test1")).toBe("test1");
  });

  it("testFunc 2", () => {
    expect(testFunc("test2")).toBe("test2");
  });

  it("testFunc 3", () => {
    expect(testFunc("test3")).toBe("test3");
  });
});
