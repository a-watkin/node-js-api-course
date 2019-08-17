const winston = require("winston");
// logging - to the console
const morgan = require("morgan");
// you can have multiple debuggers
const startupDebugger = require("debug")("app:startup");
// Express framework
// So you DON'T capitalise express
// one instance per app
const express = require("express");

/*  */
// moved here from rental.js in models to make available to entire app
//
// does it?
//
// const Joi = require("@hapi/joi");
// passes Joi to the function retuned by joi-objectid
// Joi.objectId = require("joi-objectid")(Joi);
/*  */

// express instance
const app = express();
// calling logging elements
require("./startup/myLogging")();
// require("./startup/logging");

// routes ruturns a function where app is passed as a variable
require("./startup/routes")(app);
// the () after require calls the function held in this file
// it doesn't need an argument as it just connects to the db
// this is a bit confusing
require("./startup/db")();
require("./startup/config")();

// for testing winston
// const p = Promise.reject(new Error("I AM SUCH A FAILURE"));

// two ways to get env variables
// console.log(app.get("env"));
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// either use an env variable or 5000
// process global
const port = process.env.PORT || 5000;

// enabling logging only if env is development
if (app.get("env") === "development") {
  // logging module - it logs http requests, tiny being the level of logging
  app.use(morgan("tiny"));
  // debugger equivalent of above
  startupDebugger("Morgan enabled...");
}

app.listen(port, () => {
  // don't use log here because it's a symbol and dynamically changing it isn't allowed
  winston.info(`Listening on port ${port}`);
});

// DEBUG=app:info nodemon
