const info = require("debug")("app:info");
// Input validation
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validateGenre, makeGenres } = require("../models/genre");

router.get("/create", authMiddleware, (req, res) => {
  // creating dummy data - you must end the server before doing anything else otherwise it hangs
  try {
    info("getting here?");
    const result = makeGenres();
    if (result) {
      res.status(200).send("Genres created.");
    }
  } catch (error) {
    return res
      .status(500)
      .send(`An error occured while processing your request. \n\n ${error}`);
  }
});

router.get("/", async (req, res, next) => {
  info("get genres called", Genre.find());
  try {
    const genres = await Genre.find().sort("name");
    info(genres);

    if (!genres) {
      res.status(404).send("Genre not found.");
    }
    return res.send(genres);
  } catch (error) {
    // calls error handling middleware defined in index.js
    next(ex);
    // return res.status.send(
    //   `An error ocurred while handling your request ${error}`
    // );
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    if (!genre) {
      return res.status(404).send("Genre not found.");
    }
    return res.send(genre);
  } catch (error) {
    return res.send("Problem getting genre with id: ", req.params.id);
  }
});

// middleware is the second argument
router.post("/", authMiddleware, async (req, res) => {
  // joi expects an object
  const validationResult = validateGenre(req.body);
  info(validationResult, validationResult.error);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  try {
    const result = await Genre.findOne({ name: req.body.name });

    if (result) {
      info("getting this far?");
      return res.status(409).send(result);
    } else {
      const genre = new Genre(req.body);
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

router.put("/:id", authMiddleware, async (req, res) => {
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
    const result = await Genre.findOne({ _id: req.params.id });
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

// this method is a bit dumb isn't it?
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const genres = await Genre.deleteMany();
    info(genres);

    return res.status(200).send(genres);
  } catch (error) {
    return res.status(500).send("Error deleting genres.");
  }
});

// each middleware in the array will be called in turn
router.delete("/:id", [authMiddleware, admin], async (req, res) => {
  try {
    info(req.params.id);
    const result = await Genre.findOne({ _id: req.params.id });

    if (!result) {
      return res.status(404).send("Genre not found.");
    }
    try {
      const deletedGenre = await Genre.deleteOne({ _id: req.params.id });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Genre not deleted.");
    }
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = router;
