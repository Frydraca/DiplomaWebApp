const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");

  return function (req, res, next) {
    console.log("Get game simulation");

    Game.findOne({ _id: req.params.gameId }, (err, game) => {
      if (err || !game) {
        console.log("Error: coudn't find game!");
        return next(err);
      }
      res.locals.game = game;
      return next();
    });
  };
};
