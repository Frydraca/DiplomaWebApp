import { BattleGroupStatus } from "../enums/battleGroupStatus.js";
import { TacticType } from "../enums/tacticType.js";
import { UnitType } from "../enums/unitType.js";
import ArtilleryBotData from "../data/units/artilleryBot.js";
import AttackBotData from "../data/units/attackBot.js";
import RaiderBotData from "../data/units/raiderBot.js";
import TankBotData from "../data/units/tankBot.js";
import { FocusTarget } from "../enums/FocusTarget.js";
import LocationType from "../types/locationType.js";
var BattleGroup = /** @class */ (function () {
    function BattleGroup(owner, groupId, expectedUnits, task, tactics) {
        this.currentUnits = new Array();
        this.targetCenterLocation = new LocationType(0, 0);
        this.id = groupId;
        this.owner = owner;
        this.status = BattleGroupStatus.Wait;
        this.expectedUnits = expectedUnits;
        this.groupTask = task;
        var retreat = (tactics.find(function (element) { return element.GetTacticType() === TacticType.Retreat; }));
        var focusFire = (tactics.find(function (element) { return element.GetTacticType() === TacticType.FocusFire; }));
        if (retreat !== undefined) {
            this.groupRetreatAllowed = retreat.GetGroupRetreatAllowed();
            this.groupRetreatTreshold = retreat.GetGroupRetreatValue();
            this.individualRetreatAllowed = retreat.GetIndividualRetreatAllowed();
            this.individualRetreatTreshold = retreat.GetIndividualRetreatPercentage();
        }
        else {
            this.groupRetreatAllowed = false;
            this.groupRetreatTreshold = 0;
            this.individualRetreatAllowed = false;
            this.individualRetreatTreshold = 0;
        }
        if (focusFire !== undefined) {
            this.focusFireEnabled = focusFire.GetFocusFireEnabled();
            this.focusFireTarget = focusFire.GetFocusFireTarget();
            this.focusOnlyUnits = focusFire.GetFocusOnlyUnits();
        }
        else {
            this.focusFireEnabled = false;
            this.focusFireTarget = FocusTarget.Closest;
            this.focusOnlyUnits = false;
        }
    }
    BattleGroup.prototype.GetId = function () {
        return this.id;
    };
    BattleGroup.prototype.GetStatus = function () {
        return this.status;
    };
    BattleGroup.prototype.GetTask = function () {
        return this.groupTask;
    };
    BattleGroup.prototype.GetFocusTarget = function () {
        return this.focusFireTarget;
    };
    BattleGroup.prototype.IsIndividualRetreatAllowed = function () {
        return this.individualRetreatAllowed;
    };
    BattleGroup.prototype.GetIndividualRetreatTreshold = function () {
        return this.individualRetreatTreshold;
    };
    BattleGroup.prototype.HasAllUnits = function () {
        for (var i = 0; i < this.expectedUnits.length; i++) {
            if (!this.expectedUnits[i].IsInGroup())
                return false;
        }
        return true;
    };
    BattleGroup.prototype.GetMissingUnits = function () {
        var missingUnits = new Array();
        for (var i = 0; i < this.expectedUnits.length; i++) {
            if (!this.expectedUnits[i].IsInGroup()) {
                missingUnits.push(this.expectedUnits[i].GetUnitType());
            }
        }
        return missingUnits;
    };
    BattleGroup.prototype.GetSlowestUnitSpeed = function () {
        var slowestSpeed = Number.POSITIVE_INFINITY;
        this.currentUnits.forEach(function (unit) {
            if (unit.GetSpeed() < slowestSpeed) {
                slowestSpeed = unit.GetSpeed();
            }
        });
        return slowestSpeed;
    };
    BattleGroup.prototype.GetCenterLocationOfGroup = function () {
        var x = 0;
        var y = 0;
        this.currentUnits.forEach(function (unit) {
            x += unit.GetLocation().GetX();
            y += unit.GetLocation().GetY();
        });
        return new LocationType(Math.floor(x / this.currentUnits.length), Math.floor(y / this.currentUnits.length));
    };
    BattleGroup.prototype.GetTargetCenterLocation = function () {
        return this.targetCenterLocation;
    };
    BattleGroup.prototype.SetTargetCenterLocation = function (target) {
        this.targetCenterLocation = target;
    };
    BattleGroup.prototype.NeedUnitType = function (unitType) {
        for (var i = 0; i < this.expectedUnits.length; i++) {
            if (!this.expectedUnits[i].IsInGroup() &&
                this.expectedUnits[i].GetUnitType() === unitType)
                return true;
        }
        return false;
    };
    BattleGroup.prototype.AddUnit = function (unit) {
        var expectedUnit = this.expectedUnits.find(function (element) {
            return !element.IsInGroup() && element.GetUnitType() === unit.GetUnitType();
        });
        if (expectedUnit === undefined) {
            console.log("Error! Trying to add a unit to battlegroup which is not needed.");
            return;
        }
        this.currentUnits.push(unit);
        expectedUnit.SetInGroup(true);
        expectedUnit.SetUnitId(unit.GetObjectId());
        if (this.HasAllUnits() && this.status === BattleGroupStatus.Wait) {
            this.status = BattleGroupStatus.Active;
        }
    };
    BattleGroup.prototype.CheckUnits = function () {
        var _this = this;
        this.currentUnits.forEach(function (unit) {
            if (unit.GetHitPoints() < 1) {
                _this.currentUnits.splice(_this.currentUnits.indexOf(unit), 1);
                var expectedUnit = _this.expectedUnits.find(function (element) { return element.GetUnitId() === unit.GetObjectId(); });
                expectedUnit.SetUnitId(null);
                expectedUnit.SetInGroup(false);
            }
        });
        if (this.currentUnits.length === 0) {
            this.status = BattleGroupStatus.Wait;
        }
        if (this.currentUnits.length === this.expectedUnits.length &&
            this.status === BattleGroupStatus.Wait) {
            this.status = BattleGroupStatus.Active;
        }
    };
    BattleGroup.prototype.CheckRetreat = function () {
        if (this.groupRetreatAllowed) {
            var currentHPPool_1 = 0;
            var currentMaxHPPool_1 = 0;
            this.currentUnits.forEach(function (unit) {
                currentHPPool_1 += unit.GetHitPoints();
            });
            this.expectedUnits.forEach(function (unit) {
                switch (unit.GetUnitType()) {
                    case UnitType.ArtilleryBot:
                        currentMaxHPPool_1 += ArtilleryBotData.hitPoints;
                        break;
                    case UnitType.AttackBot:
                        currentMaxHPPool_1 += AttackBotData.hitPoints;
                        break;
                    case UnitType.RaiderBot:
                        currentMaxHPPool_1 += RaiderBotData.hitPoints;
                        break;
                    case UnitType.TankBot:
                        currentMaxHPPool_1 += TankBotData.hitPoints;
                        break;
                    default:
                        break;
                }
            });
            if ((currentHPPool_1 / currentMaxHPPool_1) * 100 <= this.groupRetreatTreshold &&
                this.status !== BattleGroupStatus.Wait) {
                this.status = BattleGroupStatus.Retreat;
            }
            else if (this.status === BattleGroupStatus.Retreat) {
                this.status = BattleGroupStatus.Wait;
            }
        }
    };
    return BattleGroup;
}());
export default BattleGroup;
