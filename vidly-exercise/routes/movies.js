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

router.post("/", async (req, res) => {
  try {
    const movie = req.body;
    const genres = movie.genres.map((elem, ind, arr) => {
      // info(elem, ind, arr);
      return (arr[ind] = new Genre({ name: elem }));
    });

    info(movie.title);

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

router.delete("/:id", (req, res) => {
  res.send("fuck you");
});

module.exports = router;
