const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Cell = db.model("Cell", {
  location: [Number],
  terrain: String,
  building: { type: Schema.Types.ObjectId, ref: "Building" },
  unit: { type: Schema.Types.ObjectId, ref: "Unit" },
});

module.exports = Cell;
