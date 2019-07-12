// Express framework
const express = require("express");
// logging
const morgan = require("morgan");
// So you DON'T captitalise express
const router = require("./routes/genres");

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
app.use("/api/genres", router);

// either use an env variable or 3000
// process global
const port = process.env.PORT || 5000;

// start the app listening
app.listen(port, () => {
  startupDebugger(`Listening on port ${port}`);
});
