const AiEngine = require("../../../gameEngine/aiEngine");

module.exports = function () {
  return function (req, res, next) {
    console.log("Run Simulation");

    //aiEngine
    var playerIds = ["Player", "Server AI"];
    var aiEngine = new AiEngine(
      playerIds,
      res.locals.ownScriptContent,
      res.locals.enemyScriptContent,
      res.locals.gameMap
    );
    aiEngine.RunGame();
    res.locals.simulation = {
      startingGameState: aiEngine.game.startingGameState,
      commands: aiEngine.game.commands,
    };

    return next();
  };
};
