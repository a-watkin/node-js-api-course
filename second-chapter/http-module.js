const http = require("http");

// createServer is an event emitter
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log("serving client");
    res.write("Hello world");
    // close the connection
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// what happens on a low level - above you can just work with the res and req objects
// server.on("connection", socket => {
//   console.log("New connection...");
// });

// when a connection is made it raises an event
server.listen(3000);

console.log("Listening on port 3000");
