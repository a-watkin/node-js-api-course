const mongoose = require("mongoose");

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");
  // remember that you need to pass control to the next middleware
  next();
};
