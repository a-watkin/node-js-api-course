const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:dbDebugger");

mongoose
  .connect("mongodb://localhost/vidly", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  }
});

const Genre = mongoose.model("Genre", genreSchema);

// mongo doesn't care if you have a datatype or not
// it will accept anything

// so to enforce data types and required fields you can do like below. Anything missing or wrong will throw an error.

// the validation is provided by mongoose
async function createGenre(arr) {
  try {
    // manually trigger validation
    // const result = await course.validate();
    // validate returns a promise of void if everything works

    // validation happens automatically when you try to save a course
    const genre = new Genre(arr);

    const result = await genre.save();

    dbDebugger(result);
  } catch (error) {
    // the error object has properties for message, error, tags and categories that you can iterate over
    // console.log("hello...?", error.message, error.errors);

    for (field in error.errors) {
      // validation error object
      dbDebugger(error.errors[field].message);
    }
  } finally {
    mongoose.disconnect();
  }
}

// createGenre({
//   genre: "romance"
// });

async function getGenres() {
  try {
    const genres = await Genre.find();
    dbDebugger(genres);
    return genres;
  } catch (error) {
    dbDebugger("error", error);
  } finally {
    mongoose.disconnect();
  }
}

async function getGenre(id) {
  try {
    const genres = await Genre.findById(id);
    dbDebugger(genres);
    return genres;
  } catch (error) {
    dbDebugger("error", error);
  } finally {
    mongoose.disconnect();
  }
}

// getGenre("5d2654a1628ef126848e03a8");

async function updateGenre(id, newName) {
  try {
    const genre = await Genre.findById(id);
    // check genre exists
    if (!genre) {
      return;
    }
    genre.genre = newName;
    dbDebugger(genre);
    try {
      const result = await genre.save();
      dbDebugger(result);
      return result;
    } catch (error) {
      dbDebugger("problem saving ", error);
    }
  } catch (error) {
    dbDebugger("error", error);
  } finally {
    mongoose.disconnect();
  }
}

// updateGenre("5d2654a1628ef126848e03a8", "action");

async function deleteGenre(id) {
  try {
    const genres = await Genre.deleteOne({ _id: id });
    return genres;
  } catch (error) {
    dbDebugger("error deleting ", error);
  } finally {
    mongoose.disconnect();
  }
}

async function deleteAllGenres() {
  try {
    const genres = await Genre.deleteMany();
    return genres;
  } catch (error) {
    dbDebugger("error deleting ", error);
  } finally {
    mongoose.disconnect();
  }
}

// deleteAllGenres();

function makeGenres() {
  createGenre({ genre: "action" });
  createGenre({ genre: "comedy" });
  createGenre({ genre: "romance" });
  createGenre({ genre: "animation" });
}

// makeGenres();
// deleteGenre("5d2654a1628ef126848e03a8");

// CRUD
// create
// read - this always goes into two, get all of them and get 1 of them, you also probably want to limit results to 10 or so?
// update
// delete

const dbApi = {
  createGenre: createGenre(),
  getGenre: getGenre(),
  getGenres: getGenres(),
  updateGenre: updateGenre(),
  deleteGenre: deleteGenre(),
  deleteAllGenres: deleteAllGenres(),
  makeGenres: makeGenres()
};

module.exports = dbApi;
