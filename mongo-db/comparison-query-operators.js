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

// eq - equal
// ne - not equal
// gt - greater than
// gte - greater than or equal
// lt - less than
// lte - less than or equal to
// in - in
// nin - not in

async function getCoursesWithSelect() {
  try {
    // objects within objects
    const courses = await Course
      // find all courses with a price of 10, 15 and 20 dollars
      .find({ price: { $in: [10, 15, 20] } });
    // .find({
    //   price: {
    //     $gt: 9,
    //     $lt: 100
    //   }
    // });
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

getCoursesWithSelect();
