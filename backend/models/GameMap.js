import db from "../config/db.js";

const GameMap = db.model("GameMap", {
  name: String,
  description: String,
  width: Number,
  height: Number,
  tiles: {},
  startingLocations: {},
  startingWorkerLocations: {},
});

export default GameMap;
