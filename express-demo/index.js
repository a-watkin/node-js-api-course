// input validation module
const Joi = require("@hapi/joi");

const express = require("express");
// called app by convention
const app = express();

// tells express to use json, it does this via middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  // joi vlidation is the same as below
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Invalid input");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// the order of req and res matter
app.get("/api/courses/:id", (req, res) => {
  //   console.log(req.params.id);
  //   res.send(`you picked course ${req.params.id}`);
  const course = courses.find(c => c.id === parseInt(req.params.id));
  console.log(course);
  if (!course) {
    // send is optional here for if you want to include a message
    res.status(404).send("you dun goofed");
  }
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // it's literally an object of the names and values
  //   http://localhost:5000/api/posts/1993/3
  // gives {"year":"1993","month":"3"}
  res.send(req.params);
});

app.get("/api/cars/:make/:model", (req, res) => {
  // it's literally an object of the names and values
  // http://localhost:5000/api/cars/ford/focus?sortBy=name
  // gives {"sortBy":"name"}
  res.send(req.query);
});

// app.post();

// app.put();

// app.delete();

// either use an env variable or 3000
// process global
const port = process.env.PORT || 3000;

// callback function is optional
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
