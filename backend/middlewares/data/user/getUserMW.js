const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const User = requireOption(objectrepository, "User");
  return function (req, res, next) {
    console.log("Get User");

    req.email = req.email || req.query.email;
    if (typeof req.email === "undefined") {
      return res.status(400).send("Cannot find user with this email!");
    }
    User.find({ email: req.email }, function (err, users) {
      if (err) return res.status(400).send("Cannot find user with this email!");
      if (users.length === 0) {
        return res.status(400).send("Cannot find user with this email!");
      }

      req.user = users[0];
      if (!req.user.isLoggedIn) {
        return res.send({
          logOutMessage: "You were logged out!",
          loggedOut: true,
        });
      }
      return next();
    });
  };
};
