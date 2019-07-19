const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const info = require("debug")("app:info");
const { Genre, genreSchema } = require("./genre");

mongoose
  .connect("mongodb://localhost/fucker", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// title
// genre objects
// numberInStock
// dailyRate

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: false
  },
  genres: [genreSchema],
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRate: {
    type: Number,
    default: 4.99
  }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  info("getting to validateMovie");
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    genres: Joi.array(),
    numberInStock: Joi.number(),
    dailyRate: Joi.number()
  };

  return Joi.validate(movie, schema);
}

// the validation is provided by mongoose
async function addMovie(title, genres, numberInStock = null, dailyRate = null) {
  try {
    // the args here are destructuring? it has to match the schema
    // i tried it as genre and it didn't work
    const movie = new Movie({ title, genres });

    // I can't quite get this working
    // const validationResult = validateMovie(movie);
    // if (validationResult.error) {
    //   info("validation error");
    //   info(validationResult.error.details[0].message);
    // }

    await movie.save();
  } catch (error) {
    info("error ", error);
  } finally {
    mongoose.disconnect();
    info("Disconnected");
  }
}

// createCustomer({
//   isGold: true,
//   name: "blah",
//   phone: "439745983798"
// });

addMovie("i robot", new Genre({ name: "sci-fi" }));

// module.exports = { Movie, validateMovie };
