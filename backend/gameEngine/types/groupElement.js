import { ObjectName } from "../enums/objectName.js";
import { UnitType } from "../enums/unitType.js";
var GroupElement = /** @class */ (function () {
    function GroupElement(objectName, objectCount) {
        this.objectName = objectName;
        this.objectCount = objectCount;
    }
    GroupElement.prototype.GetObjectName = function () {
        return this.objectName;
    };
    GroupElement.prototype.GetUnitType = function () {
        switch (this.objectName) {
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
    GroupElement.prototype.GetObjectCount = function () {
        return this.objectCount;
    };
    return GroupElement;
}());
export default GroupElement;
