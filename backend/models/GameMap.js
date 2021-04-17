const db = require("../config/db");

const GameMap = db.model("GameMap", {
  name: String,
  width: Number,
  height: Number,
  tiles: {},
  startingLocations: {},
});

module.exports = GameMap;
