import { ResourceType } from "../enums/resourceType.js";
var Resources = /** @class */ (function () {
    function Resources(energy, steel, roboSteel, crystal, energyCore, credits) {
        this.energy = energy;
        this.steel = steel;
        this.roboSteel = roboSteel;
        this.crystal = crystal;
        this.energyCore = energyCore;
        this.credits = credits;
    }
    Resources.prototype.Init = function (baseResources) {
        this.energy = baseResources.GetEnergy();
        this.steel = baseResources.GetSteel();
        this.roboSteel = baseResources.GetRoboSteel();
        this.crystal = baseResources.GetCrystal();
        this.energyCore = baseResources.GetEnergyCore();
        this.credits = baseResources.GetCredits();
    };
    Resources.prototype.HasMoreOrEqualThan = function (resourcesToCompare) {
        if (this.energy >= resourcesToCompare.GetEnergy() &&
            this.steel >= resourcesToCompare.GetSteel() &&
            this.roboSteel >= resourcesToCompare.GetRoboSteel() &&
            this.crystal >= resourcesToCompare.GetCrystal() &&
            this.energyCore >= resourcesToCompare.GetEnergyCore() &&
            this.credits >= resourcesToCompare.GetCredits())
            return true;
        else
            return false;
    };
    Resources.prototype.Increase = function (resourceToIncreaseWith) {
        this.energy += resourceToIncreaseWith.GetEnergy();
        this.steel += resourceToIncreaseWith.GetSteel();
        this.roboSteel += resourceToIncreaseWith.GetRoboSteel();
        this.crystal += resourceToIncreaseWith.GetCrystal();
        this.energyCore += resourceToIncreaseWith.GetEnergyCore();
        this.credits += resourceToIncreaseWith.GetCredits();
    };
    Resources.prototype.Decrease = function (resourceToDecreaseWith) {
        this.energy -= resourceToDecreaseWith.GetEnergy();
        this.steel -= resourceToDecreaseWith.GetSteel();
        this.roboSteel -= resourceToDecreaseWith.GetRoboSteel();
        this.crystal -= resourceToDecreaseWith.GetCrystal();
        this.energyCore -= resourceToDecreaseWith.GetEnergyCore();
        this.credits -= resourceToDecreaseWith.GetCredits();
    };
    Resources.prototype.ModifyResource = function (resourceType, amount) {
        switch (resourceType) {
            case ResourceType.Credits:
                this.credits += amount;
                break;
            case ResourceType.Crystal:
                this.crystal += amount;
                break;
            case ResourceType.Energy:
                this.energy += amount;
                break;
            case ResourceType.EnergyCore:
                this.energyCore += amount;
                break;
            case ResourceType.Steel:
                this.steel += amount;
                break;
            case ResourceType.RoboSteel:
                this.roboSteel += amount;
                break;
            default:
                break;
        }
    };
    Resources.prototype.GetResource = function (resourceType) {
        switch (resourceType) {
            case ResourceType.Credits:
                return this.credits;
            case ResourceType.Crystal:
                return this.crystal;
            case ResourceType.Energy:
                return this.energy;
            case ResourceType.EnergyCore:
                return this.energyCore;
            case ResourceType.Steel:
                return this.steel;
            case ResourceType.RoboSteel:
                return this.roboSteel;
            default:
                return 0;
        }
    };
    Resources.prototype.GetEnergy = function () {
        return this.energy;
    };
    Resources.prototype.GetSteel = function () {
        return this.steel;
    };
    Resources.prototype.GetRoboSteel = function () {
        return this.roboSteel;
    };
    Resources.prototype.GetCrystal = function () {
        return this.crystal;
    };
    Resources.prototype.GetEnergyCore = function () {
        return this.energyCore;
    };
    Resources.prototype.GetCredits = function () {
        return this.credits;
    };
    Resources.prototype.IncreaseEnergy = function (value) {
        this.energy += value;
    };
    Resources.prototype.IncreaseSteel = function (value) {
        this.steel += value;
    };
    Resources.prototype.IncreaseRoboSteel = function (value) {
        this.roboSteel += value;
    };
    Resources.prototype.IncreaseCrystal = function (value) {
        this.crystal += value;
    };
    Resources.prototype.IncreaseEnergyCore = function (value) {
        this.energyCore += value;
    };
    Resources.prototype.IncreaseCredits = function (value) {
        this.credits += value;
    };
    Resources.prototype.DecreaseEnergy = function (value) {
        this.energy -= value;
    };
    Resources.prototype.DecreaseSteel = function (value) {
        this.steel -= value;
    };
    Resources.prototype.DecreaseRoboSteel = function (value) {
        this.roboSteel -= value;
    };
    Resources.prototype.DecreaseCrystal = function (value) {
        this.crystal -= value;
    };
    Resources.prototype.DecreaseEnergyCore = function (value) {
        this.energyCore -= value;
    };
    Resources.prototype.DecreaseCredits = function (value) {
        this.credits -= value;
    };
    return Resources;
}());
export default Resources;
