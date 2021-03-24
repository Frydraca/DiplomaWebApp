import Building from "./buildings/Building";

export class GameEngine {
  gameState = {};
  buildings = [];
  commands = [];
  currentTurnCommands = [];

  constructor(startingState) {
    this.gameState = startingState;

    this.InitBuildings(startingState);
  }

  // Private functions //
  InitBuildings(startingState) {
    startingState.gameMap.forEach((element) => {
      if (element.building.name !== "null") {
        this.buildings.push(new Building(element.building));
      }
    });
  }

  CheckForGameEnd() {
    if (this.gameState.turnNumber >= 10) {
      this.gameState.isRunning = false;
    }
  }

  UpdateResources() {
    this.buildings.forEach((building) => {
      let player = this.gameState.players.find(
        (player) => player.playerid === building.owner
      );
      player.resources = building.UpdateResources(player.resources);
    });
  }

  // Public functions

  // Getters
  GetBuildingsOfPlayer(playerId) {
    return this.buildings.filter((element) => element.GetOwner() === playerId);
  }

  GetBuildingsOfGivenType(playerId, buildingData) {
    return this.buildings.filter(
      (element) =>
        element.GetOwner() === playerId &&
        element.GetName() === buildingData.name
    );
  }

  Execute(command) {
    if (command.execute(this)) {
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

  Build(building) {
    let player = this.gameState.players.find(
      (element) => element.playerId === building.GetOwner()
    );
    let location = building.FindLocationToBuild(this.gameState.gameMap);
    if (building.CanBuild(player.resources) && location.success) {
      player.resources = building.TakeCost(player.resources);
      this.buildings.push(building);
      let tile = this.gameState.gameMap.find(
        (element) => element.coordinates === location.coordinates
      );
      tile.building = building;
      return true;
    }
    return false;
  }
}

export default GameEngine;
