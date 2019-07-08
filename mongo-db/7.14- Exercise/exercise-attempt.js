const { Course, mongoose } = require("./db-interface");

async function getBackendCouses() {
  try {
    const courses = await Course.find({ isPublished: true })
      .sort({ name: 1 })
      .select(["name", "author"]);
    console.log(courses);
  } catch (error) {
    console.log("Proble, ", error);
  } finally {
    mongoose.disconnect();
  }
}

// getBackendCouses();

async function getPublishedCourses() {
  try {
    const courses = await Course.find({ isPublished: true })
      .sort("-price")
      .select(["name", "author"]);

    console.log(courses);
  } catch (error) {
    console.log("errorzzz...., ", error);
  } finally {
    mongoose.disconnect();
  }
}

getPublishedCourses();
