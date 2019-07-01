var _ = require("underscore");

var mongo = require("mongoose");

// Steps require takes to import something
// Core module - in the system path for Node
// File or folder - in the current directory
// insude the node_module folder - in the current directory

var result = _.contains([1, 2, 3], 2);
console.log(result);
