const express = require("express");
// instead of app object you work with router object
// when decomposing stuff

// input validation module
const Joi = require("@hapi/joi");

const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

function validateCourse(course) {
  // you have to explicitly map out every input you expect like this if you have one not mentioned it won't work
  const schema = {
    id: Joi.string().required(),
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

router.get("/", (req, res) => {
  res.send([1, 2, 3]);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  // with joi
  if (error) {
    // sends helpful message generated by joi
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// the order of req and res matter
router.get("/:id", (req, res) => {
  //   console.log(req.params.id);
  //   res.send(`you picked course ${req.params.id}`);
  const course = courses.find(c => c.id === parseInt(req.params.id));
  console.log(course);
  if (!course) {
    // send is optional here for if you want to include a message
    return res.status(404).send("you dun goofed");
  }
  res.send(course);
});

router.put("/:id", (req, res) => {
  // look up course
  // the c value is actually the object in the array you're checking
  // the c.id is accessing it like a key
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // if not exist return 404
  if (!course) {
    return res.status(404).send("Course not found.");
  }

  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // update the course - he's just updating name
  // but actually you can safely do it because you validate the data above
  course.name = req.body.name;
  course.id = req.body.id;

  // return the updated course
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  console.log("course is ", course);

  if (!course) {
    return res
      .status(404)
      .send(
        `A course with the given ID of ${req.params.id} could not be found.`
      );
  }

  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(course);
});

// export the router for use in other files
module.exports = router;