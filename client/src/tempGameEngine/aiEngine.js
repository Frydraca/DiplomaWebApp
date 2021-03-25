import GameEngine from "./gameEngine";
import { BuildCommand } from "./commands/buildCommand";
import Building from "./objects/Building";
import {
  SteelMineData,
  SolarPowerPlantData,
  CrystalMineData,
  FoundryData,
  CoreFactoryData,
  WorkshopData,
} from "./data/buildings/index";

export class AiEngine {
  players = {};
  game = {};

  constructor(playerIds, scripts, startingGameState) {
    this.players = playerIds;
    this.game = new GameEngine(startingGameState);
  }

  // Main run function
  RunGame() {
    let playerId = this.players[0];
    while (this.game.IsRunning()) {
      this.Do(
        this.BuildUpTo(
          this.game,
          playerId,
          this.Group(
            "Building",
            this.GroupElement(SteelMineData, 2),
            this.GroupElement(SolarPowerPlantData, 1),
            this.GroupElement(CrystalMineData, 1)
          )
        )
      );

      this.game.TurnEnd();
    }
    console.log(this.game.commands);
    console.log(this.game.gameState);
  }

  /////////////////////////////////
  // Script interpeter functions //
  /////////////////////////////////

  Build(gameEngine, playerId, buildingData) {
    buildingData.owner = playerId;
    let newBuilding = new Building(buildingData);
    gameEngine.Execute(new BuildCommand(newBuilding));
  }

  BuildUpTo(gameEngine, playerId, buildingGroup) {
    if (buildingGroup.groupType !== "Building") {
      console.log("Error: wrong type! Type: " + buildingGroup.groupType);
    }

    buildingGroup.elements.forEach((element) => {
      let numberOfNeededBuildings = 0;
      let buildingType = {};
      switch (element.gameObject.name) {
        case "Command Center":
          console.log("Error: Cant build new command centers!"); //TODO error handling
          break;
        case "Steel Mine":
          buildingType = SteelMineData;
          break;
        case "Solar Power Plant":
          buildingType = SolarPowerPlantData;
          break;
        case "Crystal Mine":
          buildingType = CrystalMineData;
          break;
        case "Foundry":
          buildingType = FoundryData;
          break;
        case "Core Factory":
          buildingType = CoreFactoryData;
          break;
        case "Workshop":
          buildingType = WorkshopData;
          break;
        default:
          break;
      }
      numberOfNeededBuildings =
        element.number -
        gameEngine.GetBuildingsOfGivenType(playerId, buildingType).length;

      for (let i = 0; i < numberOfNeededBuildings; i++) {
        this.Build(gameEngine, playerId, buildingType);
      }
    });
  }

  Group(type, ...elements) {
    let group = {
      groupType: type,
      elements: elements,
    };
    return group;
  }

  GroupElement(gameObject, number) {
    let element = {
      gameObject: gameObject,
      number: number,
    };
    return element;
  }

  Do(action) {
    return action;
  }
}
