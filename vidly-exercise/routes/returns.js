const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");

// middleware
const authMiddleware = require("../middleware/auth");

// erroneously putting async here caused three tests to fail
router.post("/", authMiddleware, async (req, res) => {
  if (!req.body.customerId) {
    return res.status(400).send("customerId is required.");
  }

  if (!req.body.movieId) {
    return res.status(400).send("movieId is required.");
  }

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });

  if (!rental) {
    return res.status(404).send("Rental not found.");
  }

  if (rental.dateReturned) {
    return res.status(400).send("Rental already returned.");
  }

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;

  const result = await rental.save();

  // update also saves
  await Movie.update(
    {
      _id: rental.movie._id
    },
    {
      $inc: { numberInStock: 1 }
    }
  );

  return res.status(200).send(result);
});

module.exports = router;
