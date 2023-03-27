const db = require("../config/connection");
const { User, Boat } = require("../models");
const userSeeds = require("./userSeeds.json");
const boatSeeds = require("./boatSeeds.json");
const { compareSync } = require("bcrypt");

db.once("open", async () => {
  try {

    console.log("deleting users...")
    await User.deleteMany({});
    console.log("deleting boats...")
    await Boat.deleteMany({});

    await User.create(userSeeds);
    await Boat.create(boatSeeds);

    let users = await User.find({});
    console.log(users);

    let boats = await Boat.find({});
    console.log(boats);

    // Randomly add a boat to a user
    for (let i = 0; i < users.length; i++) {
      let randomBoat = boats[Math.floor(Math.random() * boats.length)];
      console.log("randomBoat", randomBoat);
      users[i].boats.push(randomBoat);
      await users[i].save();     
    }

    // await User.deleteMany({});

    // await User.create(userSeeds);

    // let users = await User.find({});
    // console.log(users);

    users = await User.find({});
    console.log(users);
  
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
