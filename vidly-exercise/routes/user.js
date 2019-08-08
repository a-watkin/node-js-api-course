const express = require("express");
const router = express.Router();
const { User, validateUser, userSchema } = require("../models/user");
const info = require("debug")("app:info");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const userCheck = await User.findOne({ email: req.body.email });
    if (userCheck) return res.status(400).send("User already exists.");

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    info(user);

    userSaveStatus = await user.save();
    if (userSaveStatus) {
      res.send(user);
    } else {
      res.status(500).send("There was a problem saving the user.");
    }
  } catch (error) {
    return res.send(`Problem creating user ${error}`);
  }
});

module.exports = router;
