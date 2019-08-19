const info = require("debug")("app:info");
// Input validation
const express = require("express");
const router = express.Router();

// these imports not used
// const mongoose = require("mongoose");

const validateObjectId = require("../middleware/vlaidateObjectId");
const asyncMiddleware = require("../middleware/async");
const authMiddleware = require("../middleware/auth");

const admin = require("../middleware/admin");
const { Genre, validateGenre, makeGenres } = require("../models/genre");

// router.get("/create", authMiddleware, (req, res) => {
//   // creating dummy data - you must end the server before doing anything else otherwise it hangs
//   try {
//     info("getting here?");
//     const result = makeGenres();
//     if (result) {
//       res.status(200).send("Genres created.");
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .send(`An error occured while processing your request. \n\n ${error}`);
//   }
// });

// router.get(
//   "/",
//   asyncMiddleware(async (req, res, next) => {
//     const genres = await Genre.find().sort("name");
//     res.send(genres);
//   })
// );

// the above error handling is now provided by express-async-errors
// it inject and wraps the function body with a try catch block
router.get("/", async (req, res) => {
  // throwing error to test logging with winston
  // throw new Error("Could not even");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  // needed because winston handles 500 errors and a value here that can't be cast to a valid objectId will cause winston to return 500 via middleware errors

  // moved to middleware
  // if (!mongoose.Types.ObjectId.isValid(req.params.id))
  //   return res.status(404).send("Invalid ID.");

  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID does not exist.");

  res.send(genre);
});

// middleware is the second argument
router.post("/", authMiddleware, async (req, res) => {
  // joi expects an object
  const validationResult = validateGenre(req.body);
  // info(validationResult, validationResult.error);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);

  // try {
  //   const result = await Genre.findOne({ name: req.body.name });

  //   if (result) {
  //     info("getting this far?");
  //     return res.status(409).send(result);
  //   } else {
  //     const genre = new Genre(req.body);
  //     try {
  //       const newGenre = await genre.save();
  //       if (newGenre) {
  //         return res.send(newGenre);
  //       }
  //     } catch (error) {
  //       info(error);
  //     }
  //   }
  //   info(result);
  // } catch (error) {
  //   info(error);
  // }
  // res.send("autism beavers");
});

router.put("/:id", authMiddleware, async (req, res) => {
  const validationResult = validateGenre(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send(
        "The name of a genre must be a string between 5 and 50 characters long."
      );
  }

  const result = await Genre.findOne({ _id: req.params.id });

  if (!result) {
    return res.status(404).send("Genre not found.");
  }

  result.name = req.body.name;
  const savedUpdate = await result.save();
  return res.status(200).send(savedUpdate);
});

// this method is a bit dumb isn't it?
// router.delete("/delete", authMiddleware, async (req, res) => {
//   try {
//     const genres = await Genre.deleteMany();
//     info(genres);

//     return res.status(200).send(genres);
//   } catch (error) {
//     return res.status(500).send("Error deleting genres.");
//   }
// });

// each middleware in the array will be called in turn
router.delete("/:id", [authMiddleware, admin], async (req, res) => {
  const result = await Genre.findOne({ _id: req.params.id });

  if (!result) {
    return res.status(404).send("Genre not found.");
  }

  await Genre.deleteOne({ _id: req.params.id });
  return res.status(200).send(result);
});

module.exports = router;
