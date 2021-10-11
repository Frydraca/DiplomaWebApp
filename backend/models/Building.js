import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/db.js";

const Building = db.model("Building", {
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "Player" },
  hitPoints: Number,
  armor: Number,
  canAttack: Boolean,
  range: Number,
  attackDamage: Number,
});

export default Building;
