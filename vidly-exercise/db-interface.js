const { mongoose, Genre } = require("./dbConnection");
const dbDebugger = require("debug")("app:dbDebugger");

// the validation is provided by mongoose
async function createGenre(arr) {
  try {
    const genre = new Genre(arr);
    const result = await genre.save();
    dbDebugger("what is result? ", result);
  } catch (error) {
    // the error object has properties for message, error, tags and categories that you can iterate over
    // console.log("hello...?", error.message, error.errors);
    for (field in error.errors) {
      // validation error object
      dbDebugger(error.errors[field].message);
    }
  } finally {
    mongoose.disconnect();
    dbDebugger("Disconnected");
  }
}

async function getGenres() {
  try {
    const genres = await Genre.find();
    dbDebugger(genres);
    return genres;
  } catch (error) {
    dbDebugger("error", error);
  } finally {
    mongoose.disconnect();
    dbDebugger("Disconnected from db.");
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

function makeGenres() {
  dbDebugger("makeGenres called...");
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
  createGenre: createGenre,
  getGenre: getGenre,
  getGenres: getGenres,
  updateGenre: updateGenre,
  deleteGenre: deleteGenre,
  deleteAllGenres: deleteAllGenres,
  makeGenres: makeGenres
};

module.exports = dbApi;
