const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello partner");
});

// the thing you export is the router
module.exports = router;
