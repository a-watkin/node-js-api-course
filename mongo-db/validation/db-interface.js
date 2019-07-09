const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

// mongo doesn't care if you have a datatype or not
// it will accept anything

// so to enforce data types and required fields you can do like below. Anything missing or wrong will throw an error.

// the validation is provided by mongoose
async function createCourse() {
  const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
      // you can also use a regex
      // match: /pattern/
    },
    category: {
      type: String,
      // category has to be one of the below to pass validation
      enum: ["web", "frontend", "backend"],
      // automatically converts to lowercase
      lowercase: true,
      // uppsercase: true,
      // remove any proceeding or trailing whitespace
      trim: true
    },
    author: String,
    tags: {
      type: Array,
      // custom validation
      validate: {
        // async validator - for when you have to wait for some indeterminate amount of time for something to return
        isAsync: true,

        // v is short for value
        validator: function(v, callback) {
          setTimeout(() => {
            // Do async work
            const result = v && v.length > 0;
            callback(result);
          }, 100);

          // custom validation logic
          // v has to be greater than 0
          // return v && v.length > 0;
        },
        // provide a custom message to notify of validation errors
        message: "A course should have at least one tag"
      }
    },
    // if isPublished is true then a price is required
    // you can't use an arrow function here because they do not have this in the right context
    price: {
      type: Number,
      required: function() {
        return this.isPublished;
      },
      min: 10,
      max: 350,
      // custom schematype options
      // round price values to a whole number
      // it will automatically round when getting or setting the price so that it is a whole number

      // even if the value in the db is 15.8 it will be returned at 16 with this get method in place
      get: v => Math.round(v),
      set: v => Math.round(v)
    },
    data: { type: Date, default: Date.now },
    isPublished: Boolean
  });

  const Course = mongoose.model("Course", courseSchema);

  try {
    // manually trigger validation
    // const result = await course.validate();
    // validate returns a promise of void if everything works

    // validation happens automatically when you try to save a course
    const course = new Course({
      author: "Maya",
      name: "magic",
      tags: ["angular", "frontend"],
      // for testing custom validators
      // tags: null,
      isPublished: true,
      // test of automatic lowercase
      category: "FRONTEND",
      price: 350
    });

    const result = await course.save();

    console.log(result);
  } catch (error) {
    // the error object has properties for message, error, tags and categories that you can iterate over
    // console.log("hello...?", error.message, error.errors);

    for (field in error.errors) {
      // validation error object
      console.log(error.errors[field].message);
    }
  } finally {
    mongoose.disconnect();
  }
}

createCourse();

// export multiple things
// module.exports = { Course, mongoose };

// This attempt at exporting multiple things didn't work
// module.exports = Course;
// module.exports = mongoose;
