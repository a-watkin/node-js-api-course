const mongoose = require("mongoose");
const dbConnection = require("debug")("app:dbConnection");

// tried to put all this in a callable function and it seemed to work but getting documents caused it to complain
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

module.exports = { Genre, mongoose };
