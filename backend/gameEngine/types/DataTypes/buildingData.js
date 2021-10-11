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
import ObjectData from "./objectData.js";
import Resources from "../resources.js";
var BuildingData = /** @class */ (function (_super) {
    __extends(BuildingData, _super);
    function BuildingData(jsonData) {
        var _this = _super.call(this, jsonData) || this;
        _this.possibleTerrain = [];
        jsonData.possibleTerrain.forEach(function (element) {
            _this.possibleTerrain.push(element);
        });
        _this.buildTime = JSON.parse(JSON.stringify(jsonData.buildTime));
        _this.usage = new Resources(jsonData.usage.energy, jsonData.usage.steel, jsonData.usage.roboSteel, jsonData.usage.crystal, jsonData.usage.energyCore, jsonData.usage.credits);
        _this.production = new Resources(jsonData.production.energy, jsonData.production.steel, jsonData.production.roboSteel, jsonData.production.crystal, jsonData.production.energyCore, jsonData.production.credits);
        return _this;
    }
    BuildingData.prototype.GetPossibleTerrain = function () {
        return this.possibleTerrain;
    };
    BuildingData.prototype.GetBuildTime = function () {
        return this.buildTime;
    };
    BuildingData.prototype.GetUsage = function () {
        return this.usage;
    };
    BuildingData.prototype.GetProduction = function () {
        return this.production;
    };
    return BuildingData;
}(ObjectData));
export default BuildingData;
