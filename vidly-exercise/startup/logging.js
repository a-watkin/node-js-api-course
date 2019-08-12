// for logging
// defualt is ok for small to medium apps only larget apps need to define a custom logger for different parts of the app
const winston = require("winston");
// write winston logs to mongodb
require("winston-mongodb");

module.exports = function(app) {
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

  process.on("uncaughtException", ex => {
    // this does the same as below - in this same body
    throw ex;

    // winston.error(ex.message, ex);
    // process.exit(1);
  });

  process.on("uncaughtException", ex => {
    console.log("UNHANDLED EXCEPTION REJECTION");
    winston.error(ex.message, ex);
    process.exit(1);
  });
};
