const EventEmitter = require("events");
// const emitter = new EventEmitter();

// syntax error but allos you to see how node imports modules
// it uses an immedietly invokes function expression that contains
// the module - it's called the module wrapper function
// it makes things like require available

// this module wrapper wraps all modules implicitly
(function(exports, require, module, __filename, __dirname) {
  // module code is here
});

// get current filename
console.log(__filename);
// get current directory
console.log(__dirname);

// var x =;

// the concept of private exists witin modules, other modules can only access things exported

// implementation detail
var url = "http://mylogger.io/log";

// real world event example
class Logger extends EventEmitter {
  // method
  log(message) {
    // Send an HTTP request
    console.log(message);

    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

// how you export a function in Node
// this consistutes an API
module.exports = Logger;
