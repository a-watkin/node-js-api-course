const express = require("express");

const app = express();

// set the view engine - express interally loads pug
// you don't have to require it
app.set("view engine", "pug");
// Optional conifg that sets template folder, default is './views'
// app.set('views', '')

app.get("/", (req, res) => {
  // to use pug render the template and pass an object with the variables needed by the template
  return res.render("index", {
    title: "A title passed as value",
    message: "hello"
  });
});

// either use an env variable or 3000
// process global
const port = process.env.PORT || 3000;

// callback function is optional
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
