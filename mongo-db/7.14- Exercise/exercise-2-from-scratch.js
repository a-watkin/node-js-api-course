const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(() => console.log("not connected"));

mongoose.disconnect();
