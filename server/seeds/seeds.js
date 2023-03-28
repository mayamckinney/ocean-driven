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

    let boats = await Boat.find({});
    // Load all users where renter is true
    let users = await User.find({ renter: true });
    console.log(users);
    for(let i = 0; i < boats.length; i++) {
      let randomUser = users[Math.floor(Math.random() * users.length)];
      randomUser.boats.push(boats[i]);
      await randomUser.save();    
    }

    users = await User.find({});
    console.log(users);
  
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
