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
      commands: res.locals.simulation.commands,
      players: res.locals.simulation.startingGameState.players,
      tiles: res.locals.simulation.startingGameState.tiles,
      buildings: res.locals.simulation.startingGameState.buildings,
      units: res.locals.simulation.startingGameState.units,
    });

    game.save(function (err, successfulGame) {
      if (err) {
        return res.status(400).send("Cannot create game simulation!");
      }

      res.locals.retData = {
        id: successfulGame.id,
        currentGameState: res.locals.simulation.startingGameState,
      };
      return next();
    });
  };
};
