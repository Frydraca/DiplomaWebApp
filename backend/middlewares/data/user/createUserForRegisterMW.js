const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const User = requireOption(objectrepository, "User");
  return function (req, res, next) {
    console.log("Create User for register");
    console.log(req.body);
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.userName === "undefined" ||
      typeof req.body.password === "undefined" ||
      typeof req.body.repeatPassword === "undefined"
    ) {
      return next();
    }

    User.find({ email: req.body.email }, function (err, users) {
      if (err) return next();
      if (users.length > 0) {
        return res.status(400).send("A user with this email already exists!");
      }

      var user = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
      });

      req.user = user;
      return next();
    });
  };
};
