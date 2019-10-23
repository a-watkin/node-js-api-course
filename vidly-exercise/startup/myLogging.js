// for logging to text file
const { format, transports } = require("winston");
const winston = require("winston");
const { combine, timestamp, prettyPrint, printf } = format;
// write winston logs to mongodb
require("winston-mongodb");

require("express-async-errors");

module.exports = function () {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  const logger = winston.createLogger({
    level: "debug",
    // formatting also doesn't seem to work
    // it also completely ignores any formatting for errors
    format: combine(timestamp(), prettyPrint()),
    defaultMeta: { service: "user-service" },
    // defining transports here doesn't seem to work
    transports: []
  });
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.simple()
      })
    );
  }

  // this only works here, if you add it to the transports above it does nothing
  // adding to logger also doesn't seem to work
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      format: combine(timestamp(), prettyPrint())
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      format: combine(timestamp(), prettyPrint())
    })
  );

  logger.exceptions.handle(
    new winston.transports.File({
      filename: "uncaughtExceptions.log"
    }),
    new winston.transports.Console()
  );

  // winston.exceptions.handle(
  //   new winston.transports.Console({
  //     format: combine(timestamp(), prettyPrint(), colorize())
  //   })
  // );

  // this no longer works with logger.exception.handle - but it does the same thing
  // process.on("uncaughtException", ex => {
  //   throw ex;
  // });

  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
