import db from "../config/db.js";

const User = db.model("User", {
  email: String,
  userName: String,
  password: String,
  isLoggedIn: Boolean,
});

export default User;
