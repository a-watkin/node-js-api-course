// Express framework
const express = require("express");
// logging
const morgan = require("morgan");
// So you DON'T captitalise express
const router = require("./routes/genres");

// you can have multiple debuggers
const startupDebugger = require("debug")("app:startup");

// express instance
const app = express();
// logging module - it logs http requests, tiny being the level of logging
app.use(morgan("tiny"));
startupDebugger("Morgan enabled...");
// tell express to use JSON - you MUST put this before an routes
app.use(express.json());
app.use("/api/genres", router);

// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());

// either use an env variable or 3000
// process global
const port = process.env.PORT || 3000;

// start the app listening
app.listen(port, () => {
  startupDebugger(`Listening on port ${port}`);
});
