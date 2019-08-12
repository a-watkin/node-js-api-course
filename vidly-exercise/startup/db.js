const winston = require("winston");
const mongoose = require("mongoose");
// trying to surpress depreciation warning that has cropt up since adding a hashed password
mongoose.set("useCreateIndex", true);

// this didn't work until i passed it the app instance
// i guess it uses it implicitly somehow?
module.exports = function() {
  // it seems making the connection here makes it available throughout the app?
  mongoose
    .connect("mongodb://localhost/vidly", { useNewUrlParser: true })
    // now using winston instad of logging to console
    .then(() => winston.info("Connected to MongoDB..."));
  // catch no longer needed? all it was going was logging to console before
  // i guess winston in index.js cataches exceptions? yeah it's global in scope to this app
  // .catch(err => console.log("Could not connect to mongodb...", err));
};
