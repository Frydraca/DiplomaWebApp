module.exports = class Player {
  playerId = "";
  resources = {};

  constructor(playerData) {
    this.playerId = JSON.parse(JSON.stringify(playerData.playerId));
    this.resources = JSON.parse(JSON.stringify(playerData.resources));
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
};
