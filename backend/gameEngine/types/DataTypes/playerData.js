import Resources from "../resources.js";
var PlayerData = /** @class */ (function () {
    function PlayerData(playerName, startingResources) {
        this.playerName = playerName;
        this.resources = new Resources(startingResources.GetEnergy(), startingResources.GetSteel(), startingResources.GetRoboSteel(), startingResources.GetCrystal(), startingResources.GetEnergyCore(), startingResources.GetCredits());
    }
    PlayerData.prototype.GetPlayerName = function () {
        return this.playerName;
    };
    PlayerData.prototype.GetResources = function () {
        return this.resources;
    };
    return PlayerData;
}());
export default PlayerData;
