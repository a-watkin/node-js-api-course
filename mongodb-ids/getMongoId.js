const mongoose = require("mongoose");
const info = require("debug")("app:info");

const id = new mongoose.Types.ObjectId();
info(id);

// to get a timestamp
info(id.getTimestamp());

// check an id is valid
const isValid = mongoose.Types.ObjectId.isValid("1234");
console.log(isValid);
