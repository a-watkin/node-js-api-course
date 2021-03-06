const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlengh: 1,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlengh: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlengh: 5,
    maxlength: 2048
  },
  isAdmin: Boolean
});

// adds a method to the user object
// don't use an arrow function you need access to this
userSchema.methods.generateAuthToken = function() {
  // you can store pretty much anything in the payload
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
    // config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      // this is the string the user inputs - not the hashed value
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
