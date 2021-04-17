const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Player = db.model("Player", {
  resources: {
    steel: Number,
    roboSteel: Number,
    crystal: Number,
    energyCore: Number,
    energy: Number,
    credits: Number,
  },
});

module.exports = Player;
