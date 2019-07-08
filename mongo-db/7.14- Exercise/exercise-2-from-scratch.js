const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(err => console.log("not connected", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: Number,
  data: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function publishedCourses() {
  try {
    const courses = await Course.find({ isPublished: true })
      .sort("-price")
      .select(["name", "author"]);
    console.log(courses);
  } catch (error) {
    console.log("this some bullshit");
  } finally {
    // moving this to the bottom of the file causes problems
    // probably due to it being async
    mongoose.disconnect();
  }
}

publishedCourses();
