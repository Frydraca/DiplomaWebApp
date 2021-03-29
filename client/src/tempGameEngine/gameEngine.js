export class GameEngine {
  gameState = {};
  commands = [];
  currentTurnCommands = [];

  constructor(startingState) {
    console.log(startingState);
    this.gameState = startingState;
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
    let player = this.GetOwnerOfObject(building);
    let locationResponse = building.FindLocationToBuild(
      this.gameState.GetTiles()
    );
    if (building.CanBuild(player.resources) && locationResponse.success) {
      player.resources = building.TakeCost(player.resources);

      this.gameState.AddBuildingToTile(building, locationResponse.tile);
      return true;
    }
    return false;
  }

  Create(unit) {
    let player = this.GetOwnerOfObject(unit);

    return false;
  }

  Move(unit, targetLocation) {
    return false;
  }

  Attack(unit, attackTarget) {
    return false;
  }

  Delete(gameObject) {
    return false;
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

  GetOwnerOfObject(object) {
    return this.gameState.players.find(
      (player) => player.playerId === object.GetOwner()
    );
  }

  DoesPlayerHaveGivenBuilding(playerId, buildingType) {
    let buildingsOfPlayer = this.GetBuildingsOfPlayer(playerId);
    buildingsOfPlayer.includes(buildingType);
  }
}

export default GameEngine;
