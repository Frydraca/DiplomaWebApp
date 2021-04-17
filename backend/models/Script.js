const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Script = db.model("Script", {
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  creationDate: Date,
  content: String,
});

module.exports = Script;
