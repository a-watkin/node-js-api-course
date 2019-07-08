const { Course, mongoose } = require("./db-interface");

async function getCourses() {
  try {
    const courses = await Course.find({ author: "A" } && { isPublished: true });
    console.log(courses);
  } catch (error) {
    console.log("Problem ", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

getCourses();
