import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/db.js";

const Cell = db.model("Cell", {
  location: [Number],
  terrain: String,
  building: { type: Schema.Types.ObjectId, ref: "Building" },
  unit: { type: Schema.Types.ObjectId, ref: "Unit" },
});

export default Cell;
