const Player = require("./Player");
const Tile = require("./Tile");
const Building = require("./Building");

module.exports = class GameState {
  turnNumber = 1;
  isRunning = true;
  baseBuildingLocations = [];
  players = [];
  buildings = [];
  units = [];
  tiles = [];

  constructor(startingGameState) {
    this.turnNumber = 0;
    this.isRunning = true;
    this.baseBuildingLocations = [
      [-2, -1],
      [-2, 1],
      [-1, 2],
      [-1, -2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    // TODO refactor player setup
    let playerData1 = {
      playerId: "Player",
      resources: {
        steel: 30,
        roboSteel: 10,
        crystal: 0,
        energyCore: 3,
        energy: 10,
        credits: 0,
      },
    };
    let playerData2 = {
      playerId: "Server AI",
      resources: {
        steel: 30,
        roboSteel: 10,
        crystal: 0,
        energyCore: 3,
        energy: 10,
        credits: 0,
      },
    };
    this.players.push(new Player(playerData1));
    this.players.push(new Player(playerData2));
    startingGameState.tiles.forEach((element) => {
      let buildingId = "null";
      let unitId = "null";
      this.tiles.push(new Tile(element, buildingId, unitId));
    });
    for (let i = 0; i < this.players.length; i++) {
      this.AddCommandCenter(
        this.players[i].GetPlayerId(),
        startingGameState.startingLocations[i]
      );
    }
  }

  AddCommandCenter(owner, location) {
    //Todo refactor
    let buildingData = {
      name: "Command Center",
      possibleTerrain: ["plains"],
      location: [0, 0],
      cost: {
        steel: 0,
        crystal: 0,
        roboSteel: 0,
        energyCore: 0,
      },
      usage: {
        energy: 0,
        steel: 0,
        crystal: 0,
        roboSteel: 0,
        energyCore: 0,
      },
      production: {
        energy: 10,
        steel: 0,
        crystal: 0,
        roboSteel: 0,
        energyCore: 0,
      },
      hitPoints: 100,
      armor: 5,
      canAttack: false,
      range: 0,
      attackDamage: 0,
    };
    let newBuilding = new Building(buildingData, owner);
    newBuilding.SetLocation(location);
    this.AddBuildingToTile(newBuilding, this.GetTileByLocation(location));
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
    return this.tiles.find(
      (element) =>
        element.location[0] === location[0] &&
        element.location[1] === location[1]
    );
  }

  GetObjectByLocation(location) {
    let tile = this.GetTileByLocation(location);
    if (tile.HasUnit()) {
      return this.GetUnitById(tile.GetUnitId());
    }
    if (tile.HasBuilding()) {
      return this.GetBuildingById(tile.GetBuildingId());
    }
    return false;
  }

  ModifyResource(playerId, resource, amount) {
    let player = this.GetPlayerById(playerId);
    let resources = player.GetResources();
    if (resource in resources) {
      resources[resource] += amount;
      player.SetResources(resources);
      return true;
    } else {
      console.log("Error! " + resource + " is not a valid resource type!");
      return false;
    }
  }

  UpgradeStat(playerId, unitType, statType) {
    let player = this.GetPlayerById(playerId);
    let upgrades = player.GetUpgradeList();
    upgrades.SetUpgrade(unitType, statType);
    return true;
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
      return true;
    }
    if (unit !== undefined) {
      this.RemoveUnitFromTile(this.GetTileByLocation(unit.GetLocation()));
      return true;
    }
    return false;
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

  IsSameLocation(tile1, tile2) {
    return (
      tile1.GetLocation()[0] === tile2.GetLocation()[0] &&
      tile1.GetLocation()[1] === tile2.GetLocation()[1]
    );
  }

  GetDistanceBetweenTiles(tile1, tile2) {
    return (
      Math.abs(tile1.GetLocation()[0] - tile2.GetLocation()[0]) +
      Math.abs(tile1.GetLocation()[1] - tile2.GetLocation()[1])
    );
  }

  GetNextBuildingLocation(player, building) {
    let ret = { success: false, tile: "null" };
    let commandCenter = this.GetBuildings().filter(
      (element) =>
        element.GetOwner() === player.GetPlayerId() &&
        element.GetName() === "Command Center"
    );
    let commandTile = this.GetTileByLocation(commandCenter[0].GetLocation());
    for (let i = 0; i < this.baseBuildingLocations.length; i++) {
      let tile = this.GetTileByLocation([
        commandTile.GetLocation()[0] + this.baseBuildingLocations[i][0],
        commandTile.GetLocation()[1] + this.baseBuildingLocations[i][1],
      ]);
      if (
        tile !== undefined &&
        tile.IsEmpty() &&
        building.IsLocationValid(tile.GetTerrain())
      ) {
        ret.success = true;
        ret.tile = tile;
        return ret;
      }
    }

    return ret;
  }

  // TODO: Refactor
  GetClosestBuildingLocationToCommandCenter(player, building) {
    let ret = { success: false, tile: "null" };
    let commandCenter = this.GetBuildings().filter(
      (element) =>
        element.GetOwner() === player.GetPlayerId() &&
        element.GetName() === "Command Center"
    );
    let commandTile = this.GetTileByLocation(commandCenter[0].GetLocation());
    let closestTile;
    let closestDistance = Number.POSITIVE_INFINITY;
    this.tiles.forEach((element) => {
      if (building.IsLocationValid(element.GetTerrain()) && element.IsEmpty()) {
        if (
          this.GetDistanceBetweenTiles(element, commandTile) < closestDistance
        ) {
          closestDistance = this.GetDistanceBetweenTiles(element, commandTile);
          closestTile = element;
          ret.success = true;
          ret.tile = closestTile;
        }
      }
    });
    return ret;
  }

  // TODO refactor
  GetClosestEmptyLocationToCommandCenter(player) {
    let ret = { success: false, tile: "null" };
    let commandCenter = this.GetBuildings().filter(
      (element) =>
        element.GetOwner() === player.GetPlayerId() &&
        element.GetName() === "Command Center"
    );
    let commandTile = this.GetTileByLocation(commandCenter[0].GetLocation());
    let closestTile;
    let closestDistance = Number.POSITIVE_INFINITY;
    this.tiles.forEach((element) => {
      if (element.IsEmpty()) {
        if (
          this.GetDistanceBetweenTiles(element, commandTile) < closestDistance
        ) {
          closestDistance = this.GetDistanceBetweenTiles(element, commandTile);
          closestTile = element;
          ret.success = true;
          ret.tile = closestTile;
        }
      }
    });
    return ret;
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
    let openList = [];
    let closedList = [];
    let startingNode = { tile: startingTile, f: 0, g: 0, h: 0, parent: "null" };
    let endNode;
    openList.push(startingNode);
    while (openList.length !== 0) {
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
      successors = successors.filter(
        (element) => element.tile.IsEmpty() || element.tile === targetTile
      );

      // for each successor
      for (let i = 0; i < successors.length; i++) {
        let currentSuccessor = successors[i];
        if (this.IsSameLocation(currentSuccessor.tile, targetTile)) {
          endNode = currentSuccessor;
          openList = [];
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
    return path.reverse();
  }
};
