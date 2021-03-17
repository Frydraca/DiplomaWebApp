import { Do, BuildUpTo, Group, GroupElement } from "./aiFunctions.js";
import { UpdateResources, CheckForGameEnd } from "./gameFunctions.js";

export function RunGame() {
  var gameState = require("./gameState.json");

  var gameRuns = true;
  var gameTurn = 1;
  while (gameRuns) {
    let newTurn = JSON.parse(
      JSON.stringify(gameState.turns[gameState.turns.length - 1])
    );

    newTurn.turn += 1;

    Do(BuildUpTo(newTurn, Group("Building", GroupElement("(SteelMine)", 1))));

    newTurn = UpdateResources(newTurn);
    gameRuns = !CheckForGameEnd(gameTurn);
    gameTurn += 1;
    gameState.turns.push(newTurn);
  }
  console.log(gameState);
}

export default RunGame;
