const config = require("config");
const winston = require("winston");
const mongoose = require("mongoose");
// trying to surpress depreciation warning that has cropt up since adding a hashed password
mongoose.set("useCreateIndex", true);

// this didn't work until i passed it the app instance
// i guess it uses it implicitly somehow?
module.exports = function() {
  const db = config.get("db");
  // it seems making the connection here makes it available throughout the app?
  mongoose
    .connect(db, { useNewUrlParser: true })
    // now using winston instead of logging to console
    .then(() => winston.info(`Connected to ${db}`));
  // catch no longer needed? all it was going was logging to console before
  // i guess winston in index.js cataches exceptions? yeah it's global in scope to this app
  // .catch(err => console.log("Could not connect to mongodb...", err));
};
