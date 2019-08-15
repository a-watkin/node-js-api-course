const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

// console.log(userSchema.methods.generateAuthToken());

describe("generateAuthToken", () => {
  it("should return a token", () => {
    // console.log(config.get("jwtPrivateKey"));
    const payload = { _id: new mongoose.Types.ObjectId(), isAdmin: true };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, "fuckyou");

    console.log(decoded);
    expect(decoded.toContain(payload));
  });
});
