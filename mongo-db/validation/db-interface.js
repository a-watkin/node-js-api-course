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
      enum: ["web", "frontend", "backend"]
    },
    author: String,
    tags: {
      type: Array,
      // custom validation
      validate: {
        // v is short for value
        validator: function(v) {
          // custom validation logic
          // v has to be greater than 0
          return v && v.length > 0;
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
      max: 350
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
      // tags: ["angular", "frontend"],
      tags: null,
      isPublished: true,
      category: "frontend",
      price: 350
    });

    const result = await course.save();

    console.log(result);
  } catch (error) {
    console.log(error);
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
