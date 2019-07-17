const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // authorSchema is defined above
    author: authorSchema
  })
);

async function createCourse(name, author) {
  try {
    const course = new Course({
      name,
      author
    });

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
    const courses = await Course.find();
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function updateAuthor(courseId) {
  try {
    const course = await Course.findById({ _id: courseId });
    course.author.name = "Jack Sparrow";
    console.log(course);
    // you have to await saving and catch errors
    const meh = await course
      .save()
      .then(blah => console.log("saved", blah))
      .catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function getAndUpdateAuthor(courseId) {
  // update methods save automatically so you don't need to do it

  // it worked surprisingly
  try {
    const course = await Course.updateOne(
      { _id: courseId },
      {
        $set: {
          "author.name": "John Smith"
        }
      }
    );
  } catch (error) {
    console.log("fucked up ", error);
  } finally {
    mongoose.disconnect();
  }
}

// createCourse("Node Course", new Author({ name: "Mosh" }));

getAndUpdateAuthor("5d2f81394a566e3dcb9fd06d");
