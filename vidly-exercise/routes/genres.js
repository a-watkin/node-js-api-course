// Input validation
const Joi = require("@hapi/joi");
const express = require("express");
const genresRoutes = express.Router();

// dummy data
const genres = [
  { id: "1", name: "action" },
  { id: "2", name: "comdey" },
  { id: "3", name: "romance" },
  { id: "4", name: "animation" }
];

function validateGenre(cat) {
  // validation object
  const schema = {
    id: Joi.string().required(),
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(cat, schema);
}

genresRoutes.get("/", (req, res) => {
  return res.send(genres);
});

genresRoutes.get("/:id", (req, res) => {
  const cat = genres.find(c => c.id === req.params.id);

  if (!cat) {
    return res.status(404).send("Only dogs here.");
  }

  return res.send(cat);
});

genresRoutes.post("/", (req, res) => {
  const cat = genres.find(c => c.id === req.params.id);

  if (cat) {
    return res.status(409).send("Already present.");
  }

  const { error } = validateGenre(req.body);
  // for fuck sake this took too long
  if (error) {
    return res.status(409).send(error.details[0].message);
  }

  genres.push(req.body);
  console.log(genres);
  // 201 resource creates
  return res.status(201).send(req.body);
});

genresRoutes.put("/:id", (req, res) => {
  // check resource exists
  const cat = genres.find(c => c.id === req.params.id);

  if (!cat) {
    return res.status(404).send("Resource does not exist.");
  }

  // validate input
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // find the index in the collection
  const index = genres.indexOf(cat);
  // replace current object - remember you have to tell it how many to replace
  genres.splice(index, 1, req.body);
  console.log(genres);

  // send new object back to client
  return res.status(200).send(req.body);
});

genresRoutes.delete("/:id", (req, res) => {
  let catIndex = null;
  const cat = genres.find((c, index) => {
    if (c.id === req.params.id) {
      catIndex = index;
      return c.id === req.params.id;
    }
  });

  if (!cat) {
    return res.status(404).send("Resource does not exist.");
  }

  const deletedCat = genres.splice(catIndex, 1);
  res.status(200).send(deletedCat);
});

module.exports = genresRoutes;
