import GameState from "./objects/GameState.js";
import AddBuildingCommand from "./commands/addBuildingCommand.js";
import RemoveBuildingCommand from "./commands/removeBuildingCommand.js";
import AddUnitCommand from "./commands/addUnitCommand.js";
import RemoveUnitCommand from "./commands/removeUnitCommand.js";
import MoveUnitCommand from "./commands/moveUnitCommand.js";
import DamageObjectCommand from "./commands/damageObjectCommand.js";
import Building from "./objects/Building.js";
import { BattleGroupStatus } from "./enums/battleGroupStatus.js";
import { ObjectType } from "./enums/objectType.js";
import { ObjectName } from "./enums/objectName.js";
import CommandResult from "./types/commandResult.js";
import RubbleData from "./data/buildings/rubble.js";
import { CommandType } from "./enums/commandType.js";
import BuildingData from "./types/DataTypes/buildingData.js";
var GameEngine = /** @class */ (function () {
    function GameEngine(startingState) {
        this.gameState = new GameState(startingState);
        this.startingGameStateData = this.gameState.GetClone();
        this.commands = new Array();
        this.currentTurnCommands = new Array();
    }
    GameEngine.prototype.GetBuildingsOfGivenType = function (playerName, buildingType) {
        return this.gameState
            .GetBuildings()
            .filter(function (element) {
            return element.GetOwner() === playerName &&
                element.GetName() === buildingType;
        });
    };
    GameEngine.prototype.Execute = function (command) {
        if (command.Execute(this)) {
            this.currentTurnCommands.push(command.GetResult());
        }
        return command;
    };
    GameEngine.prototype.IsRunning = function () {
        return this.gameState.IsRunning();
    };
    GameEngine.prototype.TurnEnd = function () {
        this.gameState.GetUnits().forEach(function (unit) {
            unit.SetHasAction(true);
        });
        this.gameState.GetPlayers().forEach(function (player) {
            var battleGroups = player.GetBattleGroups();
            battleGroups.forEach(function (group) {
                group.CheckUnits();
            });
        });
        this.UpdateResources();
        this.AdvanceRubble();
        this.CheckForGameEnd();
        this.commands.push(this.currentTurnCommands);
        this.currentTurnCommands = [];
        this.gameState.IncreaseTurnNumber(1);
    };
    GameEngine.prototype.GetGameState = function () {
        return this.gameState;
    };
    GameEngine.prototype.GetStartingGameState = function () {
        return this.startingGameStateData;
    };
    GameEngine.prototype.GetCommands = function () {
        return this.commands;
    };
    ///////////////////////
    // Command functions //
    ///////////////////////
    GameEngine.prototype.AddBuilding = function (building, location) {
        this.gameState.AddBuildingToTile(building, this.gameState.GetTileByLocation(location));
        this.gameState.AddBuilding(building);
        return true;
    };
    GameEngine.prototype.RemoveBuilding = function (building) {
        this.gameState.RemoveBuildingFromTile(this.gameState.GetTileByLocation(building.GetLocation()));
        this.gameState.RemoveBuilding(building);
        return true;
    };
    GameEngine.prototype.AddUnit = function (unit, location) {
        this.gameState.AddUnitToTile(unit, this.gameState.GetTileByLocation(location));
        this.gameState.AddUnit(unit);
        return true;
    };
    GameEngine.prototype.RemoveUnit = function (unit) {
        this.gameState.RemoveUnitFromTile(this.gameState.GetTileByLocation(unit.GetLocation()));
        this.gameState.RemoveUnit(unit);
        return true;
    };
    GameEngine.prototype.MoveUnit = function (unit, location) {
        this.gameState.RemoveUnitFromTile(this.gameState.GetTileByLocation(unit.GetLocation()));
        this.gameState.AddUnitToTile(unit, this.gameState.GetTileByLocation(location));
        this.gameState.ChangeUnitLocation(unit, location);
        return true;
    };
    GameEngine.prototype.DamageObject = function (object, damage) {
        return true;
    };
    GameEngine.prototype.ModifyResource = function (playerName, resource, amount) {
        this.gameState.ModifyResource(playerName, resource, amount);
        return true;
    };
    GameEngine.prototype.UpgradeStat = function (playerName, unitType, upgradeType) {
        this.gameState.UpgradeStat(playerName, unitType, upgradeType);
        return true;
    };
    ////////////////////////////////////
    // Functions called from aiEngine //
    ////////////////////////////////////
    GameEngine.prototype.ActivateUnits = function () {
        var _loop_1 = function (i) {
            var unit = this_1.gameState.GetUnits()[i];
            //do something
            var playerName = unit.GetOwner();
            var player = this_1.gameState.GetPlayerByName(playerName);
            //check if in battlegroup
            //check status
            if (unit.InGroup()) {
                var battleGroup = player
                    .GetBattleGroups()
                    .find(function (group) { return group.GetId() === unit.GetBattleGroup(); });
                if (battleGroup === undefined) {
                    console.log("Error! Couldn't find battlegroup!");
                    return "continue";
                }
                switch (battleGroup.GetStatus()) {
                    case BattleGroupStatus.Wait:
                        if (this_1.AttackCheck(unit, playerName)) {
                            var enemy = this_1.GetClosestEnemy(unit);
                            if (unit.InRange(enemy)) {
                                this_1.Attack(unit, enemy);
                                unit.SetHasAction(false);
                            }
                        }
                        break;
                    case BattleGroupStatus.Active:
                        switch (battleGroup.GetTask()) {
                            case "Attack":
                                if (this_1.AttackCheck(unit, playerName)) {
                                    this_1.GeneralAttackMove(unit);
                                }
                                break;
                            case "Defend":
                                if (this_1.AttackCheck(unit, playerName)) {
                                    var enemy = this_1.GetClosestEnemy(unit);
                                    if (unit.InRange(enemy)) {
                                        this_1.Attack(unit, enemy);
                                        unit.SetHasAction(false);
                                    }
                                    this_1.GeneralDefendMove(unit, playerName);
                                }
                                break;
                            default:
                                console.log("Error! Unrecognized battle group task: " +
                                    battleGroup.GetTask());
                                break;
                        }
                        break;
                    case BattleGroupStatus.Retreat:
                        break;
                    default:
                        console.log("Error! unrecognized battle group status: " +
                            battleGroup.GetStatus());
                        break;
                }
            }
            else {
                if (this_1.AttackCheck(unit, playerName)) {
                    this_1.GeneralAttackMove(unit);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.gameState.GetUnits().length; i++) {
            _loop_1(i);
        }
    };
    GameEngine.prototype.GeneralAttackMove = function (unit) {
        var enemy = this.GetClosestEnemy(unit);
        if (unit.InRange(enemy)) {
            this.Attack(unit, enemy);
        }
        else {
            this.Move(unit, this.gameState.GetTileByLocation(enemy.GetLocation()));
        }
        unit.SetHasAction(false);
    };
    GameEngine.prototype.GeneralDefendMove = function (unit, playerName) {
        // get enemies in range of command center
        var enemiesTooClose = this.FindEnemiesInRangeOfCommandcenter(10, playerName);
        if (enemiesTooClose.length === 0)
            return;
        // find the closest one out of them
        var closestEnemy;
        var distance = Number.POSITIVE_INFINITY;
        enemiesTooClose.forEach(function (enemy) {
            if (playerName !== enemy.GetOwner() && enemy.GetOwner() !== "gaia") {
                var currentDistance = unit.GetDistanceFromObject(enemy);
                if (currentDistance < distance) {
                    closestEnemy = enemy;
                    distance = currentDistance;
                }
            }
        });
        if (unit.InRange(closestEnemy)) {
            this.Attack(unit, closestEnemy);
        }
        else {
            this.Move(unit, this.gameState.GetTileByLocation(closestEnemy.GetLocation()));
        }
        unit.SetHasAction(false);
    };
    GameEngine.prototype.AttackCheck = function (unit, playerName) {
        return (unit.HasAction() &&
            (this.DoesEnemyHasUnits(playerName) ||
                this.DoesEnemyHasBuildings(playerName)));
    };
    GameEngine.prototype.FindEnemiesInRangeOfCommandcenter = function (range, playerName) {
        var enemiesInRange = new Array();
        var commandCenter = this.gameState
            .GetBuildings()
            .filter(function (element) {
            return element.GetOwner() === playerName &&
                element.GetName() === ObjectName.CommandCenter;
        })[0];
        this.gameState.GetUnits().forEach(function (unit) {
            if (playerName !== unit.GetOwner()) {
                if (unit.GetDistanceFromObject(commandCenter) <= range) {
                    enemiesInRange.push(unit);
                }
            }
        });
        this.gameState.GetBuildings().forEach(function (building) {
            if (playerName !== building.GetOwner() &&
                building.GetOwner() !== "gaia") {
                if (building.GetDistanceFromObject(commandCenter) <= range) {
                    enemiesInRange.push(building);
                }
            }
        });
        return enemiesInRange;
    };
    GameEngine.prototype.Build = function (building) {
        var player = this.GetOwnerOfObject(building);
        var locationResponse;
        var buildingName = building.GetName();
        if (buildingName === ObjectName.CrystalMine ||
            buildingName === ObjectName.SteelMine) {
            locationResponse =
                this.gameState.GetClosestBuildingLocationToCommandCenter(player, building);
        }
        else {
            locationResponse = this.gameState.GetNextBuildingLocation(player, building);
        }
        if (building.CanBuild(player.GetResources()) && locationResponse !== null) {
            player.SetResources(building.TakeCost(player.GetResources()));
            building.SetLocation(locationResponse);
            this.Execute(new AddBuildingCommand(building, locationResponse));
        }
    };
    GameEngine.prototype.Create = function (unit) {
        var player = this.GetOwnerOfObject(unit);
        var locationResponse = this.gameState.GetClosestEmptyLocationToCommandCenter(player);
        if (unit.CanCreate(player.GetResources()) && locationResponse !== null) {
            player.SetResources(unit.TakeCost(player.GetResources()));
            unit.SetLocation(locationResponse);
            this.Execute(new AddUnitCommand(unit, locationResponse));
            var battleGroups = player.GetBattleGroups();
            for (var i = 0; i < battleGroups.length; i++) {
                if (battleGroups[i].NeedUnitType(unit.GetUnitType())) {
                    unit.AddGroupName(battleGroups[i].GetId());
                    battleGroups[i].AddUnit(unit);
                }
            }
        }
    };
    GameEngine.prototype.Move = function (unit, targetTile) {
        var currentTile = this.gameState.GetTileByLocation(unit.GetLocation());
        var path = this.gameState.FindPathBetween(currentTile, targetTile);
        if (path === null) {
            console.log("path fail");
            return;
        }
        var newTile;
        if (path.length <= unit.GetSpeed()) {
            newTile = path[path.length - 1].GetTile();
        }
        else {
            newTile = path[unit.GetSpeed()].GetTile();
        }
        this.Execute(new MoveUnitCommand(unit, currentTile.GetLocation(), newTile.GetLocation()));
    };
    GameEngine.prototype.Attack = function (attackerObject, targetObject) {
        if (this.gameState.CanAttackTarget(attackerObject, targetObject)) {
            var damageTaken = targetObject.TakeDamage(attackerObject.GetAttackDamage());
            this.Execute(new DamageObjectCommand(targetObject, damageTaken));
            if (targetObject.GetHitPoints() < 1) {
                if (targetObject.GetName() === ObjectName.CommandCenter) {
                    this.gameState.SetIsRunning(false);
                }
                //this.gameState.RemoveObject(targetObject);
                var location_1 = targetObject.GetLocation();
                if (targetObject.GetType() === ObjectType.Building) {
                    this.Execute(new RemoveBuildingCommand(targetObject, location_1));
                    var newBuilding = new Building(new BuildingData(RubbleData), "gaia");
                    newBuilding.SetLocation(location_1);
                    this.Execute(new AddBuildingCommand(newBuilding, location_1));
                }
                else if (targetObject.GetType() === ObjectType.Unit) {
                    this.Execute(new RemoveUnitCommand(targetObject, location_1));
                }
            }
        }
    };
    GameEngine.prototype.AdvanceRubble = function () {
        var _this = this;
        var rubbleToDelete = new Array();
        this.gameState.GetBuildings().forEach(function (building) {
            if (building.GetName() === ObjectName.Rubble) {
                building.IncreaseBuildProgress(1);
                if (building.IsComplete()) {
                    rubbleToDelete.push(building.GetObjectId());
                }
            }
        });
        rubbleToDelete.forEach(function (rubbleId) {
            var rubble = _this.gameState.GetBuildingById(rubbleId);
            _this.Execute(new RemoveBuildingCommand(rubble, rubble.GetLocation()));
        });
    };
    GameEngine.prototype.CheckForGameEnd = function () {
        if (this.gameState.GetTurnNumber() >= 50) {
            this.gameState.SetIsRunning(false);
        }
    };
    GameEngine.prototype.UpdateResources = function () {
        var _this = this;
        var oldPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
        this.gameState.GetBuildings().forEach(function (building) {
            if (building.GetOwner() !== "gaia") {
                var player = _this.gameState.GetPlayerByName(building.GetOwner());
                player.SetResources(building.UpdateResources(player.GetResources()));
            }
        });
        var newPlayers = JSON.parse(JSON.stringify(this.gameState.GetPlayers()));
        this.currentTurnCommands.push(new CommandResult({
            type: CommandType.UpdateResource,
            oldPlayers: oldPlayers,
            newPlayers: newPlayers
        }));
    };
    // TODO probably unnecessery
    GameEngine.prototype.GetOwnerOfObject = function (object) {
        return this.gameState
            .GetPlayers()
            .find(function (player) { return player.GetPlayerName() === object.GetOwner(); });
    };
    GameEngine.prototype.GetNumberOfGameObjectsByPlayerId = function (gameObject, playerName) {
        var number = 0;
        this.gameState.GetBuildings().forEach(function (building) {
            if (building.GetName() === gameObject.GetName() &&
                building.GetOwner() === playerName) {
                number++;
            }
        });
        this.gameState.GetUnits().forEach(function (unit) {
            if (unit.GetName() === gameObject.GetName() &&
                unit.GetOwner() === playerName) {
                number++;
            }
        });
        return number;
    };
    GameEngine.prototype.GetClosestEnemy = function (gameObject) {
        var playerName = gameObject.GetOwner();
        var closestEnemy;
        var distance = Number.POSITIVE_INFINITY;
        this.gameState.GetUnits().forEach(function (unit) {
            if (playerName !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
                var currentDistance = unit.GetDistanceFromObject(gameObject);
                if (currentDistance < distance) {
                    closestEnemy = unit;
                    distance = currentDistance;
                }
            }
        });
        this.gameState.GetBuildings().forEach(function (building) {
            if (playerName !== building.GetOwner() &&
                building.GetOwner() !== "gaia") {
                var currentDistance = building.GetDistanceFromObject(gameObject);
                if (currentDistance < distance) {
                    closestEnemy = building;
                    distance = currentDistance;
                }
            }
        });
        return closestEnemy;
    };
    GameEngine.prototype.GetNumberOfGameObjectByPlayerName = function (gameObject, playerName) {
        var count = 0;
        this.gameState.GetBuildings().forEach(function (building) {
            if (building.GetName() === gameObject.GetName() &&
                building.GetOwner() === playerName) {
                count++;
            }
        });
        this.gameState.GetUnits().forEach(function (unit) {
            if (unit.GetName() === gameObject.GetName() &&
                unit.GetOwner() === playerName) {
                count++;
            }
        });
        return count;
    };
    GameEngine.prototype.DoesEnemyHasUnits = function (playerName) {
        var enemyHasUnit = false;
        this.gameState.GetUnits().forEach(function (unit) {
            if (playerName !== unit.GetOwner() && unit.GetOwner() !== "gaia") {
                enemyHasUnit = true;
            }
        });
        return enemyHasUnit;
    };
    GameEngine.prototype.DoesEnemyHasBuildings = function (playerName) {
        var enemyHasBuilding = false;
        this.gameState.GetBuildings().forEach(function (building) {
            if (playerName !== building.GetOwner() &&
                building.GetOwner() !== "gaia") {
                enemyHasBuilding = true;
            }
        });
        return enemyHasBuilding;
    };
    return GameEngine;
}());
export default GameEngine;
