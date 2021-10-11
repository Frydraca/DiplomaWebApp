import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/db.js";

const Unit = db.model("Unit", {
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "Player" },
  hitPoints: Number,
  armor: Number,
  canAttack: Boolean,
  range: Number,
  speed: Number,
  attackDamage: Number,
});

export default Unit;
