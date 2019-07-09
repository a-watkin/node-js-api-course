const { Course, mongoose } = require("./db-interface");

// update a document where you know the id
async function updateCourse(id) {
  try {
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          author: "Jason",
          isPublished: true
        }
      },
      // to get the updated document back
      { new: true }
    );
    console.log(course);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

// returns a modification object outlining the changes made and that status
updateCourse("5d2229bebfd6184c0fd60635");
