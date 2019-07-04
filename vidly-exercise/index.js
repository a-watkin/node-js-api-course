// Express framework
const express = require("express");
// So you DON'T captitalise express
const app = express();

const genresRoutes = require("./routes/genres");

app.use("/api/genres", genresRoutes);

// tell express to use JSON
app.use(express.json());

// either use an env variable or 3000
// process global
const port = process.env.PORT || 3000;

// start the app listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
