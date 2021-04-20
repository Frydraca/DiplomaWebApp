const GameState = require("./objects/GameState");
const AttackCommand = require("./commands/attackCommand");
const BuildCommand = require("./commands/buildCommand");
const CreateCommand = require("./commands/createCommand");
const DeleteCommand = require("./commands/deleteCommand");
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

  // Getters
  GetBuildingsOfPlayer(playerId) {
    return this.buildings.filter((element) => element.GetOwner() === playerId);
  }

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
    this.UpdateResources();
    this.CheckForGameEnd();
    this.commands.push(this.currentTurnCommands);
    this.currentTurnCommands = [];
    this.gameState.turnNumber += 1;
  }

  //TODO delete this function after testing
  GetCurrentGameState() {
    return this.gameState;
  }

  GetStartingGameState() {
    return new GameState(this.startingGameStateData);
  }

  GetCommands() {
    return this.commands;
  }

  Build(gameState, building) {
    let player = this.GetOwnerOfObject(gameState, building);
    let locationResponse = gameState.GetClosestBuildingLocationToCommandCenter(
      player,
      building
    );
    if (building.CanBuild(player.resources) && locationResponse.success) {
      player.resources = building.TakeCost(player.resources);
      gameState.AddBuildingToTile(building, locationResponse.tile);
      return { success: true, location: locationResponse.tile.GetLocation() };
    }
    return { success: false, location: [] };
  }

  Create(gameState, unit) {
    let player = this.GetOwnerOfObject(gameState, unit);
    let locationResponse = unit.FindLocationToCreate(gameState.GetTiles());
    if (unit.CanCreate(player.resources) && locationResponse.success) {
      player.resources = unit.TakeCost(player.resources);
      gameState.AddUnitToTile(unit, locationResponse.tile);
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
        return gameState.RemoveObject(targetObject);
      }
      return true;
    }
    return false;
  }

  Delete(gameState, gameObject) {
    return gameState.RemoveObject(gameObject);
  }

  CheckForGameEnd() {
    if (this.gameState.turnNumber >= 10) {
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
};
