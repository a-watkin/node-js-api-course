const { Course, mongoose } = require("./db-interface");

// trying to add some data to play with in addition to what's already there
// inside an async function because it's and asynchronous operation
async function createCourse() {
  const course = new Course({
    name: "Java web APIs",
    author: "Adam",
    tags: ["Java", "backend"],
    price: 60,
    isPublished: false
  });

  try {
    // asynchronous operation
    // when it's done result will contain the database object
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log("Something went wrong, ", error);
  } finally {
    mongoose.disconnect();
  }
}

createCourse();
