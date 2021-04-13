module.exports = function () {
  return function (req, res, next) {
    console.log("Send back actual User");
    res.locals.retData = {
      id: req.user.id,
      email: req.user.email,
      userName: req.user.userName,
    };
    return next();
  };
};
