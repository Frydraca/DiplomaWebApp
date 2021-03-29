export default class Player {
  playerId = "";
  resources = {};

  constructor(playerData) {
    this.playerId = playerData.playerId;
    this.resources = playerData.resources;
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
}
