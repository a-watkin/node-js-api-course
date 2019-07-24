const info = require("debug")("app:info");
// Input validation
const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    info(customers);
    if (!customers) {
      res.send("blah");
    }
    res.send(customers);
  } catch (error) {
    res.status(500).send("well this fucking sucks");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    if (!customer) {
      return res.status(404).send("customer not found");
    }
    return res.send(customer);
  } catch (error) {
    return res.send("Fucked up again");
  }
});

router.post("/", async (req, res) => {
  info("getting to this route?");
  try {
    const customerCheck = await Customer.find({ name: req.body.name });

    info("customerCheck is ", customerCheck);
    if (customerCheck.length > 0) {
      return res.send("Already exists.");
    }
    const validationResult = validateCustomer(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    const customer = new Customer(req.body);
    try {
      const result = await customer.save();
      res.send(result);
    } catch (error) {
      res.send("could not save");
    }
  } catch (error) {
    res.send("fuck this");
  }
});

router.put("/:id", async (req, res) => {
  info("getting here");
  try {
    let customer = await Customer.findOne({ _id: req.params.id });

    if (!customer) {
      res.status(404).send(`Customer with id: ${req.params.id} not found.`);
    }

    const validationResult = validateCustomer(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    } else {
      try {
        // Merge the current object with the one passed by the user
        const mergedObjects = { ...customer._doc, ...req.body };
        // update the object in the database
        // this should actually return the object also
        // but it doesn't seem to work well, it doesn't return the updated object as soon as it updates it seems
        const saveResult = await Customer.findByIdAndUpdate(
          req.params.id,
          mergedObjects
        );

        info(saveResult);

        // get that object
        const savedObject = await Customer.findOne({ _id: req.params.id });
        return res.send(savedObject);
      } catch (error) {
        info("Error ", error);
      }
    }
  } catch (error) {
    return res.send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const customers = await Customer.deleteMany();
    if (!customers) {
      res.send("nope, no delete");
    }
    res.send(customers);
  } catch (error) {
    res.status(500).send("Not deleted.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Customer.findOne({ _id: req.params.id });

    if (!result) {
      return res.status(404).send("Customer not found.");
    }
    try {
      const deletedCustomer = await Customer.deleteOne({
        _id: req.params.id
      });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Customer not deleted.");
    }
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = router;
