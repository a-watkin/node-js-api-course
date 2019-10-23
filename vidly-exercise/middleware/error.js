const winston = require("winston");

module.exports = function (err, req, res, next) {
  // passing err as the second arg logs all the properties of the error object

  // this repeats the error message in the log file
  // it also doesn't log err object with mongodb
  // seems that both winston and the package to write it to the db have changed a lot
  winston.error(err.message, err);

  // logging levels
  // error - most important indicating a critical problem
  // warn
  // info - like connected to mongodb
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
};
