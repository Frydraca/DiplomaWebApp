import LocationType from "../locationType.js";
import Resources from "../resources.js";
var ObjectData = /** @class */ (function () {
    function ObjectData(jsonData) {
        this.objectName = jsonData.objectName;
        this.type = jsonData.type;
        this.location = new LocationType(jsonData.location[0], jsonData.location[1]);
        this.cost = new Resources(jsonData.cost.energy, jsonData.cost.steel, jsonData.cost.roboSteel, jsonData.cost.crystal, jsonData.cost.energyCore, jsonData.cost.credits);
        this.hitPoints = jsonData.hitPoints;
        this.armor = jsonData.armor;
        this.canAttack = jsonData.canAttack;
        this.range = jsonData.range;
        this.attackDamage = jsonData.attackDamage;
    }
    ObjectData.prototype.GetObjectName = function () {
        return this.objectName;
    };
    ObjectData.prototype.GetType = function () {
        return this.type;
    };
    ObjectData.prototype.GetLocation = function () {
        return this.location;
    };
    ObjectData.prototype.GetCost = function () {
        return this.cost;
    };
    ObjectData.prototype.GetHitPoints = function () {
        return this.hitPoints;
    };
    ObjectData.prototype.GetArmor = function () {
        return this.armor;
    };
    ObjectData.prototype.GetCanAttack = function () {
        return this.canAttack;
    };
    ObjectData.prototype.GetRange = function () {
        return this.range;
    };
    ObjectData.prototype.GetAttackDamage = function () {
        return this.attackDamage;
    };
    return ObjectData;
}());
export default ObjectData;
