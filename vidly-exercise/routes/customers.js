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
    customerInfo("wha..", customer);

    if (!customer) {
      res.status(404).send("customer not found");
    }
    // i need to merge the new stuff with the old

    customer = [...customer, req.body];
    customerInfo("blah", customer);
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

// const dbApi = require("../database/db-interface");

// function validateGenre(name) {
//   info("called with ", name);
//   // validation object
//   const schema = {
//     name: Joi.string()
//       .min(3)
//       .required()
//   };

//   return Joi.validate(name, schema);
// }

// router.get("/", async (req, res) => {
//   try {
//     const genres = await db.Genre.find().sort("name");

//     if (!genres) {
//       res.status(404).send("Genre not found.");
//     }
//     return res.send(genres);
//   } catch (error) {
//     return res.status.send(
//       `An error ocurred while handling your request ${error}`
//     );
//   }
// });

// router.get("/create", (req, res) => {
//   // creating dummy data - you must end the server before doing anything else otherwise it hangs
//   try {
//     const result = dbApi.makeGenres();
//     if (result) {
//       res.status(200).send("Genres created.");
//     }
//   } catch (error) {
//     return res.send("Genres could not be created.");
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const genre = await db.Genre.findOne({ _id: req.params.id });
//     if (!genre) {
//       return res.status(404).send("Genre not found.");
//     }
//     return res.send(genre);
//   } catch (error) {
//     return res.send("Problem getting genre with id: ", req.params.id);
//   }
// });

// router.post("/", async (req, res) => {
//   // joi expects an object
//   const validationResult = validateGenre(req.body);
//   info(validationResult, validationResult.error);
//   if (validationResult.error) {
//     return res.status(400).send(validationResult.error.details[0].message);
//   }

//   try {
//     const result = await db.Genre.findOne({ name: req.body.name });

//     if (result) {
//       info("getting this far?");
//       return res.status(409).send(result);
//     } else {
//       const genre = new db.Genre(req.body);
//       try {
//         const newGenre = await genre.save();
//         if (newGenre) {
//           return res.send(newGenre);
//         }
//       } catch (error) {
//         info(error);
//       }
//     }
//     info(result);
//   } catch (error) {
//     info(error);
//   }
//   res.send("autism beavers");
// });

// router.put("/:id", async (req, res) => {
//   const validationResult = validateGenre(req.body);

//   info(validationResult);
//   if (validationResult.error) {
//     return res
//       .status(400)
//       .send(
//         "The name of a genre must be a string and must be at least 3 characters long."
//       );
//   }

//   try {
//     info("id is ", req.params.id);
//     const result = await db.Genre.findOne({ _id: req.params.id });
//     info("result is ", result.genre);
//     if (result) {
//       // update the genre
//       result.name = req.body.name;

//       try {
//         const savedUpdate = await result.save();
//         return res.status(200).send(savedUpdate);
//       } catch (error) {
//         return res.status(500).send("Problem updating the genre ", error);
//       }
//     } else {
//       return res.status(404).send("Genre not found.");
//     }
//   } catch (error) {
//     return res.status(500).send("autism beavers");
//   }
// });

// router.delete("/delete", async (req, res) => {
//   try {
//     const genres = await db.Genre.deleteMany();
//     info(genres);

//     return res.status(200).send(genres);
//   } catch (error) {
//     return res.status(500).send("Error deleting genres.");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     info(req.params.id);
//     const result = await db.Genre.findOne({ _id: req.params.id });

//     if (!result) {
//       return res.status(404).send("Genre not found.");
//     }
//     try {
//       const deletedGenre = await db.Genre.deleteOne({ _id: req.params.id });
//       return res.status(200).send(result);
//     } catch (error) {
//       return res.status(500).send("Genre not deleted.");
//     }
//   } catch (error) {
//     res.send("something went wrong");
//   }
// });

module.exports = router;
