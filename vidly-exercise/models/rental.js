const rentalInfo = require("debug")("app:rentalInfo");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const moment = require("moment");
const { Customer, validateCustomer } = require("./customer");

const rentalSchema = new mongoose.Schema({
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
});

rentalSchema.statics.lookup = function (customerId, movieId) {
  // returns a promise the called will have to await

  // this references the rental class - this function is a static method of this class
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId
  });
};

rentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(req, schema);
}

// async function createRental(customerId, movieId) {
//   try {
//     const customer = await Customer.findOne({
//       _id: "5d389f889aa8cb27075f4409"
//     });

//     rentalInfo("called");
//     if (!customer) {
//       rentalInfo("customer not found");
//     }
//     rentalInfo(customer);
//   } catch (error) {
//     rentalInfo("error ", error);
//   }
//   // try {
//   //   rentalInfo("entering createRental");
//   //   const rental = new Rental({ customerId, movieId });
//   //   await rental.save();
//   // } catch (error) {
//   //   rentalInfo("error ", error);
//   // } finally {
//   //   mongoose.disconnect();
//   //   rentalInfo("Disconnected");
//   // }
// }

// createRental("5d389f889aa8cb27075f4409", "5d39f1101373e370c7bb090d");

// rentalInfo("test");
// Customer.findOne({
//   _id: "5d389f889aa8cb27075f4409"
// })
//   .then(res => rentalInfo("gah", res))
//   .then(err => rentalInfo("this wont do anything"));

exports.Rental = Rental;
exports.validateRental = validateRental;
