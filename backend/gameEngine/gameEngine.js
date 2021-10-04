const GameState = require("./objects/GameState");
const AttackCommand = require("./commands/attackCommand");
const MoveCommand = require("./commands/moveCommand");
const AddBuildingCommand = require("./commands/addBuildingCommand");
const RemoveBuildingCommand = require("./commands/removeBuildingCommand");
const RubbleData = require("./data/buildings/rubble");
const Building = require("./objects/Building");

module.exports = class GameEngine {
  startingGameStateData = {};
  gameState = {};
  startingGameState = {};
  commands = [];
  currentTurnCommands = [];

  constructor(startingState) {
    this.startingGameStateData = startingState;
    this.gameState = new GameState(startingState);
    this.startingGameState = JSON.parse(JSON.stringify(this.gameState));
  }

  // Public functions

  GetBuildingsOfGivenType(playerId, buildingData) {
    return this.gameState
      .GetBuildings()
      .filter(
        (element) =>
          element.GetOwner() === playerId &&
          element.GetName() === buildingData.name
      );
  }

  Execute(command) {
    if (command.execute(this)) {
      this.currentTurnCommands.push(command.GetResult());
    }
    return command;
  }

  IsRunning() {
    return this.gameState.isRunning;
  }

  TurnEnd() {
    this.gameState.GetUnits().forEach((unit) => {
      unit.SetHasAction(true);
    });
    this.gameState.GetPlayers().forEach((player) => {
      let battleGroups = player.GetBattleGroups();
      battleGroups.forEach((group) => {
        group.CheckUnits();
      });
    });
    this.UpdateResources();
    this.AdvanceRubble();
    this.CheckForGameEnd();
    this.commands.push(this.currentTurnCommands);
    this.currentTurnCommands = [];
    this.gameState.turnNumber += 1;
  }

  GetGameState() {
    return this.gameState;
  }

  GetStartingGameState() {
    return new GameState(this.startingGameStateData);
  }

  GetCommands() {
    return this.commands;
  }

  ActivateUnits() {
    for (let i = 0; i < this.gameState.units.length; i++) {
      let unit = this.gameState.units[i];
      //do something
      let playerId = unit.GetOwner();
      let player = this.gameState.GetPlayerById(playerId);

      //check if in battlegroup
      //check status
      if (unit.InGroup()) {
        let battleGroup = player
          .GetBattleGroups()
          .find((group) => group.id === unit.GetBattleGroup());
        if (battleGroup === undefined) {
          console.log("Error! Couldn't find battlegroup!");
          continue;
        }
        switch (battleGroup.GetStatus()) {
          case "Wait":
            if (this.AttackCheck(unit, playerId)) {
              let enemy = this.GetClosestEnemy(unit);
              if (unit.InRange(enemy)) {
                this.Execute(new AttackCommand(unit, enemy));
                unit.SetHasAction(false);
              }
            }
            break;
          case "Active":
            switch (battleGroup.GetTask()) {
              case "Attack":
                if (this.AttackCheck(unit, playerId)) {
                  this.GeneralAttackMove(unit);
                }
                break;
              case "Defend":
                if (this.AttackCheck(unit, playerId)) {
                  let enemy = this.GetClosestEnemy(unit);
                  if (unit.InRange(enemy)) {
                    this.Execute(new AttackCommand(unit, enemy));
                    unit.SetHasAction(false);
                  }
                  this.GeneralDefendMove(unit, playerId);
                }
                break;
              default:
                console.log(
                  "Error! Unrecognized battle group task: " +
                    battleGroup.GetTask()
                );
                break;
            }
            break;
          case "Retreat":
            break;
          default:
            console.log(
              "Error! unrecognized battle group status: " +
                battleGroup.GetStatus()
            );
            break;
        }
      } else {
        if (this.AttackCheck(unit, playerId)) {
          this.GeneralAttackMove(unit);
        }
      }
    }
  }

  GeneralAttackMove(unit) {
    let enemy = this.GetClosestEnemy(unit);
    if (unit.InRange(enemy)) {
      this.Execute(new AttackCommand(unit, enemy));
    } else {
      this.Execute(
        new MoveCommand(
          unit,
          this.GetGameState().GetTileByLocation(enemy.GetLocation())
        )
      );
    }
    unit.SetHasAction(false);
  }

  GeneralDefendMove(unit, playerId) {
    // get enemies in range of command center
    let enemiesTooClose = this.FindEnemiesInRangeOfCommandcenter(10, playerId);
    if (enemiesTooClose.length === 0) return;
    // find the closest one out of them
    let closestEnemy = {};
    let distance = Number.POSITIVE_INFINITY;
    enemiesTooClose.forEach((enemy) => {
      if (playerId !== enemy.GetOwner() && enemy.GetOwner() !== "gaia") {
        let currentDistance = unit.GetDistanceFromObject(enemy);
        if (currentDistance < distance) {
          closestEnemy = enemy;
          distance = currentDistance;
        }
      }
    });

    if (unit.InRange(closestEnemy)) {
      this.Execute(new AttackCommand(unit, closestEnemy));
    } else {
      this.Execute(
        new MoveCommand(
          unit,
          this.GetGameState().GetTileByLocation(closestEnemy.GetLocation())
        )
      );
    }
    unit.SetHasAction(false);
  }

  AttackCheck(unit, playerId) {
    return (
      unit.HasAction() &&
      (this.DoesEnemyHasUnits(playerId) || this.DoesEnemyHasBuildings(playerId))
    );
  }

  FindEnemiesInRangeOfCommandcenter(range, playerId) {
    let enemiesInRange = [];
    let commandCenter = this.gameState
      .GetBuildings()
      .filter(
        (element) =>
          element.GetOwner() === playerId &&
          element.GetName() === "Command Center"
      )[0];
    this.gameState.GetUnits().forEach((unit) => {
      if (playerId !== unit.GetOwner()) {
        if (unit.GetDistanceFromObject(commandCenter) <= range) {
          enemiesInRange.push(unit);
        }
      }
    });
    this.gameState.GetBuildings().forEach((building) => {
      if (playerId !== building.GetOwner() && building.GetOwner() !== "gaia") {
        if (building.GetDistanceFromObject(commandCenter) <= range) {
          enemiesInRange.push(building);
        }
      }
    });

    return enemiesInRange;
  }

  AddBuilding(building, location) {
    this.gameState.AddBuildingToTile(
      building,
      this.gameState.GetTileByLocation(location)
    );
    return true;
  }

  RemoveBuilding(building) {
    this.gameState.RemoveBuildingFromTile(
      this.gameState.GetTileByLocation(building.GetLocation())
    );
    this.gameState.RemoveBuilding(building);
    return true;
  }

  Build(building) {
    let player = this.GetOwnerOfObject(building);
    let locationResponse;
    let buildingName = building.GetName();
    if (buildingName === "Crystal Mine" || buildingName === "Steel Mine") {
      locationResponse =
        this.gameState.GetClosestBuildingLocationToCommandCenter(
          player,
          building
        );
    } else {
      locationResponse = this.gameState.GetNextBuildingLocation(
        player,
        building
      );
    }

    if (building.CanBuild(player.resources) && locationResponse.success) {
      player.resources = building.TakeCost(player.resources);
      this.gameState.AddBuildingToTile(building, locationResponse.tile);
      return { success: true, location: locationResponse.tile.GetLocation() };
    }
    return { success: false, location: [] };
  }

  Create(unit) {
    let player = this.GetOwnerOfObject(unit);
    let locationResponse =
      this.gameState.GetClosestEmptyLocationToCommandCenter(player);
    if (unit.CanCreate(player.resources) && locationResponse.success) {
      player.resources = unit.TakeCost(player.resources);
      this.gameState.AddUnitToTile(unit, locationResponse.tile);
      this.gameState.AddUnit(unit);
      this.gameState.ChangeUnitLocation(unit, locationResponse.tile);

      let battleGroups = player.GetBattleGroups();
      for (let i = 0; i < battleGroups.length; i++) {
        if (battleGroups[i].NeedUnitType(unit.GetName())) {
          unit.AddGroupName(battleGroups[i].GetId());
          battleGroups[i].AddUnit(unit);
        }
      }
      return { success: true, location: locationResponse.tile.GetLocation() };
    }
    return { success: false, location: [] };
  }

  Move(unit, targetTile) {
    let currentTile = this.gameState.GetTileByLocation(unit.GetLocation());
    let path = this.gameState.FindPathBetween(currentTile, targetTile);
    if (path === "null") {
      console.log("path fail");
      return { success: false, start: [], end: [] };
    }
    let newTile;
    if (path.length <= unit.GetSpeed()) {
      newTile = path[path.length - 1].tile;
    } else {
      newTile = path[unit.GetSpeed()].tile;
    }
    this.gameState.RemoveUnitFromTile(currentTile);
    this.gameState.AddUnitToTile(unit, newTile);
    this.gameState.ChangeUnitLocation(unit, newTile);
    return {
      success: true,
      start: currentTile.GetLocation(),
      end: newTile.GetLocation(),
    };
  }

  Attack(attackerObject, targetObject) {
    if (this.gameState.CanAttackTarget(attackerObject, targetObject)) {
      targetObject.TakeDamage(attackerObject.GetAttackDamage());
      if (targetObject.GetHitPoints() < 1) {
        if (targetObject.GetName() === "Command Center") {
          this.gameState.isRunning = false;
        }
        this.gameState.RemoveObject(targetObject);
        if (targetObject.GetType() === "building") {
          let tile = this.gameState.GetTileByLocation(
            targetObject.GetLocation()
          );
          let newBuilding = new Building(RubbleData, "gaia");
          this.Execute(new AddBuildingCommand(newBuilding, tile.GetLocation()));
        }
      }
      return true;
    }
    return false;
  }

  Delete(gameObject) {
    return this.gameState.RemoveObject(gameObject);
  }

  ModifyResource(playerId, resource, amount) {
    return this.gameState.ModifyResource(playerId, resource, amount);
  }

  UpgradeStat(playerId, unitType, statType) {
    return this.gameState.UpgradeStat(playerId, unitType, statType);
  }

  AdvanceRubble() {
    let rubbleToDelete = [];
    this.gameState.GetBuildings().forEach((building) => {
      if (building.GetName() === "Rubble") {
        building.IncreaseBuildProgress(1);
        if (building.IsComplete()) {
          rubbleToDelete.push(building.GetObjectId());
        }
      }
    });
    rubbleToDelete.forEach((rubbleId) => {
      let rubble = this.gameState.GetBuildingById(rubbleId);
      this.Execute(new RemoveBuildingCommand(rubble, rubble.GetLocation()));
    });
  }

  CheckForGameEnd() {
    if (this.gameState.turnNumber >= 50) {
      this.gameState.isRunning = false;
    }
  }

  UpdateResources() {
    let oldPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
    this.gameState.GetBuildings().forEach((building) => {
      if (building.GetOwner() !== "gaia") {
        let player = this.gameState.GetPlayerById(building.GetOwner());
        player.SetResources(building.UpdateResources(player.GetResources()));
      }
    });
    let newPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
    this.currentTurnCommands.push({
      type: "updateResources",
      oldPlayers: oldPlayers,
      newPlayers: newPlayers,
    });
  }

  GetOwnerOfObject(object) {
    return this.gameState.players.find(
      (player) => player.playerId === object.GetOwner()
    );
  }

  DoesPlayerHaveGivenBuilding(playerId, buildingType) {
    let buildingsOfPlayer = this.GetBuildingsOfPlayer(playerId);
    buildingsOfPlayer.includes(buildingType);
  }

  GetNumberOfGameObjectByPlayerId(gameObject, playerId) {
    let number = 0;

    this.gameState.GetBuildings().forEach((building) => {
      if (
        building.GetName() === gameObject.name &&
        building.GetOwner() === playerId
      ) {
        number++;
      }
    });

    this.gameState.GetUnits().forEach((unit) => {
      if (unit.GetName() === gameObject.name && unit.GetOwner() === playerId) {
        number++;
      }
    });

    return number;
  }

  GetClosestEnemy(gameObject) {
    let playerId = gameObject.GetOwner();
    let closestEnemy = {};
    let distance = Number.POSITIVE_INFINITY;
    this.gameState.GetUnits().forEach((unit) => {
      if (playerId !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
        let currentDistance = unit.GetDistanceFromObject(gameObject);
        if (currentDistance < distance) {
          closestEnemy = unit;
          distance = currentDistance;
        }
      }
    });
    this.gameState.GetBuildings().forEach((building) => {
      if (playerId !== building.GetOwner() && building.GetOwner() !== "gaia") {
        let currentDistance = building.GetDistanceFromObject(gameObject);
        if (currentDistance < distance) {
          closestEnemy = building;
          distance = currentDistance;
        }
      }
    });
    return closestEnemy;
  }

  DoesEnemyHasUnits(playerId) {
    let enemyHasUnit = false;
    this.gameState.GetUnits().forEach((unit) => {
      if (playerId !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
        enemyHasUnit = true;
      }
    });
    return enemyHasUnit;
  }

  DoesEnemyHasBuildings(playerId) {
    let enemyHasBuilding = false;
    this.gameState.GetBuildings().forEach((building) => {
      if (playerId !== building.GetOwner() && building.GetOwner() !== "gaia") {
        enemyHasBuilding = true;
      }
    });
    return enemyHasBuilding;
  }
};
