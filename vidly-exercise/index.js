// Express framework
const express = require("express");
// So you DON'T captitalise express
const router = require("./routes/genres");
// express instance
const app = express();
// tell express to use JSON - you MUST put this before an routes
app.use(express.json());
app.use("/api/genres", router);

// either use an env variable or 3000
// process global
const port = process.env.PORT || 3000;

// start the app listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
