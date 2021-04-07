const db = require("../config/db");

const User = db.model("User", {
  email: String,
  userName: String,
  password: String,
  isLoggedIn: Boolean,
});

module.exports = User;
