const { Course, mongoose } = require("./db-interface");
// or
// and

async function getCourses() {
  try {
    const courses = await Course
      // how i did it
      // .find(
      //   { author: "A" } && { isPublished: false }
      // );
      // how it's actually done
      .find()
      .or([{ price: 15 }, { isPublished: false }])
      .and([{ author: "Adam" }]);
    console.log(courses);
  } catch (error) {
    console.log("Problem ", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

getCourses();
