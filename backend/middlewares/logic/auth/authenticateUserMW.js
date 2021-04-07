module.exports = function () {
  return function (req, res, next) {
    console.log("Authenticate User");
    const user = req.user;

    if (user === undefined || user === null) {
      return res
        .status(400)
        .send("Cannot find or create the user you were trying to.");
    }

    return next();
  };
};
