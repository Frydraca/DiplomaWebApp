import requireOption from "../../../config/requireOption.js";

export default function (objectrepository) {
  const GameMap = requireOption(objectrepository, "GameMap");

  return function (req, res, next) {
    var gameMap = new GameMap({
      name: req.body.name,
      description: req.body.description,
      width: req.body.width,
      height: req.body.height,
      tiles: req.body.tiles,
      startingLocations: req.body.startingLocations,
    });

    gameMap.save(function (err, successfulMap) {
      if (err) {
        return res.status(400).send("Cannot create map!");
      }

      res.locals.retData = {};
      return next();
    });
  };
}
