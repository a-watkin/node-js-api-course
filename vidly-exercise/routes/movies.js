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

module.exports = router;
