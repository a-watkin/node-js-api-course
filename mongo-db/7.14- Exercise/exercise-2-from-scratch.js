const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(err => console.log("Problems ", err));

const courseSchema = {
  name: String,
  author: String,
  price: Number,
  isPublished: Boolean,
  date: { type: Date, default: Date.now },
  tags: [String]
};

const Course = mongoose.model("Course", courseSchema);

async function getPublishedFrontBackend() {
  try {
    const courses = await Course.find({
      isPublished: true,
      tags: { $in: ["frontend", "backend"] }
    })
      .sort("-price")
      // can also select the attributes like so:
      .select("name author price");
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

getPublishedFrontBackend();
