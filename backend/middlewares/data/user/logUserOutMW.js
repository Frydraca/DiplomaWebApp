module.exports = function () {
  return function (req, res, next) {
    res.locals.retData = {
      logOutMessage: "You were logged out!",
      loggedOut: true,
    };
    req.user.isLoggedIn = false;
    req.user.save(function (err, _successful_user) {
      if (err) {
        return res.status(400).send("Cannot log user out!");
      }
      return next();
    });
  };
};
