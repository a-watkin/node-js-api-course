// assumes built in module - if it can't find it then it looks for files in this application
const path = require("path");

// assumes that it's a file in the current app
require("./logger");

// info about the current path - also includes things about the os and how it handles files, like seperators etc
console.log(path);
