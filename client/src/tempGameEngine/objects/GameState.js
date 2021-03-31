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
        let newBuilding = new Building(tile.building, tile.building.owner);
        buildingId = newBuilding.GetObjectId();
        this.buildings.push(newBuilding);
      }
      if (tile.unit !== "null") {
        let newUnit = new Unit(tile.unit, tile.unit.owner);
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

  GetBuildingById(buildingId) {
    return this.buildings.find(
      (element) => element.GetObjectId() === buildingId
    );
  }

  GetUnits() {
    return this.units;
  }

  GetUnitById(unitId) {
    return this.units.find((element) => element.GetObjectId() === unitId);
  }

  GetTiles() {
    return this.tiles;
  }

  GetTileByLocation(location) {
    return this.tiles.find((element) => element.location === location);
  }

  AddBuildingToTile(building, tile) {
    if (this.tiles.includes(tile) && tile.IsEmpty()) {
      building.SetLocation(tile.GetLocation());
      this.buildings.push(building);
      this.tiles
        .find((element) => element === tile)
        .SetBuildingId(building.GetObjectId());
    }
  }

  AddUnitToTile(unit, tile) {
    if (this.tiles.includes(tile) && tile.IsEmpty()) {
      unit.SetLocation(tile.GetLocation());
      this.units.push(unit);
      this.tiles
        .find((element) => element === tile)
        .SetUnitId(unit.GetObjectId());
    }
  }

  RemoveBuildingFromTile(tile) {
    let targetTile = this.tiles.find((element) => element === tile);
    this.buildings.splice(
      this.buildings.indexOf(this.GetBuildingById(targetTile.GetBuildingId())),
      1
    );
    targetTile.SetBuildingId("null");
  }

  RemoveUnitFromTile(tile) {
    let targetTile = this.tiles.find((element) => element === tile);
    this.units.splice(
      this.units.indexOf(this.GetUnitById(targetTile.GetUnitId())),
      1
    );
    targetTile.SetUnitId("null");
  }

  RemoveObject(gameObject) {
    let objectId = gameObject.GetObjectId();
    let building = this.GetBuildingById(objectId);
    let unit = this.GetUnitById(objectId);
    if (building !== undefined) {
      this.RemoveBuildingFromTile(
        this.GetTileByLocation(building.GetLocation())
      );
    }
    if (unit !== undefined) {
      this.RemoveUnitFromTile(this.GetTileByLocation(unit.GetLocation()));
    }
  }

  GetNeighbourTile(homeTile, direction) {
    let homeLocation = homeTile.GetLocation();
    let neighbourLocation;
    switch (direction) {
      case "North":
        neighbourLocation = [homeLocation[0], homeLocation[1] - 1];
        break;
      case "East":
        neighbourLocation = [homeLocation[0] + 1, homeLocation[1]];
        break;
      case "South":
        neighbourLocation = [homeLocation[0], homeLocation[1] + 1];
        break;
      case "West":
        neighbourLocation = [homeLocation[0] - 1, homeLocation[1]];
        break;
      default:
        neighbourLocation = "null";
        break;
    }
    let ret = this.tiles.find(
      (element) =>
        element.GetLocation()[0] === neighbourLocation[0] &&
        element.GetLocation()[1] === neighbourLocation[1]
    );
    if (ret === undefined) {
      return "null";
    }
    return ret;
  }

  GetDistanceBetweenTiles(tile1, tile2) {
    return (
      Math.abs(tile1.GetLocation()[0] - tile2.GetLocation()[0]) +
      Math.abs(tile1.GetLocation()[1] - tile2.GetLocation()[1])
    );
  }

  CanAttackTarget(attackerObject, targetObject) {
    let attackerTile = this.GetTileByLocation(attackerObject.GetLocation());
    let targetTile = this.GetTileByLocation(targetObject.GetLocation());
    if (
      attackerObject.GetCanAttack() &&
      attackerObject.GetOwner() !== targetObject.GetOwner() &&
      attackerObject.GetRange() >=
        this.GetDistanceBetweenTiles(attackerTile, targetTile)
    ) {
      return true;
    }
    return false;
  }

  FindPathBetween(startingTile, targetTile) {
    console.log(targetTile);
    let openList = [];
    let closedList = [];
    let startingNode = { tile: startingTile, f: 0, g: 0, h: 0, parent: "null" };
    let endNode;
    openList.push(startingNode);
    let counter = 0;
    while (openList.length !== 0 && counter < 5) {
      counter++;
      console.log(counter);
      // Find the node with the lowest f value
      let lowestFValue = Number.POSITIVE_INFINITY;
      let currentNode = {};
      openList.forEach((element) => {
        if (element.f < lowestFValue) {
          lowestFValue = element.f;
          currentNode = element;
        }
      });

      // Pop off the node
      let index = openList.indexOf(currentNode);
      openList.splice(index, 1);
      // Generate the 4 successor and set their parents to current
      let northNode = {
        tile: this.GetNeighbourTile(currentNode.tile, "North"),
        f: 0,
        g: 0,
        h: 0,
        parent: currentNode,
      };
      let eastNode = {
        tile: this.GetNeighbourTile(currentNode.tile, "East"),
        f: 0,
        g: 0,
        h: 0,
        parent: currentNode,
      };
      let southNode = {
        tile: this.GetNeighbourTile(currentNode.tile, "South"),
        f: 0,
        g: 0,
        h: 0,
        parent: currentNode,
      };
      let westNode = {
        tile: this.GetNeighbourTile(currentNode.tile, "West"),
        f: 0,
        g: 0,
        h: 0,
        parent: currentNode,
      };
      let successors = [northNode, eastNode, southNode, westNode];
      // discard the nodes with "null" tiles
      successors = successors.filter((element) => element.tile !== "null");
      // discard the non empty nodes
      successors = successors.filter((element) => element.tile.IsEmpty());

      // for each successor
      for (let i = 0; i < successors.length; i++) {
        let currentSuccessor = successors[i];
        if (currentSuccessor.tile === targetTile) {
          console.log("endnode");
          endNode = currentSuccessor;
          break;
        }
        currentSuccessor.g =
          currentSuccessor.parent.g +
          this.GetDistanceBetweenTiles(
            currentSuccessor.tile,
            currentSuccessor.parent.tile
          );
        currentSuccessor.h = this.GetDistanceBetweenTiles(
          currentSuccessor.tile,
          targetTile
        );
        currentSuccessor.f = currentSuccessor.g + currentSuccessor.h;

        console.log(openList);
        // if there is a node in the open list which has the same tile
        // and lower f score then skip this successor
        if (
          openList.find(
            (element) =>
              element.tile === currentSuccessor.tile &&
              element.f <= currentSuccessor.f
          ) !== undefined
        ) {
          continue;
        }

        // if there is a node in the closed list which has the same tile
        // and lower f score then skip this successor
        // otherwise add the successor to the openList
        if (
          closedList.find(
            (element) =>
              element.tile === currentSuccessor.tile &&
              element.f <= currentSuccessor.f
          ) !== undefined
        ) {
          continue;
        }
        openList.push(currentSuccessor);
      }
      closedList.push(currentNode);
    }

    console.log(closedList);
    console.log(endNode);

    // return path
    if (endNode === undefined) {
      return "null";
    }
    let path = [];
    let lastNode = endNode;
    let pathEnded = false;
    while (!pathEnded) {
      path.push(lastNode);
      if (lastNode.parent === "null") {
        pathEnded = true;
      }
      lastNode = lastNode.parent;
    }
    console.log(path);
    return path.reverse();
  }
}
