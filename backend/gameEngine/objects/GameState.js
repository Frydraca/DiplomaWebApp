import { DirectionType } from "../enums/directionType.js";
import { ObjectName } from "../enums/objectName.js";
import BuildingData from "../types/DataTypes/buildingData.js";
import LocationType from "../types/locationType.js";
import PathNode from "../types/pathNode.js";
import PlayerData from "../types/DataTypes/playerData.js";
import Resources from "../types/resources.js";
import Building from "./Building.js";
import Player from "./Player.js";
import CommandCenterData from "../data/buildings/commandCenter.js";
var GameState = /** @class */ (function () {
    function GameState(startingGameState) {
        var _this = this;
        this.savedStartingGameState = startingGameState;
        this.turnNumber = 0;
        this.isRunning = true;
        this.baseBuildingLocations = [
            new LocationType(-2, -1),
            new LocationType(-2, 1),
            new LocationType(-1, 2),
            new LocationType(-1, -2),
            new LocationType(1, -2),
            new LocationType(1, 2),
            new LocationType(2, -1),
            new LocationType(2, 1),
        ];
        this.players = new Array();
        this.tiles = new Array();
        this.buildings = new Array();
        this.units = new Array();
        // TODO refactor player setup
        var startingResources = new Resources(10, 30, 10, 0, 3, 0);
        var playerData1 = new PlayerData("Player", startingResources);
        var playerData2 = new PlayerData("Server AI", startingResources);
        this.players.push(new Player(playerData1));
        this.players.push(new Player(playerData2));
        startingGameState.GetTiles().forEach(function (element) {
            _this.tiles.push(element);
        });
        for (var i = 0; i < this.players.length; i++) {
            this.AddCommandCenter(this.players[i].GetPlayerName(), startingGameState.GetStartingLocations()[i]);
        }
    }
    GameState.prototype.GetClone = function () {
        var ret = new GameState(this.savedStartingGameState);
        var retBuildings = ret.GetBuildings();
        retBuildings[0].SetObjectId(this.buildings[0].GetObjectId());
        retBuildings[1].SetObjectId(this.buildings[1].GetObjectId());
        return ret;
    };
    GameState.prototype.AddCommandCenter = function (owner, location) {
        var buildingData = new BuildingData(CommandCenterData);
        var newBuilding = new Building(buildingData, owner);
        newBuilding.Complete();
        newBuilding.SetLocation(location);
        this.AddBuildingToTile(newBuilding, this.GetTileByLocation(location));
        this.AddBuilding(newBuilding);
    };
    GameState.prototype.GetTurnNumber = function () {
        return this.turnNumber;
    };
    GameState.prototype.IncreaseTurnNumber = function (value) {
        this.turnNumber += value;
    };
    GameState.prototype.IsRunning = function () {
        return this.isRunning;
    };
    GameState.prototype.SetIsRunning = function (state) {
        this.isRunning = state;
    };
    GameState.prototype.GetPlayers = function () {
        return this.players;
    };
    GameState.prototype.GetPlayerByName = function (playerName) {
        return this.players.find(function (element) { return element.GetPlayerName() === playerName; });
    };
    GameState.prototype.GetBuildings = function () {
        return this.buildings;
    };
    GameState.prototype.GetBuildingById = function (buildingId) {
        return this.buildings.find(function (element) { return element.GetObjectId() === buildingId; });
    };
    GameState.prototype.GetUnits = function () {
        return this.units;
    };
    GameState.prototype.GetUnitById = function (unitId) {
        return this.units.find(function (element) { return element.GetObjectId() === unitId; });
    };
    GameState.prototype.GetTiles = function () {
        return this.tiles;
    };
    GameState.prototype.GetTileByLocation = function (location) {
        return this.tiles.find(function (element) {
            return element.GetLocation().SameLocation(location);
        });
    };
    GameState.prototype.GetObjectByLocation = function (location) {
        var tile = this.GetTileByLocation(location);
        if (tile.HasUnit()) {
            return this.GetUnitById(tile.GetUnitId());
        }
        if (tile.HasBuilding()) {
            return this.GetBuildingById(tile.GetBuildingId());
        }
        return null;
    };
    GameState.prototype.ModifyResource = function (playerName, resourceType, amount) {
        var player = this.GetPlayerByName(playerName);
        var resources = player.GetResources();
        resources.ModifyResource(resourceType, amount);
        player.SetResources(resources); // TODO is setresources neccesery? reference question
    };
    GameState.prototype.UpgradeStat = function (playerName, unitType, upgradeType) {
        var player = this.GetPlayerByName(playerName);
        var upgrades = player.GetUpgradeList();
        upgrades.SetUpgrade(unitType, upgradeType);
    };
    GameState.prototype.AddBuildingToTile = function (building, tile) {
        if (this.tiles.includes(tile) && tile.IsEmpty()) {
            this.tiles
                .find(function (element) { return element === tile; })
                .SetBuildingId(building.GetObjectId());
        }
    };
    GameState.prototype.AddUnitToTile = function (unit, tile) {
        if (this.tiles.includes(tile) && tile.IsEmpty()) {
            this.tiles
                .find(function (element) { return element === tile; })
                .SetUnitId(unit.GetObjectId());
        }
    };
    GameState.prototype.RemoveBuildingFromTile = function (tile) {
        var targetTile = this.tiles.find(function (element) { return element === tile; });
        targetTile.SetBuildingId(null);
    };
    GameState.prototype.AddBuilding = function (building) {
        this.buildings.push(building);
    };
    GameState.prototype.RemoveBuilding = function (building) {
        this.buildings.splice(this.buildings.indexOf(building), 1);
    };
    GameState.prototype.RemoveUnitFromTile = function (tile) {
        var targetTile = this.tiles.find(function (element) { return element === tile; });
        targetTile.SetUnitId(null);
    };
    GameState.prototype.AddUnit = function (unit) {
        this.units.push(unit);
    };
    GameState.prototype.RemoveUnit = function (unit) {
        this.units.splice(this.units.indexOf(unit), 1);
    };
    GameState.prototype.ChangeUnitLocation = function (unit, location) {
        unit.SetLocation(location);
    };
    GameState.prototype.RemoveObject = function (gameObject) {
        var objectId = gameObject.GetObjectId();
        // TODO Do a fork based on the type of GameObject
        var building = this.GetBuildingById(objectId);
        var unit = this.GetUnitById(objectId);
        if (building !== undefined) {
            this.RemoveBuildingFromTile(this.GetTileByLocation(building.GetLocation()));
            this.RemoveBuilding(building);
        }
        if (unit !== undefined) {
            this.RemoveUnit(unit);
            this.RemoveUnitFromTile(this.GetTileByLocation(unit.GetLocation()));
        }
    };
    GameState.prototype.GetNeighbourTile = function (homeTile, direction) {
        var homeLocation = homeTile.GetLocation();
        var neighbourLocation;
        switch (direction) {
            case DirectionType.North:
                neighbourLocation = new LocationType(homeLocation.GetX(), homeLocation.GetY() - 1);
                break;
            case DirectionType.East:
                neighbourLocation = new LocationType(homeLocation.GetX() + 1, homeLocation.GetY());
                break;
            case DirectionType.South:
                neighbourLocation = new LocationType(homeLocation.GetX(), homeLocation.GetY() + 1);
                break;
            case DirectionType.West:
                neighbourLocation = new LocationType(homeLocation.GetX() - 1, homeLocation.GetY());
                break;
            default:
                console.log("Error! Invalid direction type: " + direction);
                break;
        }
        var ret = this.tiles.find(function (element) {
            return element.GetLocation().SameLocation(neighbourLocation);
        });
        if (ret === undefined) {
            return null;
        }
        return ret;
    };
    // TODO is this function needed?
    GameState.prototype.IsSameLocation = function (tile1, tile2) {
        return tile1.GetLocation().SameLocation(tile2.GetLocation());
    };
    GameState.prototype.GetDistanceBetweenTiles = function (tile1, tile2) {
        return tile1.GetLocation().DistanceFrom(tile2.GetLocation());
    };
    GameState.prototype.GetNextBuildingLocation = function (player, building) {
        var commandCenter = this.GetBuildings().filter(function (element) {
            return element.GetOwner() === player.GetPlayerName() &&
                element.GetName() === ObjectName.CommandCenter;
        });
        var commandLocation = commandCenter[0].GetLocation();
        for (var i = 0; i < this.baseBuildingLocations.length; i++) {
            var tile = this.GetTileByLocation(new LocationType(commandLocation.GetX() + this.baseBuildingLocations[i].GetX(), commandLocation.GetY() + this.baseBuildingLocations[i].GetY()));
            if (tile !== undefined &&
                tile.IsEmpty() &&
                building.IsLocationValid(tile.GetTerrain())) {
                return tile.GetLocation();
            }
        }
        return null;
    };
    // TODO: Refactor
    GameState.prototype.GetClosestBuildingLocationToCommandCenter = function (player, building) {
        var _this = this;
        var ret;
        var commandCenter = this.GetBuildings().filter(function (element) {
            return element.GetOwner() === player.GetPlayerName() &&
                element.GetName() === "Command Center";
        });
        var commandTile = this.GetTileByLocation(commandCenter[0].GetLocation());
        var closestTile;
        var closestDistance = Number.POSITIVE_INFINITY;
        this.tiles.forEach(function (element) {
            if (building.IsLocationValid(element.GetTerrain()) && element.IsEmpty()) {
                if (_this.GetDistanceBetweenTiles(element, commandTile) < closestDistance) {
                    closestDistance = _this.GetDistanceBetweenTiles(element, commandTile);
                    closestTile = element;
                    ret = closestTile.GetLocation();
                }
            }
        });
        return ret;
    };
    GameState.prototype.GetClosestEmptyLocationToLocation = function (location) {
        var _this = this;
        var ret;
        var centerLocation = this.GetTileByLocation(location);
        var closestTile;
        var closestDistance = Number.POSITIVE_INFINITY;
        this.tiles.forEach(function (element) {
            if (element.IsEmpty()) {
                if (_this.GetDistanceBetweenTiles(element, centerLocation) <
                    closestDistance) {
                    closestDistance = _this.GetDistanceBetweenTiles(element, centerLocation);
                    closestTile = element;
                    ret = closestTile.GetLocation();
                }
            }
        });
        return ret;
    };
    GameState.prototype.CanAttackTarget = function (attackerObject, targetObject) {
        var attackerTile = this.GetTileByLocation(attackerObject.GetLocation());
        var targetTile = this.GetTileByLocation(targetObject.GetLocation());
        if (attackerObject.GetCanAttack() &&
            attackerObject.GetOwner() !== targetObject.GetOwner() &&
            attackerObject.GetRange() >=
                this.GetDistanceBetweenTiles(attackerTile, targetTile)) {
            return true;
        }
        return false;
    };
    GameState.prototype.FindPathBetween = function (startingTile, targetTile, playerName) {
        var _this = this;
        var openList = new Array();
        var closedList = new Array();
        var startingNode = new PathNode(startingTile, null, 0, 0, 0);
        var endNode;
        openList.push(startingNode);
        var _loop_1 = function () {
            // Find the node with the lowest f value
            var lowestFValue = Number.POSITIVE_INFINITY;
            var currentNode;
            openList.forEach(function (element) {
                if (element.GetF() < lowestFValue) {
                    lowestFValue = element.GetF();
                    currentNode = element;
                }
            });
            // Pop off the node
            var index = openList.indexOf(currentNode);
            openList.splice(index, 1);
            // Generate the 4 successor and set their parents to current
            var northNode = new PathNode(this_1.GetNeighbourTile(currentNode.GetTile(), DirectionType.North), currentNode, 0, 0, 0);
            var eastNode = new PathNode(this_1.GetNeighbourTile(currentNode.GetTile(), DirectionType.East), currentNode, 0, 0, 0);
            var southNode = new PathNode(this_1.GetNeighbourTile(currentNode.GetTile(), DirectionType.South), currentNode, 0, 0, 0);
            var westNode = new PathNode(this_1.GetNeighbourTile(currentNode.GetTile(), DirectionType.West), currentNode, 0, 0, 0);
            var successors = [northNode, eastNode, southNode, westNode];
            // discard the nodes with "null" tiles
            successors = successors.filter(function (element) { return element.GetTile() !== null; });
            // discard the non empty nodes
            successors = successors.filter(function (element) {
                return element.GetTile().IsEmpty() ||
                    element.GetTile() === targetTile ||
                    (element.GetTile().HasUnit() &&
                        _this.GetUnitById(element.GetTile().GetUnitId()).GetOwner() ===
                            playerName);
            });
            var _loop_2 = function (i) {
                var currentSuccessor = successors[i];
                if (this_1.IsSameLocation(currentSuccessor.GetTile(), targetTile)) {
                    endNode = currentSuccessor;
                    openList = [];
                    return "break";
                }
                currentSuccessor.SetG(currentSuccessor.GetParent().GetG() +
                    this_1.GetDistanceBetweenTiles(currentSuccessor.GetTile(), currentSuccessor.GetParent().GetTile()));
                currentSuccessor.SetH(this_1.GetDistanceBetweenTiles(currentSuccessor.GetTile(), targetTile));
                currentSuccessor.SetF(currentSuccessor.GetG() + currentSuccessor.GetH());
                // if there is a node in the open list which has the same tile
                // and lower f score then skip this successor
                if (openList.find(function (element) {
                    return element.GetTile() === currentSuccessor.GetTile() &&
                        element.GetF() <= currentSuccessor.GetF();
                }) !== undefined) {
                    return "continue";
                }
                // if there is a node in the closed list which has the same tile
                // and lower f score then skip this successor
                // otherwise add the successor to the openList
                if (closedList.find(function (element) {
                    return element.GetTile() === currentSuccessor.GetTile() &&
                        element.GetF() <= currentSuccessor.GetF();
                }) !== undefined) {
                    return "continue";
                }
                openList.push(currentSuccessor);
            };
            // for each successor
            for (var i = 0; i < successors.length; i++) {
                var state_1 = _loop_2(i);
                if (state_1 === "break")
                    break;
            }
            closedList.push(currentNode);
        };
        var this_1 = this;
        while (openList.length !== 0) {
            _loop_1();
        }
        // return path
        if (endNode === undefined) {
            return null;
        }
        var path = new Array();
        var lastNode = endNode;
        var pathEnded = false;
        while (!pathEnded) {
            path.push(lastNode);
            if (lastNode.GetParent() === null) {
                pathEnded = true;
            }
            lastNode = lastNode.GetParent();
        }
        return path.reverse();
    };
    return GameState;
}());
export default GameState;
