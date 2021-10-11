import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/db.js";

const Script = db.model("Script", {
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  creationDate: Date,
  lastModified: Date,
  content: String,
  workspace: String,
});

export default Script;
