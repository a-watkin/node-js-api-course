const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = function () {
  if (result.error) {
    console.log("Problem with env variables.");
    throw result.error;
  }

  //   console.log(result.parsed);
  if (!process.env.jwtPrivateKey) {
    // this should be automatically caught by winston
    // ALWAYS throw an error object so you have access to the stack trace
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    // console.log("FATAL ERROR: jwtPrivateKey is not defined");
    // global kill app - 1 indicated an error 0 is success
    // process.exit(1);
  }
  //   console.log(process.env.jwtPrivateKey);
};
