const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-games", { useNewUrlParser: true })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

const Publisher = mongoose.model(
  "Publisher",
  new mongoose.Schema({
    companyName: String,
    firstParty: Boolean,
    website: String
  })
);

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    title: String
  })
);

async function createPublisher(companyName, firstParty, website) {
  const publisher = new Publisher({
    companyName,
    firstParty,
    website
  });

  const result = await publisher.save();
  console.log(result);
}

async function createGame(title, publisher) {
  const game = new Game({
    title,
    publisher
  });

  const result = await game.save();
  console.log(result);
}

async function listGames() {
  const games = await Game.find().select("title");
  console.log(games);
  //   mongoose.disconnect();
}

// createPublisher("Nintendo", true, "https://www.nintendo.com/");

// listGames();

createGame("Super Smash Bros", "5b2bdc233e939402b41d90bf");
