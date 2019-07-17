const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      // reference to the document id of an author
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  try {
    const result = await author.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function listCourses() {
  try {
    const courses = await Course.find()
      // tells mongo to also query the author id to get the author document
      // the second arg is to specify what properties of the document you want

      // -_id excludes the id property
      .populate("author", "name -_id")
      .select("name author");
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

// createAuthor("Mosh", "My bio", "My Website");

// createCourse("Node Course", "5d2f5bd63c30f9294a140e1d");

listCourses();
