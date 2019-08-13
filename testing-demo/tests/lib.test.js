const lib = require("../lib");

// for grouping related tests
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

describe("greet", () => {
  it("Should return Welcome along with the given string.", () => {
    const result = lib.greet("Maya");
    // expect(result).toBe("Welcome Maya");
    // expect(result).toMatch(/Maya/);
    expect(result).toContain("Maya");
  });
});

describe("getCurrencies", () => {
  it("should return an array of currencies.", () => {
    const result = lib.getCurrencies();

    // tests on arrays should not be to general - that it's defined
    // or too sepcific - that elents at a place have a given value
    // instead tests should just check if some meaningful value is in there somewhere
    // expect(result).toContain("USD");
    // expect(result).toContain("AUD");
    // expect(result).toContain("EUR");

    // checks these are in the array - they can be in any order
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});
