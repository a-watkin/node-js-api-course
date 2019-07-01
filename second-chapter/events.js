// convention EventEmitter is a class
// a container for properties and methods
const EventEmitter = require("events");

// class instance
const emitter = new EventEmitter();

// you need a listener that is registered to an emitter
// something that's interested in the event

// name of event and callback function
emitter.on("messageLogged", function(arg) {
  console.log("Listener called", arg);
});

// listener for logging
emitter.on("logging", function(arg) {
  console.log("logging called", arg);
});

// most commonly used are emit, singlalling that an event has happened
// iterates over all the registered listeners synchronously
// events usually pass data to listeners
emitter.emit("messageLogged", { id: 1, url: "http://" });

emitter.emit("logging", { data: "some message" });

// real world example of event listner - using the event from log module
const Logger = require("./logger");
// new class instance
const logger = new Logger();
logger.log("message");
