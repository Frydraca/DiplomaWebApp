import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/db.js";

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

export default Game;
