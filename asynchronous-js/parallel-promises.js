const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("sync op 1");
    resolve(1);
    // reject(new Error("something went wrong..."));
  }, 500);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("sync op 1");
    resolve(2);
  }, 500);
});

// not concurrent there's still one thread executing
// do something after all promises are complete
// accepts an array of promsies
// returns an array with the results

// if any of the promises fail they all fail
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log("Error ", err));

//   do something as soon as one of the promises completes
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log("Error ", err));
