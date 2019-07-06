const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  data: { type: Date, default: Date.now },
  isPublished: Boolean
});

// compile schema into a model
// name of the collection and the schema that defines it
// you don't need to have the date here because it's defined above as having a default value
const Course = mongoose.model("Course", courseSchema);

// inside an async function because it's and asynchronous operation
async function createCourse() {
  try {
    const course = new Course({
      name: "Node.js Course",
      author: "A",
      tags: ["React", "frontend"],
      isPublished: true
    });

    // asynchronous operation
    // when it's done result will contain the databse object
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log("Something went wrong, ", error);
  }
}

// createCourse();

// get all documents
async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

getCourses();
