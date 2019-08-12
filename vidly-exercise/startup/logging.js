// for logging
// defualt is ok for small to medium apps only larget apps need to define a custom logger for different parts of the app
const winston = require("winston");
// write winston logs to mongodb
require("winston-mongodb");

// monkey patches in async error handling - wraps end points in a try catch block in the same way as in asyncMiddleware
// requiring it here is all that's necessary - it doesn't have to be stored as a constant
//
// is this middleware? it seems so
//
require("express-async-errors");

module.exports = function() {
  //   const winston = require("winston");
  // comes with a 'transport' for logging messages from the console
  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  // this doens't work well
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "silly"
    })
  );

  // logging uncaughtExceptions with winston
  // i think this can only be used for unhandled exceptions?
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // process.on("uncaughtException", ex => {
  //   // this does the same as below - in this same body
  //   throw ex;

  //   // winston.error(ex.message, ex);
  //   // process.exit(1);
  // });
};
