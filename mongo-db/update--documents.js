const { Course, mongoose } = require("./db-interface");

// update a document where you know the id
async function updateCourse(id) {
  try {
    const course = await Course.findById(id);
    if (!course) {
      return;
    }
    // update details
    course.isPublished = true;
    course.author = "Another Author";
    // identical to above
    course.set({
      isPublished: true,
      author: "Another Author"
    });

    try {
      const result = await course.save();
      console.log(result);
    } catch (error) {
      console.log("error updating...", result);
    }
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

// returns a modification object outlining the changes made and that status
updateCourse("5d2229bebfd6184c0fd60635");
