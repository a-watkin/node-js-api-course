const { Course, mongoose } = require("./db-interface");

async function getCourses() {
  try {
    const courses = await Course.find();
    console.log(courses);
  } catch (error) {
    console.log("Problem ", error);
  } finally {
    mongoose.disconnect();
  }
}

getCourses();
