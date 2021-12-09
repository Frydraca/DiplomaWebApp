import AiEngine from "../../../gameEngine/aiEngine.js";

export default function () {
  return function (req, res, next) {
    console.log("Run Simulation");

    if (
      res.locals.ownScriptContent != undefined &&
      res.locals.enemyScriptContent != undefined &&
      res.locals.gameMap != undefined
    ) {
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
        startingGameState: aiEngine.GetGame().GetStartingGameState(),
        commands: aiEngine.GetGame().GetCommands(),
      };
    }

    return next();
  };
}
