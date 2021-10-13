import UpgradeList from "./UpgradeList.js";
var Player = /** @class */ (function () {
    function Player(playerData) {
        this.playerName = playerData.GetPlayerName();
        this.resources = playerData.GetResources();
        this.upgradeList = new UpgradeList();
        this.battleGroups = new Array();
        this.wasAttacked = false;
        this.wasAttackedLastTurn = false;
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
    Player.prototype.GetWasAttacked = function () {
        return this.wasAttacked;
    };
    Player.prototype.SetWasAttacked = function (state) {
        this.wasAttacked = state;
    };
    Player.prototype.GetWasAttackedLastTurn = function () {
        return this.wasAttackedLastTurn;
    };
    Player.prototype.SetWasAttackedLastTurn = function (state) {
        this.wasAttackedLastTurn = state;
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
