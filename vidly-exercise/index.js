// moved here from rental.js in models to make available to entire app
const Joi = require("@hapi/joi");
// passes Joi to the function retuned by joi-objectid
Joi.objectId = require("joi-objectid")(Joi);

// Express framework
// So you DON'T capitalise express
const express = require("express");

// error handling middleware
const errorMiddleware = require("./middleware/error");

// logging
const morgan = require("morgan");
// routes
const genreRouter = require("./routes/genre");
const customerRouter = require("./routes/customer");
const movieRouter = require("./routes/movie");
const rentalRouter = require("./routes/rental");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// loads configs
const config = require("config");
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

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  // global kill app - 1 indicated an error 0 is success
  process.exit(1);
}

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
