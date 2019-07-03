// Allows for turning on and off debugging messages
// second argument here is an arbitrary namespace
// you can have multiple debuggers
const startupDebugger = require("debug")("app:startup");
// db example
const dbDebugger = require("debug")("app:db");
// loads configs
const config = require("config");

// for logging
const morgan = require("morgan");

const express = require("express");
// called app by convention
const app = express();

// import courses as router object
const courses = require("./routes/courses");
// path and router object - this prefixes routes in courses
app.use("/api/courses", courses);

// enabling logging only if env is development
if (app.get("env") === "development") {
  // logging module - it logs http requests, tiny being the level of logging
  app.use(morgan("tiny"));
  // debugger equivalent of above
  startupDebugger("Morgan enabled...");
}

// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());

// BUILT IN MIDDLEWARE
// tells express to use json, it does this via middleware
app.use(express.json());

// parses urls with url encoded payloads, eg key=value&key=value
// extends means it can also take complex objects from the url
// like lists and array
app.use(express.urlencoded({ extended: true }));

// tells the app where to find static content
// so anything in the public folder can be accesses through the browser
// the content is served from the root of the site
// localhost:5000/readme.txt
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello world");
});

// either use an env variable or 3000
// process global
const port = process.env.PORT || 3000;

// callback function is optional
app.listen(port, () => {
  startupDebugger(`Listening on port ${port}`);
});
