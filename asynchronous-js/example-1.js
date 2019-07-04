console.log("Before");
const user = getUser(1, function(user) {
  console.log("user", user);

  // Get repos
  getRepositories(user.gitHubUsername, function(data) {
    console.log(data["repositories"]);
  });
});

// asynchronous and non-blocking
// schedules a task to performe in the future
// it's still a single thread - there's just a queue for the thread
// it is NOT concurrent
// setTimeout(() => {
//   console.log("Retreiving a user from a database...");
// }, 2000);

console.log("After");

// output is:
// before
// after
// Retreiving a user from a database...

// callback is a function that's called after an asynch function has finished
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Retreiving a user from a database...");
    callback({
      id: id,
      gitHubUsername: "a"
    });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    callback({
      username: username,
      repositories: ["repo1", "repo2", "repo3"]
    });
  }, 2000);
}
