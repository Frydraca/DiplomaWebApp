const GameEngine = require("./gameEngine");
const AttackCommand = require("./commands/attackCommand");
const BuildCommand = require("./commands/buildCommand");
const CreateCommand = require("./commands/createCommand");
const DeleteCommand = require("./commands/deleteCommand");
const MoveCommand = require("./commands/moveCommand");
const SteelMineData = require("./data/buildings/steelMine");
const SolarPowerPlantData = require("./data/buildings/solarPowerPlant");
const CrystalMineData = require("./data/buildings/crystalMine");
const FoundryData = require("./data/buildings/foundry");
const CoreFactoryData = require("./data/buildings/coreFactory");
const WorkshopData = require("./data/buildings/workshop");
const RaiderBotData = require("./data/units/raiderBot");
const Building = require("./objects/Building");
const Unit = require("./objects/Unit");

module.exports = class AiEngine {
  players = {};
  game = {};

  constructor(playerIds, scripts, startingGameState) {
    this.players = playerIds;
    this.game = new GameEngine(startingGameState);
  }

  // Main run function
  RunGame() {
    let counter = 0;
    while (this.game.IsRunning()) {
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
      if (counter === 6) {
        this.Do(this.Create(this.players[0], RaiderBotData));
      }
      if (counter === 7) {
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
      counter++;
    }
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
};