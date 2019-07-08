const { Course, mongoose } = require("./db-interface");
// or
// and

async function getCourses() {
  try {
    const courses = await Course.find({
      author: /pattern/
    });
    console.log(courses);
  } catch (error) {
    console.log("Problem ", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

getCourses();
