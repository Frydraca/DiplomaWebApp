module.exports = function () {
  return function (req, res, next) {
    console.log("Log User in");
    req.user.isLoggedIn = true;
    req.user.save(function (err, _successful_user) {
      if (err) {
        return res.status(400).send("Cannot log user in!");
      }
      return next();
    });
  };
};
