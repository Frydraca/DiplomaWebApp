import GameEngine from "./gameEngine.js";
import ModifyResourceCommand from "./commands/modifyResourceCommand.js";
import UpgradeCommand from "./commands/upgradeCommand.js";
import Building from "./objects/Building.js";
import Unit from "./objects/Unit.js";
import BattleGroup from "./objects/BattleGroup.js";
import { ResourceType } from "./enums/resourceType.js";
import { UnitType } from "./enums/unitType.js";
import { ObjectName } from "./enums/objectName.js";
import { ObjectType } from "./enums/objectType.js";
import { TacticType } from "./enums/tacticType.js";
import BuildingData from "./types/DataTypes/buildingData.js";
import UnitData from "./types/DataTypes/unitData.js";
import Group from "./types/group.js";
import GroupElement from "./types/groupElement.js";
import RetreatTactic from "./types/TacticTypes/retreatTactic.js";
import FocusFireTactic from "./types/TacticTypes/focusFireTactic.js";
import ExpectedUnit from "./types/expectedUnit.js";
import PricesData from "./data/prices.js";
import UpgradeCostCollectionData from "./data/upgradeCostCollectionData.js";
import SteelMineData from "./data/buildings/steelMine.js";
import SolarPowerPlantData from "./data/buildings/solarPowerPlant.js";
import CrystalMineData from "./data/buildings/crystalMine.js";
import FoundryData from "./data/buildings/foundry.js";
import CoreFactoryData from "./data/buildings/coreFactory.js";
import WorkshopData from "./data/buildings/workshop.js";
import ArtilleryBotData from "./data/units/artilleryBot.js";
import AttackBotData from "./data/units/attackBot.js";
import RaiderBotData from "./data/units/raiderBot.js";
import TankBotData from "./data/units/tankBot.js";
import GameMap from "./types/gameMap.js";
var AiEngine = /** @class */ (function () {
    function AiEngine(playerIds, playerScript, serverScript, startingGameState) {
        this.pScript = "";
        this.sScript = "";
        this.players = playerIds;
        this.game = new GameEngine(new GameMap(startingGameState));
        playerScript = playerScript.replace(/playerId/g, "this.players[0]");
        this.pScript = playerScript.replace(/enemyId/g, "this.players[1]");
        serverScript = serverScript.replace(/playerId/g, "this.players[1]");
        this.sScript = serverScript.replace(/enemyId/g, "this.players[0]");
        this.prices = new PricesData();
        this.upgradeCostData = new UpgradeCostCollectionData();
    }
    AiEngine.prototype.GetGame = function () {
        return this.game;
    };
    // Main run function
    AiEngine.prototype.RunGame = function () {
        while (this.game.IsRunning()) {
            //script Player
            //console.log(this.pScript);
            eval(this.pScript);
            //script Server AI
            // console.log("serverScript");
            // console.log(this.sScript);
            if (this.game.IsRunning()) {
                eval(this.sScript);
            }
            this.game.CalculateNextCenterForBattleGroups();
            this.game.ActivateUnits();
            this.game.TurnEnd();
        }
    };
    /////////////////////////////////
    // Script interpeter functions //
    /////////////////////////////////
    AiEngine.prototype.Build = function (playerName, buildingType) {
        var buildingData;
        switch (buildingType) {
            case ObjectName.CommandCenter:
                console.log("Error: Cant build new command centers!"); //TODO error handling
                break;
            case ObjectName.SteelMine:
                buildingData = new BuildingData(SteelMineData);
                break;
            case ObjectName.SolarPowerPlant:
                buildingData = new BuildingData(SolarPowerPlantData);
                break;
            case ObjectName.CrystalMine:
                buildingData = new BuildingData(CrystalMineData);
                break;
            case ObjectName.Foundry:
                buildingData = new BuildingData(FoundryData);
                break;
            case ObjectName.CoreFactory:
                buildingData = new BuildingData(CoreFactoryData);
                break;
            case ObjectName.Workshop:
                buildingData = new BuildingData(WorkshopData);
                break;
            default:
                console.log("Error! Wrong type: " + buildingType);
                break;
        }
        var newBuilding = new Building(buildingData, playerName);
        this.game.Build(newBuilding);
    };
    AiEngine.prototype.BuildUpTo = function (playerName, buildingGroup) {
        var _this = this;
        if (buildingGroup.GetGroupType() !== ObjectType.Building) {
            console.log("Error: wrong type! Type: " + buildingGroup.GetGroupType());
            return;
        }
        buildingGroup.GetGroupElements().forEach(function (element) {
            var buildingType = element.GetObjectName();
            var numberOfNeededBuildings = element.GetObjectCount() -
                _this.game.GetBuildingsOfGivenType(playerName, buildingType).length;
            for (var i = 0; i < numberOfNeededBuildings; i++) {
                _this.Build(playerName, buildingType);
            }
        });
    };
    AiEngine.prototype.Create = function (playerName, unitType) {
        var player = this.game.GetGameState().GetPlayerByName(playerName);
        var upgradesForUnit = player.GetUpgradeList().GetUpgradesForType(unitType);
        var unitData;
        switch (unitType) {
            case UnitType.ArtilleryBot:
                unitData = new UnitData(ArtilleryBotData);
                break;
            case UnitType.AttackBot:
                unitData = new UnitData(AttackBotData);
                break;
            case UnitType.RaiderBot:
                unitData = new UnitData(RaiderBotData);
                break;
            case UnitType.TankBot:
                unitData = new UnitData(TankBotData);
                break;
            default:
                console.log("Error! Wrong type: " + unitType);
                break;
        }
        var newUnit = new Unit(unitData, playerName);
        // TODO maybe custom numbers and not only +1s
        if (upgradesForUnit.GetAttack()) {
            newUnit.UpgradeAttackDamage(2);
        }
        if (upgradesForUnit.GetArmor()) {
            newUnit.UpgradeArmor(2);
        }
        if (upgradesForUnit.GetHitPoints()) {
            newUnit.UpgradeHitPoints(10);
        }
        if (upgradesForUnit.GetSpeed()) {
            newUnit.UpgradeSpeed(1);
        }
        this.game.Create(newUnit);
    };
    AiEngine.prototype.CreateNTimes = function (playerName, unitType, amount) {
        for (var i = 0; i < amount; i++) {
            this.Create(playerName, unitType);
        }
    };
    AiEngine.prototype.Group = function (type) {
        var elements = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            elements[_i - 1] = arguments[_i];
        }
        return new Group(type, elements);
    };
    AiEngine.prototype.GroupElement = function (objectName, count) {
        return new GroupElement(objectName, count);
    };
    AiEngine.prototype.GetNumberOfOwn = function (playerName, objectName) {
        var object = this.MakeObjectFromType(objectName, playerName);
        return this.game.GetNumberOfGameObjectByPlayerName(object, playerName);
    };
    AiEngine.prototype.GetPercentageOfOwn = function (playerName, objectName) {
        var object = this.MakeObjectFromType(objectName, playerName);
        return this.game.GetPercentageOfUnitByPlayer(object, playerName);
    };
    AiEngine.prototype.Have = function (playerName, objectName, upgradeType) {
        if (upgradeType === undefined) {
            if (this.GetNumberOfOwn(playerName, objectName) > 0)
                return true;
            else
                return false;
        }
        var player = this.game.GetGameState().GetPlayerByName(playerName);
        return player
            .GetUpgradeList()
            .GetUpgradesForType(objectName)
            .GetUpgrade(upgradeType);
    };
    AiEngine.prototype.PlayerWasAttacked = function (playerName) {
        return this.game.CheckIfPlayerWasAttacked(playerName);
    };
    AiEngine.prototype.Trading = function (playerName) {
        var tradeRules = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tradeRules[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < tradeRules.length; i++) {
            tradeRules[i];
        }
    };
    AiEngine.prototype.Buy = function (playerName, resource, value) {
        var player = this.game.GetGameState().GetPlayerByName(playerName);
        var resources = player.GetResources();
        if (value > resources.GetResource(resource) &&
            resources.GetCredits() >= this.prices.GetResourcePrice(resource)) {
            var neededAmount = value - resources.GetResource(resource);
            var priceAmount = Math.floor(resources.GetResource(ResourceType.Credits) /
                this.prices.GetResourcePrice(resource));
            var amount = Math.min(neededAmount, priceAmount);
            var price = amount * this.prices.GetResourcePrice(resource) * -1;
            this.game.Execute(new ModifyResourceCommand(playerName, resource, amount));
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.Credits, price));
        }
    };
    AiEngine.prototype.Sell = function (playerName, resource, value) {
        var player = this.game.GetGameState().GetPlayerByName(playerName);
        var resources = player.GetResources();
        if (value < resources.GetResource(resource)) {
            var amount = value - resources.GetResource(resource);
            var price = amount * this.prices.GetResourcePrice(resource) * -1; // amount is negative
            this.game.Execute(new ModifyResourceCommand(playerName, resource, amount));
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.Credits, price));
        }
    };
    AiEngine.prototype.Research = function (playerName) {
        var upgradeOrders = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            upgradeOrders[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < upgradeOrders.length; i++) {
            upgradeOrders[i];
        }
    };
    AiEngine.prototype.UpgradeStats = function (playerName, unitType, upgradeType) {
        var player = this.game.GetGameState().GetPlayerByName(playerName);
        var resources = player.GetResources();
        var neededResources = this.upgradeCostData
            .GetUpgradeCostsOfUnitType(unitType)
            .GetUpgradeCost(upgradeType);
        if (player
            .GetUpgradeList()
            .GetUpgradesForType(unitType)
            .GetUpgrade(upgradeType)) {
            return;
        }
        if (!resources.HasMoreOrEqualThan(neededResources)) {
            return;
        }
        if (neededResources.GetCredits() !== 0) {
            var negativeValue = 0 - neededResources.GetCredits();
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.Credits, negativeValue));
        }
        if (neededResources.GetCrystal() !== 0) {
            var negativeValue = 0 - neededResources.GetCrystal();
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.Crystal, negativeValue));
        }
        if (neededResources.GetEnergy() !== 0) {
            var negativeValue = 0 - neededResources.GetEnergy();
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.Energy, negativeValue));
        }
        if (neededResources.GetEnergyCore() !== 0) {
            var negativeValue = 0 - neededResources.GetEnergyCore();
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.EnergyCore, negativeValue));
        }
        if (neededResources.GetRoboSteel() !== 0) {
            var negativeValue = 0 - neededResources.GetRoboSteel();
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.RoboSteel, negativeValue));
        }
        if (neededResources.GetSteel() !== 0) {
            var negativeValue = 0 - neededResources.GetSteel();
            this.game.Execute(new ModifyResourceCommand(playerName, ResourceType.Steel, negativeValue));
        }
        this.game.Execute(new UpgradeCommand(playerName, unitType, upgradeType));
    };
    AiEngine.prototype.CombatGroup = function (playerName, groupId, group, task) {
        var _this = this;
        var tactics = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            tactics[_i - 4] = arguments[_i];
        }
        var player = this.game.GetGameState().GetPlayerByName(playerName);
        var battleGroup = player
            .GetBattleGroups()
            .find(function (element) { return element.GetId() === groupId; });
        if (undefined === battleGroup) {
            var expectedUnits_1 = new Array();
            group.GetGroupElements().forEach(function (element) {
                for (var i = 0; i < element.GetObjectCount(); i++) {
                    expectedUnits_1.push(new ExpectedUnit(element.GetUnitType(), false, null));
                }
            });
            var newBattleGroup = new BattleGroup(playerName, groupId, expectedUnits_1, task, tactics);
            player.AddBattleGroup(newBattleGroup);
        }
        else if (!battleGroup.HasAllUnits()) {
            var missingUnits = battleGroup.GetMissingUnits();
            missingUnits.forEach(function (unitName) {
                _this.Create(playerName, unitName);
            });
        }
    };
    AiEngine.prototype.RetreatTactic = function (groupRetreatValue, individualRetreatAllowed, individualRetreatPercentage) {
        return new RetreatTactic(TacticType.Retreat, true, groupRetreatValue, individualRetreatAllowed, individualRetreatPercentage);
    };
    AiEngine.prototype.FocusFireTactic = function (focusFireTarget, focusOnlyUnits) {
        return new FocusFireTactic(TacticType.FocusFire, true, focusFireTarget, focusOnlyUnits);
    };
    AiEngine.prototype.Do = function (action) {
        return action;
    };
    // helper functions
    AiEngine.prototype.MakeObjectFromType = function (objectName, playerName) {
        var returnObject;
        switch (objectName) {
            case ObjectName.CommandCenter:
                console.log("Error: Cant build new command centers!"); //TODO error handling
                break;
            case ObjectName.SteelMine:
                returnObject = new Building(new BuildingData(SteelMineData), playerName);
                break;
            case ObjectName.SolarPowerPlant:
                returnObject = new Building(new BuildingData(SolarPowerPlantData), playerName);
                break;
            case ObjectName.CrystalMine:
                returnObject = new Building(new BuildingData(CrystalMineData), playerName);
                break;
            case ObjectName.Foundry:
                returnObject = new Building(new BuildingData(FoundryData), playerName);
                break;
            case ObjectName.CoreFactory:
                returnObject = new Building(new BuildingData(CoreFactoryData), playerName);
                break;
            case ObjectName.Workshop:
                returnObject = new Building(new BuildingData(WorkshopData), playerName);
                break;
            case ObjectName.ArtilleryBot:
                returnObject = new Unit(new UnitData(ArtilleryBotData), playerName);
                break;
            case ObjectName.AttackBot:
                returnObject = new Unit(new UnitData(AttackBotData), playerName);
                break;
            case ObjectName.RaiderBot:
                returnObject = new Unit(new UnitData(RaiderBotData), playerName);
                break;
            case ObjectName.TankBot:
                returnObject = new Unit(new UnitData(TankBotData), playerName);
                break;
            default:
                console.log("Error! Wrong type: " + objectName);
                break;
        }
        return returnObject;
    };
    return AiEngine;
}());
export default AiEngine;
