const info = require("debug")("app:info");
// Input validation
const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const db = require("../database/model");
const dbApi = require("../database/db-interface");

function validateGenre(name) {
  info("called with ", name);
  // validation object
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(name, schema);
}

router.get("/", async (req, res) => {
  try {
    const genres = await db.Genre.find().sort("name");

    if (!genres) {
      res.status(404).send("Genre not found.");
    }
    return res.send(genres);
  } catch (error) {
    return res.status.send(
      `An error ocurred while handling your request ${error}`
    );
  }
});

router.get("/create", (req, res) => {
  // creating dummy data - you must end the server before doing anything else otherwise it hangs
  try {
    const result = dbApi.makeGenres();
    if (result) {
      res.status(200).send("Genres created.");
    }
  } catch (error) {
    return res.send("Genres could not be created.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await db.Genre.findOne({ _id: req.params.id });
    if (!genre) {
      return res.status(404).send("Genre not found.");
    }
    return res.send(genre);
  } catch (error) {
    return res.send("Problem getting genre with id: ", req.params.id);
  }
});

router.post("/", async (req, res) => {
  // joi expects an object
  const validationResult = validateGenre(req.body);
  info(validationResult, validationResult.error);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  try {
    const result = await db.Genre.findOne({ name: req.body.name });

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

router.put("/:id", async (req, res) => {
  const validationResult = validateGenre(req.body);

  info(validationResult);
  if (validationResult.error) {
    return res
      .status(400)
      .send(
        "The name of a genre must be a string and must be at least 3 characters long."
      );
  }

  try {
    info("id is ", req.params.id);
    const result = await db.Genre.findOne({ _id: req.params.id });
    info("result is ", result.genre);
    if (result) {
      // update the genre
      result.name = req.body.name;

      try {
        const savedUpdate = await result.save();
        return res.status(200).send(savedUpdate);
      } catch (error) {
        return res.status(500).send("Problem updating the genre ", error);
      }
    } else {
      return res.status(404).send("Genre not found.");
    }
  } catch (error) {
    return res.status(500).send("autism beavers");
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const genres = await db.Genre.deleteMany();
    info(genres);

    return res.status(200).send(genres);
  } catch (error) {
    return res.status(500).send("Error deleting genres.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    info(req.params.id);
    const result = await db.Genre.findOne({ _id: req.params.id });

    if (!result) {
      return res.status(404).send("Genre not found.");
    }
    try {
      const deletedGenre = await db.Genre.deleteOne({ _id: req.params.id });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Genre not deleted.");
    }
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = router;
