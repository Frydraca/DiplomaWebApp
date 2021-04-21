const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const GameMap = requireOption(objectrepository, "GameMap");

  return function (req, res, next) {
    console.log("Get game map");
    GameMap.findOne({ _id: req.params.gameId }, (err, gameMap) => {
      if (err || !gameMap) {
        console.log("Error: coudn't find game map!");
        return next(err);
      }
      res.locals.gameMap = gameMap;
      return next();
    });
  };
};
