const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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
    // or too specific - that elements at a place should have a given value
    // instead tests should just check if some meaningful value is in there somewhere
    // expect(result).toContain("USD");
    // expect(result).toContain("AUD");
    // expect(result).toContain("EUR");

    // checks these are in the array - they can be in any order
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return an object with the given id and a price", () => {
    const result = lib.getProduct(1);
    // toEqual is for object equality - this is an exact match no other properties allowed
    // expect(result).toEqual({ id: 1, price: 10 });

    // an object that has to contain the given properties but may have more
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // this approach does not work because the exception halts execution
    // const result = lib.registerUser(null);

    // wrapping the code in an arrow function is the way to do it
    const args = [null, undefined, "", 0, false];

    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  //   single assertion principle - the above it test but with one for each value

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("morty");
    expect(result).toMatchObject({ username: "morty" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply a 10% discount if customer has more than 10 points.", () => {
    // this bit seems pointless, it literally isn't used and it repeats code in the db module - which isn't really used
    db.getCustomerSync = function (customerId) {
      return { id: customerId, points: 20 };
    };

    // set up a fake customer order object
    const order = { customerId: 1, totalPrice: 10 };
    // applies the discount to the above object
    lib.applyDiscount(order);
    // test the above object has been discounted
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  // built in jest mock function - you can use it to return a value
  const mockFunction = jest.fn();
  mockFunction.mockReturnValue(1);
  // calling the function now gives 1
  const result = mockFunction();
  console.log(result);
  // mockFunction can also return a promise - this actually throws an error so it may have changed
  // const awaitResult = await mockFunction();

  // this also doesn't work
  // try {
  //   mockFunction.mockRejectedValue(new Error("..."));
  //   const result = await mockFunction();

  // } catch (error) {
  //   console.log("damn it");
  // }

  /* test interaction of two objects */
  it("should send an email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };

    let mailSend = false;
    mail.send = function (email, message) {
      mailSend = true;
    };

    lib.notifyCustomer({ customerId: 1 });

    expect(mailSend).toBe(true);
  });
});
