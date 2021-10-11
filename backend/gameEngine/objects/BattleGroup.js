import { BattleGroupStatus } from "../enums/battleGroupStatus.js";
import { TacticType } from "../enums/tacticType.js";
var BattleGroup = /** @class */ (function () {
    function BattleGroup(owner, groupId, expectedUnits, task, tactics) {
        this.currentUnits = new Array();
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
            this.invidualRetreatAllowed = retreat.GetIndividualRetreatAllowed();
            this.invidualRetreatTreshold = retreat.GetIndividualRetreatPercentage();
        }
        else {
            this.groupRetreatAllowed = false;
            this.groupRetreatTreshold = 0;
            this.invidualRetreatAllowed = false;
            this.invidualRetreatTreshold = 0;
        }
        if (focusFire !== undefined) {
            this.focusFireEnabled = focusFire.GetFocusFireEnabled();
            this.focusFireTarget = focusFire.GetFocusFireTarget();
            this.focusOnlyUnits = focusFire.GetFocusOnlyUnits();
        }
        else {
            this.focusFireEnabled = false;
            this.focusFireTarget = "";
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
    };
    return BattleGroup;
}());
export default BattleGroup;
