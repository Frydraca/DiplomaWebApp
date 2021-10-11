import { UnitType } from "../enums/unitType.js";
import Resources from "../types/resources.js";
import UpgradeCostsData from "./upgradeCosts.js";
var UpgradeCostCollectionData = /** @class */ (function () {
    function UpgradeCostCollectionData() {
        // Energy, Steel RoboSteel, Crystal, EnergyCore, Credits
        var artilleryBotArmor = new Resources(0, 0, 10, 0, 0, 100);
        var artilleryBotAttack = new Resources(0, 0, 0, 20, 0, 100);
        var artilleryBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
        var artilleryBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
        var attackBotArmor = new Resources(0, 0, 10, 0, 0, 100);
        var attackBotAttack = new Resources(0, 0, 0, 20, 0, 100);
        var attackBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
        var attackBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
        var raiderBotArmor = new Resources(0, 0, 10, 0, 0, 100);
        var raiderBotAttack = new Resources(0, 0, 0, 20, 0, 100);
        var raiderBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
        var raiderBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
        var tankBotArmor = new Resources(0, 0, 10, 0, 0, 100);
        var tankBotAttack = new Resources(0, 0, 0, 20, 0, 100);
        var tankBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
        var tankBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
        this.artilleryBot = new UpgradeCostsData(UnitType.ArtilleryBot, artilleryBotArmor, artilleryBotAttack, artilleryBotHitPoints, artilleryBotSpeed);
        this.attackBot = new UpgradeCostsData(UnitType.AttackBot, attackBotArmor, attackBotAttack, attackBotHitPoints, attackBotSpeed);
        this.raiderBot = new UpgradeCostsData(UnitType.RaiderBot, raiderBotArmor, raiderBotAttack, raiderBotHitPoints, raiderBotSpeed);
        this.tankBot = new UpgradeCostsData(UnitType.TankBot, tankBotArmor, tankBotAttack, tankBotHitPoints, tankBotSpeed);
    }
    UpgradeCostCollectionData.prototype.GetUpgradeCostsOfUnitType = function (unitType) {
        switch (unitType) {
            case UnitType.ArtilleryBot:
                return this.artilleryBot;
            case UnitType.AttackBot:
                return this.attackBot;
            case UnitType.RaiderBot:
                return this.raiderBot;
            case UnitType.TankBot:
                return this.tankBot;
            default:
                return null;
        }
    };
    return UpgradeCostCollectionData;
}());
export default UpgradeCostCollectionData;
