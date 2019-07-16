const customerInfo = require("debug")("app:customerInfo");
// Input validation
const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const db = require("../database/model");

router.get("/", async (req, res) => {
  try {
    const customers = await db.Customer.find();
    customerInfo(customers);
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
    const customer = await db.Customer.findOne({ _id: req.params.id });

    if (!customer) {
      return res.status(404).send("customer not found");
    }
    return res.send(customer);
  } catch (error) {
    return res.send("Fucked up again");
  }
});

router.post("/", async (req, res) => {
  try {
    const customerCheck = await db.Customer.find({ name: req.body.name });

    if (customerCheck) {
      return res.send("Already exists.");
    }

    const customer = new db.Customer(req.body);
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
  try {
    let customer = await db.Customer.findOne({ _id: req.params.id });

    if (!customer) {
      res.status(404).send("customer not found");
    }
    // i need to merge the new stuff with the old
    const mergedObjects = { ...customer._doc, ...req.body };

    try {
      // update the object in the database
      // this should actually return the object also
      // but it doesn't seem to work well, it doesn't return the updated object as soon as it updates it seems
      const saveResult = await db.Customer.findByIdAndUpdate(
        req.params.id,
        mergedObjects
      );

      // get that object
      const savedObject = await db.Customer.findOne({ _id: req.params.id });
      return res.send(savedObject);
    } catch (error) {
      customerInfo("Error ", error);
    }

    // customerInfo("blah", mergedObjects);
    return res.send(mergedObjects);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const customers = await db.Customer.deleteMany();
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
    const result = await db.Customer.findOne({ _id: req.params.id });

    if (!result) {
      return res.status(404).send("Customer not found.");
    }
    try {
      const deletedCustomer = await db.Customer.deleteOne({
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
