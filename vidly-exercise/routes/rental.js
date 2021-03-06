const express = require("express");
const router = express.Router();
const info = require("debug")("app:info");

// Fawn is for transaction like interactions
const Fawn = require("fawn");
const mongoose = require("mongoose");

// importing like this was causing the problem
// const Customer = require("../models/customer");
// importing like this works
const { Customer, validateCustomer } = require("../models/customer");

// without curly brackets this does not work
// i guess i don't understand imports and exports well enough
const { Movie } = require("../models/movie");
const { Rental, validateRental } = require("../models/rental");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    info(customers);
    if (!customers) {
      res.send("blah");
    }
    res.send(customers);
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  info(req.params.id);
  try {
    const rental = await Rental.findOne({ _id: req.params.id });
    if (rental) {
      return res.send(rental);
    }
  } catch (error) {
    return res
      .status(500)
      .send(`Unable to retrieve a rental with the id supplied: ${error}`);
  }
});

router.post("/", async (req, res) => {
  info("getting to post of rental?");
  try {
    // ok so it gets the body ok
    // res.send(req.body);
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { customerId, movieId } = req.body;

    const customer = await Customer.findOne({ _id: customerId });

    const movie = await Movie.findOne({ _id: movieId });

    info(customer, movie);

    // Check stock levels
    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });

    info(`new rental is ${rental}`);

    try {
      // works directly with the collection, the first name is the name of the collection it is case sensitive, the second is the object it is passed
      new Fawn.Task()
        .save("rentals", rental)
        .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
        .run();

      res.send(rental);
    } catch (error) {
      res.send(`There was an error saving the rental (Fawn): ${error}`);
    }

    // try {
    //   rental = await rental.save();
    //   if (rental) {
    //     res.status(200).send(rental);
    //   }
    // } catch (error) {
    //   res.send(`There was an error saving the rental: ${error}`);
    // }
  } catch (error) {
    res.send(`There was a problem with the information supplied: ${error}`);
  }
});

// update
router.put("/:id", (req, res) => {
  return res.send(req.body);

  // try {
  //   let rental = await Rental.findByIdAndUpdate({
  //     customer: {
  //       _id: customer._id,
  //       name: customer.name,
  //       phone: customer.phone
  //     },
  //     movie: {
  //       _id: movie._id,
  //       title: movie.title,
  //       dailyRentalRate: movie.dailyRentalRate
  //     }
  //   });
  // } catch (error) {
  //   res.send(`There was an error saving the rental: ${error}`);
  // }
});

// delete

module.exports = router;
