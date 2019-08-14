const { userSchema } = require("../user");

// console.log(userSchema.methods.generateAuthToken());

describe("generateAuthToken", () => {
  it("should return a token", () => {
    const result = userSchema.methods.generateAuthToken();
    expect(result).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });
});
