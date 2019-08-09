const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User, validateUser, userSchema } = require("../models/user");
const info = require("debug")("app:info");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).send("No users found.");
    }
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send(`An error occured while handling your request ${error}`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const userCheck = await User.findOne({ email: req.body.email });
    if (userCheck) return res.status(400).send("User already exists.");

    // using pick helps to avoid malicious entries - i.e. the user sending more fields than excepted
    const user = new User(_.pick(req.body, ["name", "email", "password"]));
    // getting hashed password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    userSaveStatus = await user.save();
    if (userSaveStatus) {
      // pick lets you select properties from an object
      res.send(_.pick(user, ["_id", "name", "email"]));
    } else {
      res.status(500).send("There was a problem saving the user.");
    }
  } catch (error) {
    return res.send(`Problem creating user ${error}`);
  }
});

module.exports = router;
