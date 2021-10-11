var Tile = /** @class */ (function () {
    function Tile(location, terrain, buildingId, unitId) {
        this.location = location;
        this.terrain = terrain;
        this.buildingId = buildingId;
        this.unitId = unitId;
    }
    Tile.prototype.GetLocation = function () {
        return this.location;
    };
    Tile.prototype.GetTerrain = function () {
        return this.terrain;
    };
    Tile.prototype.GetBuildingId = function () {
        return this.buildingId;
    };
    Tile.prototype.SetBuildingId = function (buildingId) {
        this.buildingId = buildingId;
    };
    Tile.prototype.GetUnitId = function () {
        return this.unitId;
    };
    Tile.prototype.SetUnitId = function (unitId) {
        this.unitId = unitId;
    };
    Tile.prototype.IsEmpty = function () {
        if (this.buildingId === null && this.unitId === null) {
            return true;
        }
        return false;
    };
    Tile.prototype.HasUnit = function () {
        if (this.unitId === null) {
            return false;
        }
        return true;
    };
    Tile.prototype.HasBuilding = function () {
        if (this.buildingId === null) {
            return false;
        }
        return true;
    };
    return Tile;
}());
export default Tile;
