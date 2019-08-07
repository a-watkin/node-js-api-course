const mongoose = require("mongoose");
const info = require("debug")("app:info");

const userSchema = new mongoose.model({
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
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlengh: 5,
    maxlength: 50
  }
});

function validateUser(user) {
  const schema = {
    usernanme: Joi.String()
      .min(1)
      .max(50)
      .required(),
    email: Joi.String()
      .min(5)
      .max(50)
      .required(),
    password: Joi.String()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = { User, validateUser, userSchema };
