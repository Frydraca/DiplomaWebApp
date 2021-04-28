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
const ArtilleryBotData = require("./data/units/artilleryBot");
const AttackBotData = require("./data/units/attackBot");
const RaiderBotData = require("./data/units/raiderBot");
const TankBotData = require("./data/units/tankBot");
const Building = require("./objects/Building");
const Unit = require("./objects/Unit");

module.exports = class AiEngine {
  players = {};
  game = {};
  pScript = "";
  sScript = "";

  constructor(playerIds, playerScript, serverScript, startingGameState) {
    this.players = playerIds;
    this.game = new GameEngine(startingGameState);
    this.pScript = playerScript.replace(/playerId/g, "this.players[0]");
    this.sScript = serverScript.replace(/playerId/g, "this.players[1]");
  }

  // Main run function
  RunGame() {
    let counter = 0;
    while (this.game.IsRunning()) {
      //script player1
      //console.log(this.pScript);

      eval(this.pScript);

      //script player2

      // console.log("serverScript");
      // console.log(this.sScript);
      if (this.game.IsRunning()) {
        eval(this.sScript);
      }

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
  Attack(playerId) {
    let units = this.game
      .GetGameState()
      .GetUnits()
      .filter((unit) => unit.GetOwner() === playerId);
    // Ha van egységed
    // Minden egységre szabad akcióval
    units.forEach((unit) => {
      if (unit.GetHasAction()) {
        // find closest enemy
        let enemy = this.game.GetClosestEnemy(unit);
        if (unit.InRange(enemy)) {
          console.log("attack");
          this.game.Execute(new AttackCommand(unit, enemy));
        } else {
          console.log("move");
          this.game.Execute(
            new MoveCommand(
              unit,
              this.game.GetGameState().GetTileByLocation(enemy.GetLocation())
            )
          );
        }
        unit.SetHasAction(false);
      }
    });
    // Legközelebbi enemy megkeresése

    // ha rangeben van attack

    // ha nincs akkor mozog felé
    //this.game.Execute(new AttackCommand(units[0], buildings[1]));
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

  CreateNTimes(playerId, unitData, number) {
    for (let i = 0; i < number; i++) {
      this.Create(playerId, unitData);
    }
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

  GetNumberOfOwn(gameObject, playerId) {
    return this.game.GetNumberOfGameObjectByPlayerId(gameObject, playerId);
  }

  Do(action) {
    return action;
  }
};
