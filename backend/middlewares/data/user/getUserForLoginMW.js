const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const User = requireOption(objectrepository, "User");
  return function (req, res, next) {
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }
    User.find({ email: req.body.email }, function (err, users) {
      if (err) return next();
      if (users.length === 0) {
        return res.status(400).send("Cannot find user with this email!");
      }

      req.user = users[0];
      return next();
    });
  };
};
