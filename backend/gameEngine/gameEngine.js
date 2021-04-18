const GameState = require("./objects/GameState");
const AttackCommand = require("./commands/attackCommand");
const BuildCommand = require("./commands/buildCommand");
const CreateCommand = require("./commands/createCommand");
const DeleteCommand = require("./commands/deleteCommand");
const MoveCommand = require("./commands/moveCommand");

module.exports = class GameEngine {
  startingGameStateData = {};
  gameState = {};
  commands = [];
  currentTurnCommands = [];

  constructor(startingState) {
    this.startingGameStateData = startingState;
    this.gameState = new GameState(startingState);
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

  GetGameStateInTurn(turnNumber) {
    let responseGameState = new GameState(this.startingGameStateData);

    if (turnNumber > this.commands.length) {
      return responseGameState;
    }
    for (
      let currentTurnNumber = 0;
      currentTurnNumber < turnNumber;
      currentTurnNumber++
    ) {
      this.commands[currentTurnNumber].forEach((command) => {
        switch (command.GetType()) {
          case "attack":
            responseGameState.GetObjectByLocation(
              command.GetAttackerObject().GetLocation()
            );
            new AttackCommand(
              responseGameState.GetObjectByLocation(
                command.GetAttackerObject().GetLocation()
              ),
              responseGameState.GetObjectByLocation(
                command.GetTargetObject().GetLocation()
              )
            ).execute(this, responseGameState);
            break;
          case "build":
            new BuildCommand(command.GetBuilding()).execute(
              this,
              responseGameState
            );
            break;
          case "create":
            new CreateCommand(command.GetUnit()).execute(
              this,
              responseGameState
            );
            break;
          case "delete":
            new DeleteCommand(
              responseGameState.GetObjectByLocation(
                command.GetObjectToDelete().GetLocation()
              )
            ).execute(this, responseGameState);
            break;
          case "move":
            new MoveCommand(
              responseGameState.GetObjectByLocation(
                command.GetUnitToMove().GetLocation()
              ),
              command.GetTile()
            ).execute(this, responseGameState);
            break;
          default:
            break;
        }
      });
      responseGameState.GetBuildings().forEach((building) => {
        let player = responseGameState.GetPlayerById(building.GetOwner());
        player.SetResources(building.UpdateResources(player.GetResources()));
      });
      responseGameState.turnNumber += 1;
    }
    console.log(responseGameState);
    return responseGameState;
  }

  Execute(command) {
    if (command.execute(this, this.gameState)) {
      this.currentTurnCommands.push(command);
    }
    return command;
  }

  IsRunning() {
    return this.gameState.isRunning;
  }

  TurnEnd() {
    this.commands.push(this.currentTurnCommands);
    this.currentTurnCommands = [];
    this.CheckForGameEnd();
    this.UpdateResources();
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
      return true;
    }
    return false;
  }

  Create(gameState, unit) {
    let player = this.GetOwnerOfObject(gameState, unit);
    let locationResponse = unit.FindLocationToCreate(gameState.GetTiles());
    if (unit.CanCreate(player.resources) && locationResponse.success) {
      player.resources = unit.TakeCost(player.resources);
      gameState.AddUnitToTile(unit, locationResponse.tile);
      return true;
    }
    return false;
  }

  Move(gameState, unit, targetTile) {
    let currentTile = gameState.GetTileByLocation(unit.GetLocation());
    let path = gameState.FindPathBetween(currentTile, targetTile);
    if (path === "null") {
      console.log("path fail");
      return false;
    }
    let newTile;
    if (path.length <= unit.GetSpeed()) {
      newTile = path[path.length - 1].tile;
    } else {
      newTile = path[unit.GetSpeed()].tile;
    }
    gameState.RemoveUnitFromTile(currentTile);
    gameState.AddUnitToTile(unit, newTile);
    return true;
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
    this.gameState.GetBuildings().forEach((building) => {
      let player = this.gameState.GetPlayerById(building.GetOwner());
      player.SetResources(building.UpdateResources(player.GetResources()));
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
