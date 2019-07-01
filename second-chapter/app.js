// global objects
// console.log();

// info for this module which is just this file
console.log(module);

// all the modules that are avilable globally, thes tate of the execution engine, paths etc
// console.log(global);

// this adds the exported stuff in logger to the current module
// log is not the function exported in logger

// it's a best practice to store the imported module in a constant
const log = require("./logger");

// you can then use the alias to call any of the exported thigns from the module you're importing from

// this is quite a lot of encapsulation
log("I'm a dummy");
