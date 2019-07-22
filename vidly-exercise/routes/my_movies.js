const info = require("debug")("app:info");
// Input validation
const express = require("express");
const router = express.Router();
const { Movie, validateMovie, addMovie } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("/create", (req, res) => {
  try {
    addMovie("the shape of water", new Genre({ name: "fantasy" }));
  } catch (error) {
    info("error adding movie ", error);
  }
  res.send("test");
});

router.get("/", async (req, res) => {
  // query to get all movies
  Movie.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => info("problem getting movies: ", err));
});

router.get("/:id", async (req, res) => {
  Movie.findOne({ _id: req.params.id })
    .then(result => {
      res.send(result);
    })
    .catch(err => info("not finding that movie"));
});

function mapToGenres(genres) {
  return genres.map((elem, ind, arr) => {
    return (arr[ind] = new Genre({ name: elem }));
  });
}

router.post("/", async (req, res) => {
  try {
    const genres = mapToGenres(req.body.genres);
    const title = req.body.title;

    const newMovie = new Movie({
      title,
      genres
    });

    const saveResult = await newMovie
      .save()
      .then(result => res.send(result))
      .catch(err => res.send("problem saving", err));

    // res.send(movie);
  } catch (error) {
    info(error);
  }
});

// get
// post
// put
// delete

router.put("/:id", async (req, res) => {
  // returns the document as it was before update currently
  try {
    const currMovie = await Movie.findOne({ _id: req.params.id });
    if (!currMovie) {
      return res.status(400).send("movie not found");
    }
    info(req.params.id);

    // make any new genres into Genre objects
    req.body.genres = mapToGenres(req.body.genres);
    const combined = { ...currMovie._doc, ...req.body };

    try {
      info("combined is ", combined);
      // The default is to return the original, unaltered document. If you want the new, updated document to be returned you have to pass an additional argument: an object with the new property set to true.
      // the above still didn't work for me

      // this seems to work better

      // {new: true} does not work even a little
      const update = await Movie.findOneAndUpdate(
        combined
        // i also tried passing args in {} before below and it still didn't work
        // { new: true }
      );
      info("update here ", update);
      if (!update) {
        info("update not populated", update);
      }

      info("update is ", update);
      return res.send(update);
    } catch (error) {
      info("problem saving update ", error);
    }
  } catch (error) {
    return res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteMovie = await Movie.findOneAndRemove({ _id: req.params.id });
    res.send(deleteMovie);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
