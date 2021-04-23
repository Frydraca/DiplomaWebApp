module.exports = function () {
  return function (req, res, next) {
    if (typeof res.locals.script === "undefined") {
      return next();
    }

    res.locals.script.remove((err) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  };
};
