const GameEngine = require("./gameEngine");
const AttackCommand = require("./commands/attackCommand");
const BuildCommand = require("./commands/buildCommand");
const CreateCommand = require("./commands/createCommand");
const DeleteCommand = require("./commands/deleteCommand");
const ModifyResourceCommand = require("./commands/modifyResourceCommand");
const MoveCommand = require("./commands/moveCommand");
const UpgradeCommand = require("./commands/upgradeCommand");
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
const BattleGroup = require("./objects/BattleGroup");
const PricesData = require("./data/prices");
const UpgradeCostsData = require("./data/upgradeCosts");

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
      //script Player
      //console.log(this.pScript);

      eval(this.pScript);

      //script Server AI

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

  Attack(playerId) {
    let units = this.game
      .GetGameState()
      .GetUnits()
      .filter((unit) => unit.GetOwner() === playerId);
    // Ha van egységed
    // Minden egységre szabad akcióval
    units.forEach((unit) => {
      // Ha van enemy target
      if (
        unit.GetHasAction() &&
        (this.game.DoesEnemyHasUnits(playerId) ||
          this.game.DoesEnemyHasBuildings(playerId))
      ) {
        // find closest enemy
        let enemy = this.game.GetClosestEnemy(unit);
        if (unit.InRange(enemy)) {
          this.game.Execute(new AttackCommand(unit, enemy));
        } else {
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
    let player = this.game.gameState.GetPlayerById(playerId);
    let upgradesForUnit = player
      .GetUpgradeList()
      .GetUpgradesForType(unitData.upgradeType);
    let upgradedUnitData = JSON.parse(JSON.stringify(unitData));
    // TODO maybe custom numbers and not only +1s
    if (upgradesForUnit.attack) {
      upgradedUnitData.attackDamage += 1;
    }
    if (upgradesForUnit.armor) {
      upgradedUnitData.armor += 1;
    }
    if (upgradesForUnit.hitPoints) {
      upgradedUnitData.hitPoints += 12;
    }
    if (upgradesForUnit.speed) {
      upgradedUnitData.speed += 1;
    }
    let newUnit = new Unit(upgradedUnitData, playerId);
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

  Trading(playerId, ...tradeRules) {
    for (let i = 0; i < tradeRules.length; i++) {
      tradeRules[i];
    }
  }

  Buy(playerId, resource, value) {
    let player = this.game.gameState.GetPlayerById(playerId);
    let resources = player.GetResources();

    if (resource in resources) {
      if (
        value > resources[resource] &&
        resources.credits >= PricesData[resource]
      ) {
        let neededAmount = value - resources[resource];
        let priceAmount = Math.floor(
          resources["credits"] / PricesData[resource]
        );
        let amount = Math.min(neededAmount, priceAmount);
        let price = amount * PricesData[resource] * -1;
        this.game.Execute(
          new ModifyResourceCommand(playerId, resource, amount)
        );
        this.game.Execute(
          new ModifyResourceCommand(playerId, "credits", price)
        );
      }
    } else {
      console.log(
        "Error with Trading! " + resource + " is not a valid resource type!"
      );
    }
  }

  Sell(playerId, resource, value) {
    let player = this.game.gameState.GetPlayerById(playerId);
    let resources = player.GetResources();

    if (value < resources[resource]) {
      let amount = value - resources[resource];
      let price = amount * PricesData[resource] * -1; // amount is negative
      this.game.Execute(new ModifyResourceCommand(playerId, resource, amount));
      this.game.Execute(new ModifyResourceCommand(playerId, "credits", price));
    }
  }

  Research(playerId, ...upgradeOrders) {
    for (let i = 0; i < upgradeOrders.length; i++) {
      upgradeOrders[i];
    }
  }

  UpgradeStats(playerId, unit, stat) {
    let player = this.game.gameState.GetPlayerById(playerId);
    let resources = player.GetResources();
    let neededResources = UpgradeCostsData[unit.upgradeType][stat];
    if (player.GetUpgradeList().GetUpgradesForType(unit.upgradeType)[stat]) {
      return;
    }

    for (const [resource, value] of Object.entries(neededResources)) {
      if (resources[resource] < value) {
        return;
      }
    }

    for (const [resource, value] of Object.entries(neededResources)) {
      let negativeValue = 0 - value;
      this.game.Execute(
        new ModifyResourceCommand(playerId, resource, negativeValue)
      );
    }

    this.game.Execute(new UpgradeCommand(playerId, unit.upgradeType, stat));
  }

  CombatGroup(playerId, groupId, group, task, ...tactics) {
    let player = this.game.gameState.GetPlayerById(playerId);
    if (
      undefined ===
      player.GetBattleGroups().find((element) => element.GetId() === groupId)
    ) {
      let expectedUnits = [];
      group.elements.forEach((element) => {
        for (let i = 0; i < element.number; i++) {
          expectedUnits.push(element.gameObject.name);
        }
      });

      let battleGroup = new BattleGroup(
        playerId,
        groupId,
        expectedUnits,
        task,
        tactics
      );
      player.AddBattleGroup(battleGroup);
    }
  }

  RetreatTactic(
    groupRetreatValue,
    individualRetreatAllowed,
    individualRetreatPercentage
  ) {
    return {
      type: "RetreatTactic",
      contents: {
        groupRetreatAllowed: true,
        groupRetreatValue: groupRetreatValue,
        individualRetreatAllowed: individualRetreatAllowed,
        individualRetreatPercentage: individualRetreatPercentage,
      },
    };
  }

  FocusFireTactic(focusFireTarget, focusOnlyUnits) {
    return {
      type: "FocusFireTactic",
      contents: {
        focusFireEnabled: true,
        focusFireTarget: focusFireTarget,
        focusOnlyUnits: focusOnlyUnits,
      },
    };
  }

  Do(action) {
    return action;
  }
};
