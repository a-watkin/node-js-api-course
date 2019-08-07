const Joi = require("@hapi/joi");
// passes Joi to the function retuned by joi-objectid
Joi.objectId = require("joi-objectid")(Joi);
const rentalInfo = require("debug")("app:rentalInfo");
const mongoose = require("mongoose");
const { Customer, validateCustomer } = require("./customer");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        }
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.string().required()
  };

  return Joi.validate(rental, schema);
}

async function createRental(customerId, movieId) {
  try {
    const customer = await Customer.findOne({
      _id: "5d389f889aa8cb27075f4409"
    });

    rentalInfo("called");
    if (!customer) {
      rentalInfo("customer not found");
    }
    rentalInfo(customer);
  } catch (error) {
    rentalInfo("error ", error);
  }
  // try {
  //   rentalInfo("entering createRental");
  //   const rental = new Rental({ customerId, movieId });
  //   await rental.save();
  // } catch (error) {
  //   rentalInfo("error ", error);
  // } finally {
  //   mongoose.disconnect();
  //   rentalInfo("Disconnected");
  // }
}

// createRental("5d389f889aa8cb27075f4409", "5d39f1101373e370c7bb090d");

// rentalInfo("test");
// Customer.findOne({
//   _id: "5d389f889aa8cb27075f4409"
// })
//   .then(res => rentalInfo("fuck", res))
//   .then(err => rentalInfo("this wont do shit"));

exports.Rental = Rental;
exports.validateRental = validateRental;
