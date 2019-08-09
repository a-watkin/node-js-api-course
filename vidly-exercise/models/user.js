const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
  }
});

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
      .max(2048)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = { User, validateUser, userSchema };
