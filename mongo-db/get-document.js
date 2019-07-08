const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  data: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// getCourses();

async function getPublishedCourses() {
  // find courses where the value of a key is:
  const pubCourses = await Course.find({ isPublished: true });
  console.log(pubCourses);
}

// getPublishedCourses();

async function getCoursesWithLimit() {
  try {
    const courses = await Course.find({ author: "A" })
      .limit(2)
      // also sort the results
      // 1 in sort menas ascending, -1 descending
      .sort({ name: -1 });
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

// getCoursesWithLimit();

// mongoose.disconnect();

async function getCoursesWithSelect() {
  try {
    const courses = await Course.find({ author: "A" })
      .limit(2)
      // also sort the results
      // 1 in sort means ascending, -1 descending
      .sort({ name: -1 })
      .select({ name: "A", tags: "Node" });
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

getCoursesWithSelect();
