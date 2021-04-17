const Schema = require("mongoose").Schema;
const db = require("../config/db");

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

module.exports = Unit;
