import requireOption from "../../../config/requireOption.js";

export default function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");

  return function (req, res, next) {
    Game.findOne({ _id: req.params.gameId }, (err, game) => {
      if (err || !game) {
        console.log("Error: coudn't find game!");
        return next(err);
      }
      res.locals.game = game;
      return next();
    });
  };
}
