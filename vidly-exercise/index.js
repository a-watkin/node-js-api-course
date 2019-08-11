// dotenv
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.log("Problem with env variables.");
  throw result.error;
}

console.log(result.parsed);

/* CHANGE THIS */
if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  // global kill app - 1 indicated an error 0 is success
  process.exit(1);
}
console.log(process.env.jwtPrivateKey);
/* ABOVE - CONFIG */

// monkey patches in async error handling - wraps end points in a try catch block in the same way as in asyncMiddleware
// requiring it here is all that's necessary - it doesn't have to be stored as a constant
require("express-async-errors");

// for logging
// defualt is ok for small to medium apps only larget apps need to define a custom logger for different parts of the app
const winston = require("winston");
// write winston logs to mongodb
require("winston-mongodb");

// comes with a 'transport' for logging messages from the console
winston.add(new winston.transports.File({ filename: "logfile.log" }));

// this doens't work well
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
    level: "silly"
  })
);

// moved here from rental.js in models to make available to entire app
const Joi = require("@hapi/joi");
// passes Joi to the function retuned by joi-objectid
Joi.objectId = require("joi-objectid")(Joi);

// Express framework
// So you DON'T capitalise express
const express = require("express");

// write process exception that happen with the app outside the context of express
// such as mongodb going down
process.on("uncaughtException", ex => {
  console.log("AN EXCEPTION OCCURED");
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("uncaughtException", ex => {
  console.log("UNHANDLED EXCEPTION REJECTION");
  winston.error(ex.message, ex);
  process.exit(1);
});

// error handling middleware
const errorMiddleware = require("./middleware/error");

// logging - to the console
const morgan = require("morgan");
// routes
const genreRouter = require("./routes/genre");
const customerRouter = require("./routes/customer");
const movieRouter = require("./routes/movie");
const rentalRouter = require("./routes/rental");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const info = require("debug")("app:info");
info(process.env);

// you can have multiple debuggers
const startupDebugger = require("debug")("app:startup");
// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");
// express instance
const app = express();

// two ways to get env variables
console.log(app.get("env"));
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const mongoose = require("mongoose");
// trying to surpress depreciation warning that has cropt up since adding a hashed password
mongoose.set("useCreateIndex", true);

const dbInfo = require("debug")("app:dbInfo");

// it seems making the connection here makes it available throughout the app?
mongoose
  .connect("mongodb://localhost/vidly", { useNewUrlParser: true })
  .then(() => dbInfo("Connected to MongoDB..."))
  .catch(err => dbInfo("Could not connect to mongodb..."));

// enabling logging only if env is development
if (app.get("env") === "development") {
  // logging module - it logs http requests, tiny being the level of logging
  app.use(morgan("tiny"));
  // debugger equivalent of above
  startupDebugger("Morgan enabled...");
}

// tells express to ue helmet to secure http headers
// should be applied early to be effective
app.use(helmet());
// tell express to use JSON - you MUST put this before an routes
app.use(express.json());
app.use("/api/genres", genreRouter);
// to plural or not to plural that is fucking annoying
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// error handling
// err is built into express

// because this middleware is after the above middlewares it will go here after some error, next is called by the middleware above to get here
app.use(errorMiddleware);

// either use an env variable or 3000
// process global
const port = process.env.PORT || 5000;

// start the app listening
app.listen(port, () => {
  startupDebugger(`Listening on port ${port}`);
});
