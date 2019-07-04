console.log("Before");
// get a user from a database
getUser(1, user => {
  console.log(user.gitHubUsername);
  //   get github username and repos
  getRepositories(user.gitHubUsername, repos => {
    console.log(user.gitHubUsername, repos);
    // get commits in a repo
    getCommits(repos[0], commits => {
      // call back hell
      console.log(commits);
    });
  });
});

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUsername: "a" });
  });
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["repo1", "repo2", "repo3"]);
  });
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(56);
  });
}

console.log("After");
