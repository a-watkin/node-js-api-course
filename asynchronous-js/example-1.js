console.log("Before");

// asynchronous and non-blocking
// schedules a task to performe in the future
setTimeout(() => {
  console.log("Retreiving a user from a database...");
}, 2000);

console.log("After");

// output is:
// before
// after
// Retreiving a user from a database...
