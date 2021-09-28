const GameState = require("./objects/GameState");
const AttackCommand = require("./commands/attackCommand");
const MoveCommand = require("./commands/moveCommand");

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
    if (command.execute(this, this.gameState)) {
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
    console.log("turnnumber: " + this.gameState.turnNumber);
    console.log("nr of enemies: " + enemiesTooClose.length);
    if (enemiesTooClose.length === 0) return;
    // find the closest one out of them
    let closestEnemy = {};
    let distance = Number.POSITIVE_INFINITY;
    enemiesTooClose.forEach((enemy) => {
      if (playerId !== enemy.GetOwner()) {
        let currentDistance = unit.GetDistanceFromObject(enemy);
        if (currentDistance < distance) {
          closestEnemy = enemy;
          distance = currentDistance;
        }
      }
    });
    console.log(closestEnemy);

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
      if (playerId !== building.GetOwner()) {
        if (building.GetDistanceFromObject(commandCenter) <= range) {
          enemiesInRange.push(building);
        }
      }
    });

    return enemiesInRange;
  }

  Build(gameState, building) {
    let player = this.GetOwnerOfObject(gameState, building);
    let locationResponse;
    let buildingName = building.GetName();
    if (buildingName === "Crystal Mine" || buildingName === "Steel Mine") {
      locationResponse = gameState.GetClosestBuildingLocationToCommandCenter(
        player,
        building
      );
    } else {
      locationResponse = gameState.GetNextBuildingLocation(player, building);
    }

    if (building.CanBuild(player.resources) && locationResponse.success) {
      player.resources = building.TakeCost(player.resources);
      gameState.AddBuildingToTile(building, locationResponse.tile);
      return { success: true, location: locationResponse.tile.GetLocation() };
    }
    return { success: false, location: [] };
  }

  Create(gameState, unit) {
    let player = this.GetOwnerOfObject(gameState, unit);
    let locationResponse =
      gameState.GetClosestEmptyLocationToCommandCenter(player);
    if (unit.CanCreate(player.resources) && locationResponse.success) {
      player.resources = unit.TakeCost(player.resources);
      gameState.AddUnitToTile(unit, locationResponse.tile);
      gameState.AddUnit(unit);
      gameState.ChangeUnitLocation(unit, locationResponse.tile);

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

  Move(gameState, unit, targetTile) {
    let currentTile = gameState.GetTileByLocation(unit.GetLocation());
    let path = gameState.FindPathBetween(currentTile, targetTile);
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
    gameState.RemoveUnitFromTile(currentTile);
    gameState.AddUnitToTile(unit, newTile);
    gameState.ChangeUnitLocation(unit, newTile);
    return {
      success: true,
      start: currentTile.GetLocation(),
      end: newTile.GetLocation(),
    };
  }

  Attack(gameState, attackerObject, targetObject) {
    if (gameState.CanAttackTarget(attackerObject, targetObject)) {
      targetObject.TakeDamage(attackerObject.GetAttackDamage());
      if (targetObject.GetHitPoints() < 1) {
        if (targetObject.GetName() === "Command Center") {
          this.gameState.isRunning = false;
        }
        return gameState.RemoveObject(targetObject);
      }
      return true;
    }
    return false;
  }

  Delete(gameState, gameObject) {
    return gameState.RemoveObject(gameObject);
  }

  ModifyResource(gameState, playerId, resource, amount) {
    return gameState.ModifyResource(playerId, resource, amount);
  }

  UpgradeStat(gameState, playerId, unitType, statType) {
    return gameState.UpgradeStat(playerId, unitType, statType);
  }

  CheckForGameEnd() {
    if (this.gameState.turnNumber >= 50) {
      this.gameState.isRunning = false;
    }
  }

  UpdateResources() {
    let oldPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
    this.gameState.GetBuildings().forEach((building) => {
      let player = this.gameState.GetPlayerById(building.GetOwner());
      player.SetResources(building.UpdateResources(player.GetResources()));
    });
    let newPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
    this.currentTurnCommands.push({
      type: "updateResources",
      oldPlayers: oldPlayers,
      newPlayers: newPlayers,
    });
  }

  GetOwnerOfObject(gameState, object) {
    return gameState.players.find(
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
      if (playerId !== unit.GetOwner()) {
        let currentDistance = unit.GetDistanceFromObject(gameObject);
        if (currentDistance < distance) {
          closestEnemy = unit;
          distance = currentDistance;
        }
      }
    });
    this.gameState.GetBuildings().forEach((building) => {
      if (playerId !== building.GetOwner()) {
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
      if (playerId !== unit.GetOwner()) {
        enemyHasUnit = true;
      }
    });
    return enemyHasUnit;
  }

  DoesEnemyHasBuildings(playerId) {
    let enemyHasBuilding = false;
    this.gameState.GetBuildings().forEach((building) => {
      if (playerId !== building.GetOwner()) {
        enemyHasBuilding = true;
      }
    });
    return enemyHasBuilding;
  }
};
