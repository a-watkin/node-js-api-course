const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const info = require("debug")("app:info");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  phone: {
    type: String,
    required: false
  }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(25)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string()
  };

  return Joi.validate(customer, schema);
}

// the validation is provided by mongoose
async function createCustomer(arr) {
  try {
    const genre = new Customer(arr);
    const result = await genre.save();
    dbInfo("what is result? ", result);
  } catch (error) {
    // the error object has properties for message, error, tags and categories that you can iterate over
    // console.log("hello...?", error.message, error.errors);
    for (field in error.errors) {
      // validation error object
      dbInfo(error.errors[field].message);
    }
  } finally {
    mongoose.disconnect();
    dbInfo("Disconnected");
  }
}

// uncomment to make a customer
// createCustomer({
//   isGold: true,
//   name: "blah",
//   phone: "439745983798"
// });

module.exports = { Customer, validateCustomer, customerSchema };
