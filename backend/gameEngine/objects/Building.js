const GameObject = require("./GameObject");

module.exports = class Building extends GameObject {
  possibleTerrain = [];
  cost = {};
  usage = {};
  production = {};
  constructor(buildingData, ownerId) {
    super(buildingData, ownerId);
    this.type = "building";
    this.possibleTerrain = JSON.parse(
      JSON.stringify(buildingData.possibleTerrain)
    );
    this.cost = JSON.parse(JSON.stringify(buildingData.cost));
    this.usage = JSON.parse(JSON.stringify(buildingData.usage));
    this.production = JSON.parse(JSON.stringify(buildingData.production));
  }

  // Private functions //
  IsLocationValid(terrain) {
    return this.possibleTerrain.includes(terrain);
  }

  // Public functions //
  CanBuild(resources) {
    if (
      resources.steel >= this.cost.steel &&
      resources.crystal >= this.cost.crystal &&
      resources.roboSteel >= this.cost.roboSteel &&
      resources.energyCore >= this.cost.energyCore
    ) {
      return true;
    }
    return false;
  }
  TakeCost(resources) {
    resources.steel -= this.cost.steel;
    resources.crystal -= this.cost.crystal;
    resources.roboSteel -= this.cost.roboSteel;
    resources.energyCore -= this.cost.energyCore;
    return resources;
  }
  UpdateResources(resources) {
    if (
      resources.energy >= this.usage.energy &&
      resources.steel >= this.usage.steel &&
      resources.crystal >= this.usage.crystal &&
      resources.roboSteel >= this.usage.roboSteel &&
      resources.energyCore >= this.usage.energyCore
    ) {
      resources.energy -= this.usage.energy;
      resources.steel -= this.usage.steel;
      resources.crystal -= this.usage.crystal;
      resources.roboSteel -= this.usage.roboSteel;
      resources.energyCore -= this.usage.energyCore;

      resources.energy += this.production.energy;
      resources.steel += this.production.steel;
      resources.crystal += this.production.crystal;
      resources.roboSteel += this.production.roboSteel;
      resources.energyCore += this.production.energyCore;
    }
    return resources;
  }

  FindLocationToBuild(gameMap) {
    let ret = { success: false, tile: "null" };

    //TODO make a better algorithm
    for (let i = 0; i < gameMap.length; i++) {
      if (gameMap[i].IsEmpty() && this.IsLocationValid(gameMap[i].terrain)) {
        ret.success = true;
        ret.tile = gameMap[i];
        return ret;
      }
    }
    return ret;
  }
};
