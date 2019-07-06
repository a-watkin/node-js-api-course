const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to mongodb..."));

const courseSchema = new mongoose.Schema(
    name: String,
    author: String,
    tags: [String],
    data, {type: Date, default: Date.now},
    isPublished: Boolean
);

// compile schema into a model
// name of the collection and the schema that defines it
// you don't need to have the date here because it's defined above as having a default value
mongoose.model('Courses', courseSchema)

// inside an async function because it's and asynchronous operation
async function createCourse() {

    const course = new Course({
        name: 'Node.js Course',
        author: 'A',
        tags: ['node', 'backend'],
        isPublished: true
    })

    // asynchronous operation
    // when it's done result will contain the databse object
    const result = await course.save()
    console.log(result)

}


createCourse()