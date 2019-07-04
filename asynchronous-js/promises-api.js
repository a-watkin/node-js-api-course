// a static method that just returns the resolve - useful for unit testing
const resolvePromise = Promise.resolve({ id: 1 });
console.log(resolvePromise);

// static reject also useful for testing
const rejectPromise = Promise.reject(new Error("some error"));
rejectPromise.catch(error => console.log(error));
