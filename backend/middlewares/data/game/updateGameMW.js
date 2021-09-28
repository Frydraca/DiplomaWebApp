const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");

  return function (req, res, next) {
    res.locals.game.markModified("buildings");
    res.locals.game.markModified("players");
    res.locals.game.markModified("tiles");
    res.locals.game.markModified("units");
    res.locals.game.save(function (err, successfulGame) {
      if (err) {
        console.log("Error: update failed");
        return next(err);
      }
      res.locals.retData = {
        id: successfulGame.id,
        currentGameState: {
          turnNumber: successfulGame.currentTurn,
          players: successfulGame.players,
          tiles: successfulGame.tiles,
          buildings: successfulGame.buildings,
          units: successfulGame.units,
        },
      };
      return next();
    });
  };
};
