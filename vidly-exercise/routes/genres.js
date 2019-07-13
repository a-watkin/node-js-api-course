const info = require("debug")("app:info");
// Input validation
const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
// const db = require("../db-interface");
const db = require("../dbConnection");

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

// router.get("/", (req, res) => {
//   info("Get request received");
//   db.Genre.find()
//     .then(data => res.send(data))
//     .catch(err => res.send("Something went wrong...", err));
// });

router.get("/", async (req, res) => {
  const genres = await db.Genre.find().sort("genre");
  return res.send(genres);
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await db.Genre.findOne({ _id: req.params.id });
    return res.send(genre);
  } catch (error) {
    info("Problem getting genre with id: ", req.params.id);
    return res.send("autism beavers");
  }
});

router.post("/", async (req, res) => {
  info(req.body);

  try {
    const result = await db.Genre.findOne({ genre: req.body.genre });

    if (result) {
      info("getting this far?");
      return res.status(409).send(result);
    } else {
      const genre = new db.Genre(req.body);
      try {
        const newGenre = await genre.save();
        if (newGenre) {
          return res.send(newGenre);
        }
      } catch (error) {
        info(error);
      }
    }

    info(result);
  } catch (error) {
    info(error);
  }

  res.send("autism beavers");
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
