const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

// console.log(userSchema.methods.generateAuthToken());

describe("generateAuthToken", () => {
  it("should return a valid JWT", () => {
    // console.log(config.get("jwtPrivateKey"));
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    // const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    expect(decoded).toMatchObject(payload);
  });
});
