const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const info = require("debug")("app:info");
const { movieSchema } = require("./movie");
const { customerSchema } = require("./customer");

const rentalSchema = new mongoose.Schema({
  movie: movieSchema,
  customer: customerSchema,
  rentalDate: { type: Date },
  rentalPeriod: {
    type: Number,
    min: 1,
    max: 7
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  info("getting to validateMovie");
  const schema = {
    movie: Joi.string().required(),
    customer: Joi.string().required(),
    rentalDate: Joi.date().required(),
    rentalPeriod: Joi.number.required()
  };

  return Joi.validate(Rental, schema);
}

module.exports = { Rental, validateRental };
