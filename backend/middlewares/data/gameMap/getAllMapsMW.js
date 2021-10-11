import requireOption from "../../../config/requireOption.js";

export default function (objectrepository) {
  const GameMap = requireOption(objectrepository, "GameMap");

  return function (req, res, next) {
    GameMap.find({}, (err, gameMaps) => {
      if (err) {
        return next(err);
      }

      res.locals.retData = { gameMaps: gameMaps };
      return next();
    });
  };
}
