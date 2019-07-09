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
    name: { type: String, required: true },
    author: String,
    tags: [String],
    // if isPublished is true then a price is required
    // you can't use an arrow function here because they do not have this in the right context
    price: {
      type: Number,
      required: function() {
        return this.isPublished;
      }
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
      isPublished: true,
      price: 400
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
