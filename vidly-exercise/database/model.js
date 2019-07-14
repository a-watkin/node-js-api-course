const mongoose = require("mongoose");
const dbInfo = require("debug")("app:dbConnection");

// tried to put all this in a callable function and it seemed to work but getting documents caused it to complain
mongoose
  .connect("mongodb://localhost/vidly", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  }
});

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  phone: {
    type: String,
    required: false
  }
});

const Genre = mongoose.model("Genre", genreSchema);
const Customer = mongoose.model("Customer", customerSchema);

// the validation is provided by mongoose
async function createCustomer(arr) {
  try {
    const genre = new Customer(arr);
    const result = await genre.save();
    dbInfo("what is result? ", result);
  } catch (error) {
    // the error object has properties for message, error, tags and categories that you can iterate over
    // console.log("hello...?", error.message, error.errors);
    for (field in error.errors) {
      // validation error object
      dbInfo(error.errors[field].message);
    }
  } finally {
    mongoose.disconnect();
    dbInfo("Disconnected");
  }
}

// createCustomer({
//   isGold: true,
//   name: "blah",
//   phone: "439745983798"
// });

module.exports = { Genre, Customer };
