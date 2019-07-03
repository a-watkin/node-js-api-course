// custom middleware

// next is a reference to the next middleware function in the pipline
function log(req, res, next) {
  // perform some action for this middleware
  console.log("Logging");
  // pass output to the next middleware function
  // if you don't put next then the app will hang
  // you have to terminate the request response cycle
  next();
}

module.exports = log;
