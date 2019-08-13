const exercise1 = require("../exercise1");

/* if the input name is the same as the export name does that cause a problem? it seems to */

describe("fizzBuzz", () => {
  it("should return an exception if not given a number", () => {
    expect(() => exercise1.fizzBuzz("test")).toThrow();
  });

  it("should return FizzBuzz when given a number divisible by 3 and 5", () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toMatch(/FizzBuzz/);
  });

  it("should reutrn Fizz if a number is divisible by 3 without remainer only.", () => {
    const result = exercise1.fizzBuzz(3);
    expect(result).toMatch(/Fizz/);
  });

  it("should return Buzz if a number is divisble by 5 without remainer only.", () => {
    const result = exercise1.fizzBuzz(5);
    expect(result).toMatch(/Buzz/);
  });

  it("should return the given number if it is not divisible by 3 or 5 without remainder.", () => {
    const result = exercise1.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
