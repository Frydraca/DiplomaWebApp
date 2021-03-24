import { Do, Build, Group, GroupElement, BuildUpTo } from "./aiFunctions.js";
import { GameEngine } from "./gameEngine.js";
import SteelMineData from "./data/buildings/steelMine";

export function RunGame() {
  var gameStartState = require("./gameState.json");
  const playerId = "player1";

  const game = new GameEngine(gameStartState);

  while (game.IsRunning()) {
    //Build(game, playerId, SteelMineData);
    BuildUpTo(
      game,
      playerId,
      Group("Building", GroupElement(SteelMineData, 2))
    );
    game.TurnEnd();
  }
  console.log(game.commands);
  console.log(game.gameState);
}

export default RunGame;
