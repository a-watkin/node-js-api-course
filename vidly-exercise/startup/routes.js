/* Contain all the routes and  middleware*/
// Express framework
// So you DON'T capitalise express
// one instance per app
const express = require("express");
// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");
// routes
const genreRouter = require("../routes/genre");
const customerRouter = require("../routes/customer");
const movieRouter = require("../routes/movie");
const rentalRouter = require("../routes/rental");
const returnsRouter = require("../routes/returns");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");

// error handling middleware - this should go last i think?
const errorMiddleware = require("../middleware/error");

module.exports = function (app) {
  // routes
  // tells express to ue helmet to secure http headers
  // should be applied early to be effective
  app.use(helmet());
  // tell express to use JSON - you MUST put this before an routes
  app.use(express.json());
  app.use("/api/genres", genreRouter);
  // to plural or not to plural that is the annoying question
  app.use("/api/customers", customerRouter);
  app.use("/api/movies", movieRouter);
  app.use("/api/rentals", rentalRouter);
  app.use("/api/user", userRouter);
  app.use("/api/returns", returnsRouter);
  app.use("/api/auth", authRouter);

  // error handling
  // err is built into express

  // because this middleware is after the above middleware it will go here after some error, next is called by the middleware above to get here
  app.use(errorMiddleware);
};
