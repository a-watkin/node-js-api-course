const { Course, mongoose } = require("./db-interface");

// update a document where you know the id
async function removeCourse(id) {
  try {
    // use findOneAndRemove to remove and get the deleted document
    const course = await Course.findOneAndRemove({ _id: id });

    // if you don't want the removed document returned
    // const course = await Course.deleteOne({ _id: id });
    console.log(course);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

// returns a modification object outlining the changes made and that status
removeCourse("5d2229bebfd6184c0fd60635");
