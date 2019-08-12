/* START - CONFIG */
// dotenv
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.log("Problem with env variables.");
  throw result.error;
}

// console.log(result.parsed);
if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  // global kill app - 1 indicated an error 0 is success
  process.exit(1);
}
console.log(process.env.jwtPrivateKey);
/* END - CONFIG */

// logging - to the console
const morgan = require("morgan");

// you can have multiple debuggers
const startupDebugger = require("debug")("app:startup");

// Express framework
// So you DON'T capitalise express
// one instance per app
const express = require("express");

// monkey patches in async error handling - wraps end points in a try catch block in the same way as in asyncMiddleware
// requiring it here is all that's necessary - it doesn't have to be stored as a constant
//
// is this middleware?
//
require("express-async-errors");

// moved here from rental.js in models to make available to entire app
//
// does it?
//
const Joi = require("@hapi/joi");
// passes Joi to the function retuned by joi-objectid
Joi.objectId = require("joi-objectid")(Joi);

// express instance
const app = express();

// calling logging elements
require("./startup/logging")(app);

// routes ruturns a function where app is passed as a variable
require("./startup/routes")(app);
// the () after require calls the function held in this file
// it doesn't need an argument as it just connects to the db
// this is a bit confusing
require("./startup/db")();

// two ways to get env variables
console.log(app.get("env"));
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// either use an env variable or 3000
// process global
const port = process.env.PORT || 5000;

// enabling logging only if env is development
if (app.get("env") === "development") {
  // logging module - it logs http requests, tiny being the level of logging
  app.use(morgan("tiny"));
  // debugger equivalent of above
  startupDebugger("Morgan enabled...");
}

// const startupDebugger = require("./startup/logging");
// start the app listening
app.listen(port, () => {
  // startupDebugger(`Listening on port ${port}`);
});
