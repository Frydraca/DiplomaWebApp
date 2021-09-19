const Schema = require("mongoose").Schema;
const db = require("../config/db");

// TODO starting... for everything?

const Game = db.model("Game", {
  currentTurn: Number,
  currentCommandNumber: Number,
  commands: {},
  tiles: {},
  players: {},
  startingPlayers: {},
  buildings: {},
  units: {},
});

module.exports = Game;
