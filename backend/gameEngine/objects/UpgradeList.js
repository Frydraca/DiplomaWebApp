import { UnitType } from "../enums/unitType.js";
import UpgradeStatus from "../types/upgradeStatus.js";
var UpgradeList = /** @class */ (function () {
    function UpgradeList() {
        this.artilleryBotUpgrades = new UpgradeStatus();
        this.attackBotUpgrades = new UpgradeStatus();
        this.raiderBotUpgrades = new UpgradeStatus();
        this.tankBotUpgrades = new UpgradeStatus();
    }
    UpgradeList.prototype.GetUpgradesForType = function (unitType) {
        switch (unitType) {
            case UnitType.ArtilleryBot:
                return this.GetArtilleryBotUpgrades();
            case UnitType.AttackBot:
                return this.GetAttackBotUpgrades();
            case UnitType.RaiderBot:
                return this.GetRaiderBotUpgrades();
            case UnitType.TankBot:
                return this.GetTankBotUpgrades();
            default:
                console.log("Error! Unrecognized upgrade type was requested. Type: " + unitType);
                return;
        }
    };
    UpgradeList.prototype.SetUpgrade = function (unitType, upgradeType) {
        switch (unitType) {
            case UnitType.ArtilleryBot:
                this.artilleryBotUpgrades.SetUpgrade(upgradeType);
                break;
            case UnitType.AttackBot:
                this.attackBotUpgrades.SetUpgrade(upgradeType);
                break;
            case UnitType.RaiderBot:
                this.raiderBotUpgrades.SetUpgrade(upgradeType);
                break;
            case UnitType.TankBot:
                this.tankBotUpgrades.SetUpgrade(upgradeType);
                break;
            default:
                console.log("Error! Unrecognized unit type was requested. Type: " + unitType);
                return;
        }
    };
    UpgradeList.prototype.GetArtilleryBotUpgrades = function () {
        return this.artilleryBotUpgrades;
    };
    UpgradeList.prototype.SetArtilleryBotUpgrades = function (newUpgradeStatus) {
        this.artilleryBotUpgrades = newUpgradeStatus; //TODO rethink - reference will work well?
    };
    UpgradeList.prototype.GetAttackBotUpgrades = function () {
        return this.attackBotUpgrades;
    };
    UpgradeList.prototype.SetAttackBotUpgrades = function (newUpgradeStatus) {
        this.attackBotUpgrades = newUpgradeStatus;
    };
    UpgradeList.prototype.GetRaiderBotUpgrades = function () {
        return this.raiderBotUpgrades;
    };
    UpgradeList.prototype.SetRaiderBotUpgrades = function (newUpgradeStatus) {
        this.raiderBotUpgrades = newUpgradeStatus;
    };
    UpgradeList.prototype.GetTankBotUpgrades = function () {
        return this.tankBotUpgrades;
    };
    UpgradeList.prototype.SetTankBotUpgrades = function (newUpgradeStatus) {
        this.tankBotUpgrades = newUpgradeStatus;
    };
    return UpgradeList;
}());
export default UpgradeList;
