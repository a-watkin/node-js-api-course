const fs = require("fs");

// async unless otherwise specified

// synchronous function
// files in current directory
const files = fs.readdirSync("./");
console.log(files);

// asynchronous function - non blocking
// difference is it needs a callback, you get the args from the docs
fs.readdir("./", (err, files) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Result", files);
  }
});
