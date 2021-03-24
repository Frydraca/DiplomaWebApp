import { Do, Build, Group, GroupElement, BuildUpTo } from "./aiFunctions.js";
import { GameEngine } from "./gameEngine.js";
import SteelMineData from "./data/buildings/steelMine";
import SolarPowerPlantData from "./data/buildings/solarPowerPlant";
import CrystalMineData from "./data/buildings/crystalMine";
import CoreFactoryData from "./data/buildings/coreFactory";
import FoundryData from "./data/buildings/foundry";
import WorkshopData from "./data/buildings/workshop";

export function RunGame() {
  var gameState = require("./gameState.json");

  const playerId = "player1";
  const game = new GameEngine(gameState);

  while (game.IsRunning()) {
    Do(
      BuildUpTo(
        game,
        playerId,
        Group(
          "Building",
          GroupElement(SteelMineData, 2),
          GroupElement(SolarPowerPlantData, 1),
          GroupElement(CrystalMineData, 1)
        )
      )
    );

    game.TurnEnd();
  }
  console.log(game.commands);
  console.log(game.gameState);
}

export default RunGame;
