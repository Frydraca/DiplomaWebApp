const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Game = db.model("Game", {
  currentTurn: Number,
  currentCommandNumber: Number,
  commands: {},
  tiles: {},
  players: {},
  buildings: {},
  units: {},
});

module.exports = Game;
