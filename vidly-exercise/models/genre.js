const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const info = require("debug")("app:info");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(name) {
  info("called with ", name);
  // validation object
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(name, schema);
}

async function createGenre(arr) {
  try {
    const genre = new Genre(arr);
    await genre.save();
  } catch (error) {
    // the error object has properties for message, error, tags and categories that you can iterate over
    // console.log("hello...?", error.message, error.errors);
    for (field in error.errors) {
      // validation error object
      info(error.errors[field].message);
    }
  } finally {
    mongoose.disconnect();
    info("Disconnected");
  }
}

function makeGenres() {
  info("makeGenres being called");
  createGenre({ name: "action" });
  createGenre({ name: "comedy" });
  createGenre({ name: "romance" });
  createGenre({ name: "animation" });
  return true;
}

module.exports = { Genre, validateGenre, genreSchema };
