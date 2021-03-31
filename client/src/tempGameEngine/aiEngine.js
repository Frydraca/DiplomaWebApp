import GameEngine from "./gameEngine";
import {
  AttackCommand,
  BuildCommand,
  CreateCommand,
  DeleteCommand,
  MoveCommand,
} from "./commands/index";
import {
  SteelMineData,
  SolarPowerPlantData,
  CrystalMineData,
  FoundryData,
  CoreFactoryData,
  WorkshopData,
} from "./data/buildings/index";
import { RaiderBotData } from "./data/units/index";
import Building from "./objects/Building";
import GameState from "./objects/GameState";
import Unit from "./objects/Unit";

export class AiEngine {
  players = {};
  game = {};

  constructor(playerIds, scripts, startingGameState) {
    this.players = playerIds;
    console.log(startingGameState);
    this.game = new GameEngine(new GameState(startingGameState));
  }

  // Main run function
  RunGame() {
    let counter = 1;
    while (this.game.IsRunning()) {
      counter++;
      //script player1
      this.Do(
        this.BuildUpTo(
          this.players[0],
          this.Group(
            "Building",
            this.GroupElement(SteelMineData, 2),
            this.GroupElement(SolarPowerPlantData, 1),
            this.GroupElement(CrystalMineData, 1)
          )
        )
      );
      if (counter === 7) {
        this.Do(this.Create(this.players[0], RaiderBotData));
        this.Do(this.Move());
      }
      if (counter === 8) {
        this.Do(this.Attack());
      }

      //script player2
      this.Do(
        this.BuildUpTo(
          this.players[1],
          this.Group(
            "Building",
            this.GroupElement(SteelMineData, 1),
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

  // TODO delete. just for testing
  Move() {
    let units = this.game.gameState.GetUnits();
    let tiles = this.game.gameState.GetTiles();
    if (units.length > 0) {
      this.game.Execute(new MoveCommand(units[0], tiles[24]));
    }
  }
  Attack() {
    let units = this.game.gameState.GetUnits();
    let buildings = this.game.gameState.GetBuildings();
    this.game.Execute(new AttackCommand(units[0], buildings[1]));
  }

  Build(playerId, buildingData) {
    let newBuilding = new Building(buildingData, playerId);
    this.game.Execute(new BuildCommand(newBuilding));
  }

  BuildUpTo(playerId, buildingGroup) {
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
        this.game.GetBuildingsOfGivenType(playerId, buildingType).length;

      for (let i = 0; i < numberOfNeededBuildings; i++) {
        this.Build(playerId, buildingType);
      }
    });
  }

  Create(playerId, unitData) {
    let newUnit = new Unit(unitData, playerId);
    this.game.Execute(new CreateCommand(newUnit));
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
