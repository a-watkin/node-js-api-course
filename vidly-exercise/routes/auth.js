const config = require("config");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const info = require("debug")("app:info");
const Joi = require("@hapi/joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    info("user is ", user);
    // intentionally vague return message of bad data
    if (!user) return res.status(400).send("Invalid email or password.");

    // the hashed password includes the salt
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // geenrates a web token with the object given in the first arg and the priate key in the second - also generates headers read more at jwt.io
    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
    res.send(token);
  } catch (error) {
    return res.send(`Some problem occured ${error}`);
  }
});

function validate(req) {
  const schema = {
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

  return Joi.validate(req, schema);
}

module.exports = router;
