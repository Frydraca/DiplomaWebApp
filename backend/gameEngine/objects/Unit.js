var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { UnitStatus } from "../enums/unitStatus.js";
import GameObject from "./GameObject.js";
import { ObjectName } from "../enums/objectName.js";
import { UnitType } from "../enums/unitType.js";
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit(unitData, owner) {
        var _this = _super.call(this, unitData, owner) || this;
        _this.status = UnitStatus.Idle;
        _this.groupId = null;
        _this.hasAction = false;
        _this.speed = unitData.GetSpeed();
        return _this;
    }
    Unit.prototype.GetUnitType = function () {
        switch (this.name) {
            case ObjectName.ArtilleryBot:
                return UnitType.ArtilleryBot;
            case ObjectName.AttackBot:
                return UnitType.AttackBot;
            case ObjectName.RaiderBot:
                return UnitType.RaiderBot;
            case ObjectName.TankBot:
                return UnitType.TankBot;
            default:
                console.log("Error! Not compatible unit type and object name!");
        }
        return UnitType.AttackBot;
    };
    Unit.prototype.GetSpeed = function () {
        return this.speed;
    };
    Unit.prototype.HasAction = function () {
        return this.hasAction;
    };
    Unit.prototype.SetHasAction = function (state) {
        this.hasAction = state;
    };
    Unit.prototype.GetPercentageHP = function () {
        return (this.hitPoints / this.maxHitPoints) * 100;
    };
    Unit.prototype.GetStatus = function () {
        return this.status;
    };
    Unit.prototype.SetStatus = function (newStatus) {
        this.status = newStatus;
    };
    Unit.prototype.Repair = function (repairAmount) {
        this.SetHitPoints(this.GetHitPoints() + repairAmount);
        if (this.GetHitPoints() > this.GetMaxHitPoints()) {
            this.SetHitPoints(this.GetMaxHitPoints());
            this.status = UnitStatus.Idle;
        }
    };
    Unit.prototype.AddGroupName = function (groupId) {
        this.groupId = groupId;
    };
    Unit.prototype.GetBattleGroup = function () {
        return this.groupId;
    };
    Unit.prototype.InGroup = function () {
        if (this.groupId === null)
            return false;
        else
            return true;
    };
    Unit.prototype.CanCreate = function (resources) {
        if (resources.HasMoreOrEqualThan(this.cost)) {
            return true;
        }
        return false;
    };
    Unit.prototype.TakeCost = function (resources) {
        resources.Decrease(this.cost);
        return resources;
    };
    Unit.prototype.FindLocationToCreate = function (gameMap) {
        var ret = { success: false, tile: "null" };
        //TODO make a better algorithm
        for (var i = 0; i < gameMap.length; i++) {
            if (gameMap[i].IsEmpty()) {
                ret.success = true;
                ret.tile = gameMap[i];
                return ret;
            }
        }
        return ret;
    };
    Unit.prototype.UpgradeSpeed = function (value) {
        this.speed += value;
    };
    return Unit;
}(GameObject));
export default Unit;
