// a promise holds the eventual result of an asynchronous operation
// promises to give you the result

// Can be in one of three stats

// Pending - starts the operation

// Fulfilled - a value is returned because the operation completed succesfully

// Rjects - an error is retuned because something went wrong

// A class that requires two parameters reolve and reject
const p = new Promise((resolve, reject) => {
  // start async operation

  // send the value to the consumers of the promise
  setTimeout(() => {
    // resolve(1);
    // if something does wrong pass an error to the consumers
    // it s a best practice to send an error

    // catch receied this error message
    reject(new Error("message"));
  }, 2000);
});

// gets the result of the promise
p.then(result => {
  console.log("Result", result);
}).catch(error => console.log("Error", error.message));
