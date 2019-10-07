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
    // author: authorSchema
    // an array of authors
    authors: [authorSchema]
  })
);

async function createCourseAuthorsArray(name, authors) {
  try {
    const course = new Course({
      name,
      authors
    });

    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function pushAuthor(courseId, author) {
  try {
    const course = await Course.findById(courseId);
    console.log(course);
    if (!course) {
      console.log("Course not found.");
    }
    course.authors.push(author);
    await course
      .save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
  } catch (error) {
    console.log("Error pushing author: ", error);
  } finally {
    mongoose.disconnect();
  }
}

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
    console.log("messed up ", error);
  } finally {
    mongoose.disconnect();
  }
}

async function removeAuthor(courseId) {
  try {
    const course = await Course.updateOne(
      {
        _id: courseId
      },
      {
        // can also use this on properties rather than whole document
        $unset: {
          author: ""
        }
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function removeAuthor(courseId, authorId) {
  try {
    const course = await Course.findById(courseId);
    console.log("course ", course);
    const author = course.authors.id(authorId);
    author.remove();
    console.log("course after removal ", course);
    await course
      .save()
      .then(res => console.log(res))
      .catch(err => console.log("Save error: ", err));

    // console.log("Save result: ", saveResult);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

// createCourse("Node Course", new Author({ name: "Mosh" }));
// getAndUpdateAuthor("5d2f81394a566e3dcb9fd06d");
// removeAuthor("5d2f81394a566e3dcb9fd06d");

// Multiple authors
// createCourseAuthorsArray("Node course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" })
// ]);

// push new author to authors
// pushAuthor("5d302ffa4a8bf164cf2d57de", new Author({ name: "blah" }));

// remove an author from a course
// removeAuthor("5d302ffa4a8bf164cf2d57de", "5d30f592f1b146103ed68eaf");
