import { UpgradeType } from "../enums/upgradeType.js";
var UpgradeCostsData = /** @class */ (function () {
    function UpgradeCostsData(unitType, armorCost, attackCost, hitPointsCost, speedCost) {
        this.unitType = unitType;
        this.armorCost = armorCost;
        this.attackCost = attackCost;
        this.hitPointsCost = hitPointsCost;
        this.speedCost = speedCost;
    }
    UpgradeCostsData.prototype.GetUnitType = function () {
        return this.unitType;
    };
    UpgradeCostsData.prototype.GetUpgradeCost = function (upgradeType) {
        switch (upgradeType) {
            case UpgradeType.Armor:
                return this.armorCost;
            case UpgradeType.Attack:
                return this.attackCost;
            case UpgradeType.HitPoints:
                return this.hitPointsCost;
            case UpgradeType.Speed:
                return this.speedCost;
            default:
                return null;
        }
    };
    return UpgradeCostsData;
}());
export default UpgradeCostsData;
