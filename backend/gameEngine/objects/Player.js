import UpgradeList from "./UpgradeList.js";
var Player = /** @class */ (function () {
    function Player(playerData) {
        this.playerName = playerData.GetPlayerName();
        this.resources = playerData.GetResources();
        this.upgradeList = new UpgradeList();
        this.battleGroups = new Array();
    }
    Player.prototype.GetPlayerName = function () {
        return this.playerName;
    };
    Player.prototype.GetResources = function () {
        return this.resources;
    };
    Player.prototype.SetResources = function (resources) {
        this.resources.Init(resources);
    };
    Player.prototype.GetUpgradeList = function () {
        return this.upgradeList;
    };
    Player.prototype.SetUpgradeList = function (upgradeList) {
        this.upgradeList = upgradeList;
    };
    Player.prototype.GetBattleGroups = function () {
        return this.battleGroups;
    };
    Player.prototype.AddBattleGroup = function (newBattleGroup) {
        this.battleGroups.push(newBattleGroup);
    };
    return Player;
}());
export default Player;
