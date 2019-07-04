console.log("Before");
// get a user from a database
// getUser(1, getRepositories);

// function getRepositories(repos) {
//   getRepositories(user.gitHubUsername, getCommits);
// }

// function getCommits(repos) {
//   getCommits(respos, displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }

// Using a promise
const p = getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log("Commits ", commits))
  // catches any errors from the previous promises - it is a best practice to always catch errors from promises
  .catch(err => console.log("Error ", err));

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "a" });
    }, 500);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 1000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(56);
    }, 1000);
  });
}

console.log("After");
