import requireOption from "../../../config/requireOption.js";

export default function (objectrepository) {
  const Game = requireOption(objectrepository, "Game");

  return function (req, res, next) {
    console.log("Create Game Simulation");

    var game = new Game({
      currentTurn: 0,
      currentCommandNumber: 0,
      commands: res.locals.simulation.commands,
      players: res.locals.simulation.startingGameState.GetPlayers(),
      startingPlayers: res.locals.simulation.startingGameState.GetPlayers(),
      tiles: res.locals.simulation.startingGameState.GetTiles(),
      buildings: res.locals.simulation.startingGameState.GetBuildings(),
      units: res.locals.simulation.startingGameState.GetUnits(),
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
}
