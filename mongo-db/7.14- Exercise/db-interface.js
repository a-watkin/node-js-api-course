const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
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

// export multiple things
module.exports = { Course, mongoose };

// This attempt at exporting multiple things didn't work
// module.exports = Course;
// module.exports = mongoose;
