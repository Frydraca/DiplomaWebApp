const AiEngine = require("../../../gameEngine/aiEngine");

module.exports = function () {
  return function (req, res, next) {
    console.log("Run Simulation");
    // get script

    //aiEngine
    var playerIds = ["player1", "serverAi"];
    var scripts = {};
    var aiEngine = new AiEngine(playerIds, scripts, res.locals.gameMap);
    aiEngine.RunGame();
    res.locals.simulation = {
      startingGameState: aiEngine.game.startingGameState,
      commands: aiEngine.game.commands,
    };

    return next();
  };
};
