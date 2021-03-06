// this is moshs' version

const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    // remember this is the user input values and not the model for the thing
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(movie, schema);
}

module.exports = { Movie, validateMovie, movieSchema };

// shorthand for module.exports
// exports.validate = validateMovie;
// exports.Movie = Movie;
// exports.movieSchema = movieSchema;
// combining them both doesn't seem to work
// module.exports = { Movie, movieSchema };
