const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

// eq
// ne
// gt
// gte
// lt
// lte
// in
// nin

// get all documents
async function getCourses() {
  const courses = await Course.find({ author: "A", isPublished: true })
    .limit(1)
    // 1 indicates ascending order, -1 descending
    .sort({ name: 1 })
    // what you want to select and the number of things to select
    .select({ tags: 1, name: 1 });
  console.log(courses);
}

getCourses();
