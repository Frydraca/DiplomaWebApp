import Building from "./Building";
import Player from "./Player";
import Tile from "./Tile";
import Unit from "./Unit";

export default class GameState {
  turnNumber = 1;
  isRunning = true;
  players = [];
  buildings = [];
  units = [];
  tiles = [];

  constructor(startingGameState) {
    this.turnNumber = startingGameState.turnNumber;
    this.isRunning = startingGameState.isRunning;
    startingGameState.players.forEach((playerData) => {
      this.players.push(new Player(playerData));
    });
    startingGameState.gameMap.forEach((tile) => {
      let buildingId = "null";
      let unitId = "null";
      if (tile.building !== "null") {
        let newBuilding = new Building(tile.building);
        buildingId = newBuilding.GetObjectId();
        this.buildings.push(newBuilding);
      }
      if (tile.unit !== "null") {
        let newUnit = new Unit(tile.unit);
        unitId = newUnit.GetObjectId();
        this.units.push(newUnit);
      }
      this.tiles.push(new Tile(tile, buildingId, unitId));
    });
  }

  GetTurnNumber() {
    return this.turnNumber;
  }

  IsRunning() {
    return this.IsRunning;
  }

  GetPlayers() {
    return this.players;
  }

  GetPlayerById(playerId) {
    return this.players.find((element) => element.GetPlayerId() === playerId);
  }

  GetBuildings() {
    return this.buildings;
  }

  GetTiles() {
    return this.tiles;
  }

  AddBuildingToTile(building, tile) {
    if (this.tiles.includes(tile) && tile.IsEmpty()) {
      this.buildings.push(building);
      this.tiles
        .find((element) => element === tile)
        .SetBuildingId(building.GetObjectId());
    }
  }
}
