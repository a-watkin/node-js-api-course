const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("fuck skype and double fuck microsoft");
});

// the thing you export is the router
module.exports = router;
