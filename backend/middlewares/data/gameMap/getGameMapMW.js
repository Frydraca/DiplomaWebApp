import requireOption from "../../../config/requireOption.js";

export default function (objectrepository) {
  const GameMap = requireOption(objectrepository, "GameMap");

  return function (req, res, next) {
    GameMap.findOne({ _id: req.params.gameId }, (err, gameMap) => {
      if (err || !gameMap) {
        console.log("Error: coudn't find game map!");
        return next(err);
      }
      res.locals.gameMap = gameMap;
      return next();
    });
  };
}
