import { Terrain } from "../enums/terrain.js";
import Tile from "../objects/Tile.js";
import LocationType from "./locationType.js";
var GameMap = /** @class */ (function () {
    function GameMap(gameMapData) {
        var _this = this;
        this.name = JSON.parse(JSON.stringify(gameMapData.name));
        this.width = JSON.parse(JSON.stringify(gameMapData.width));
        this.height = JSON.parse(JSON.stringify(gameMapData.height));
        this.tiles = new Array();
        this.startingLocations = new Array();
        this.startingWorkerLocations = new Array();
        gameMapData.tiles.forEach(function (element) {
            var newTerrain;
            switch (element.terrain) {
                case "plains":
                    newTerrain = Terrain.Plains;
                    break;
                case "steel ore":
                    newTerrain = Terrain.SteelOre;
                    break;
                case "crystal field":
                    newTerrain = Terrain.CrystalField;
                    break;
                default:
                    newTerrain = Terrain.Plains;
                    break;
            }
            _this.tiles.push(new Tile(new LocationType(element.location[0], element.location[1]), newTerrain, null, null));
        });
        gameMapData.startingLocations.forEach(function (element) {
            _this.startingLocations.push(new LocationType(element[0], element[1]));
        });
        gameMapData.startingWorkerLocations.forEach(function (element) {
            _this.startingWorkerLocations.push(new LocationType(element[0], element[1]));
        });
    }
    GameMap.prototype.GetTiles = function () {
        return this.tiles;
    };
    GameMap.prototype.GetStartingLocations = function () {
        return this.startingLocations;
    };
    return GameMap;
}());
export default GameMap;
