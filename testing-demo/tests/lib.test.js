const lib = require("../lib");

describe("absolute", () => {
  it("should return positive number if input is positive.", () => {
    // just a positive integer
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number that is of the same magnitude as a negative input number.", () => {
    // just a positive integer
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return zero when given zero as input.", () => {
    // just a positive integer
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
