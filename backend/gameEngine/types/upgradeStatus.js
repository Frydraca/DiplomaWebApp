import { UpgradeType } from "../enums/upgradeType.js";
var UpgradeStatus = /** @class */ (function () {
    function UpgradeStatus() {
        this.armor = false;
        this.attack = false;
        this.hitPoints = false;
        this.speed = false;
    }
    UpgradeStatus.prototype.GetUpgrade = function (upgradeType) {
        switch (upgradeType) {
            case UpgradeType.Armor:
                return this.armor;
            case UpgradeType.Attack:
                return this.attack;
            case UpgradeType.HitPoints:
                return this.hitPoints;
            case UpgradeType.Speed:
                return this.speed;
            default:
                console.log("Error! Unrecognized upgrade type was requested. Type: " + upgradeType);
                return false;
        }
    };
    UpgradeStatus.prototype.SetUpgrade = function (upgradeType) {
        switch (upgradeType) {
            case UpgradeType.Armor:
                this.armor = true;
                break;
            case UpgradeType.Attack:
                this.attack = true;
                break;
            case UpgradeType.HitPoints:
                this.hitPoints = true;
                break;
            case UpgradeType.Speed:
                this.speed = true;
                break;
            default:
                console.log("Error! Unrecognized upgrade type was requested. Type: " + upgradeType);
                return;
        }
    };
    UpgradeStatus.prototype.GetArmor = function () {
        return this.armor;
    };
    UpgradeStatus.prototype.SetArmor = function (state) {
        this.armor = state;
    };
    UpgradeStatus.prototype.GetAttack = function () {
        return this.attack;
    };
    UpgradeStatus.prototype.SetAttack = function (state) {
        this.attack = state;
    };
    UpgradeStatus.prototype.GetHitPoints = function () {
        return this.hitPoints;
    };
    UpgradeStatus.prototype.SetHitPoints = function (state) {
        this.hitPoints = state;
    };
    UpgradeStatus.prototype.GetSpeed = function () {
        return this.speed;
    };
    UpgradeStatus.prototype.SetSpeed = function (state) {
        this.speed = state;
    };
    return UpgradeStatus;
}());
export default UpgradeStatus;
