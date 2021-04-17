const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");
  const Cell = requireOption(objectrepository, "Cell");
  const Building = requireOption(objectrepository, "Building");

  return function (req, res, next) {
    console.log("Create Game Simulation");

    var game = new Game({
      currentTurn: 0,
      currentCommandNumber: 0,
      commands: req.body.commands,
      players: req.body.startingGameState.players,
      tiles: req.body.startingGameState.tiles,
      buildings: req.body.startingGameState.buildings,
      units: req.body.startingGameState.units,
    });

    game.save(function (err, successfulGame) {
      if (err) {
        return res.status(400).send("Cannot create game simulation!");
      }

      res.locals.retData = {
        id: successfulGame.id,
        owner: {
          id: req.user.id,
          email: req.user.email,
          userName: req.user.userName,
        },
      };
      return next();
    });
  };
};
