const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Building = db.model("Building", {
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "Player" },
  hitPoints: Number,
  armor: Number,
  canAttack: Boolean,
  range: Number,
  attackDamage: Number,
});

module.exports = Building;
