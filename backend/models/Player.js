import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/db.js";

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

export default Player;
