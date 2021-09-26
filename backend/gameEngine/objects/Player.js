const UpgradeList = require("./UpgradeList");

module.exports = class Player {
  playerId = "";
  resources = {};
  upgradeList = {};
  battleGroups = [];

  constructor(playerData) {
    this.playerId = JSON.parse(JSON.stringify(playerData.playerId));
    this.resources = JSON.parse(JSON.stringify(playerData.resources));
    this.upgradeList = new UpgradeList();
  }

  GetPlayerId() {
    return this.playerId;
  }

  GetResources() {
    return this.resources;
  }

  SetResources(resources) {
    this.resources = resources;
  }

  GetUpgradeList() {
    return this.upgradeList;
  }

  SetUpgradeList(upgradeList) {
    this.upgradeList = upgradeList;
  }

  GetBattleGroups() {
    return this.battleGroups;
  }

  AddBattleGroup(newBattleGroup) {
    this.battleGroups.push(newBattleGroup);
  }
};
