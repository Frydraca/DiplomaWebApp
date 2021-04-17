const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");

  return function (req, res, next) {
    return next();
  };
};
