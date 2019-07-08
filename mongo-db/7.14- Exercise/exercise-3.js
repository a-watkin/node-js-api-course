const { Course, mongoose } = require("./db-interface");

async function pub15DollarsOrMore() {
  try {
    const courses = await Course.find({
      isPublished: true
      //   price: { $gte: 15 }
    }).or([{ name: /by/ }, { price: { $gte: 15 } }]);
    console.log(courses);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

pub15DollarsOrMore();
