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
import { BuildingStatus } from "../enums/buildingStatus.js";
import GameObject from "./GameObject.js";
var Building = /** @class */ (function (_super) {
    __extends(Building, _super);
    function Building(buildingData, owner) {
        var _this = _super.call(this, buildingData, owner) || this;
        _this.status = BuildingStatus.Foundation;
        _this.buildingProgress = 0;
        _this.buildTime = buildingData.GetBuildTime();
        _this.possibleTerrain = buildingData.GetPossibleTerrain();
        _this.usage = buildingData.GetUsage();
        _this.production = buildingData.GetProduction();
        return _this;
    }
    Building.prototype.IsLocationValid = function (terrain) {
        return this.possibleTerrain.includes(terrain);
    };
    Building.prototype.GetBuildingStatus = function () {
        return this.status;
    };
    Building.prototype.IncreaseBuildProgress = function (value) {
        this.buildingProgress += value;
    };
    Building.prototype.Complete = function () {
        this.status = BuildingStatus.Complete;
    };
    Building.prototype.IsComplete = function () {
        if (this.buildingProgress >= this.buildTime)
            return true;
        return false;
    };
    Building.prototype.IsBuildingComplete = function () {
        if (this.status === BuildingStatus.Foundation)
            return false;
        else
            return true;
    };
    Building.prototype.CanBuild = function (resources) {
        if (resources.HasMoreOrEqualThan(this.cost)) {
            return true;
        }
        return false;
    };
    Building.prototype.TakeCost = function (resources) {
        resources.Decrease(this.cost);
        return resources;
    };
    Building.prototype.UpdateResources = function (resources) {
        if (resources.HasMoreOrEqualThan(this.usage)) {
            resources.Decrease(this.usage);
            resources.Increase(this.production);
        }
        return resources;
    };
    return Building;
}(GameObject));
export default Building;
