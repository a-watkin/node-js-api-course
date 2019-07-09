const { Course, mongoose } = require("./db-interface");

// update document without first checking that it exists
async function updateCourse(id) {
  try {
    const result = await Course.updateOne(
      { _id: id },
      {
        $set: {
          author: "Mosh",
          isPublished: false
        }
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

updateCourse("5d2229bebfd6184c0fd60635");
