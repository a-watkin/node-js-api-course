const { Course, mongoose } = require("./db-interface");
// or
// and

const pageNumber = 1;
const pageSize = 2;

async function getCourses() {
  try {
    const courses = await Course.find()
      // this is the page number
      .skip((pageNumber - 1) * pageSize)
      // number of results per page
      .limit(pageSize);
    console.log(courses);
  } catch (error) {
    console.log("Problem ", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

getCourses();
