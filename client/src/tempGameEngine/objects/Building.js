import GameObject from "./GameObject";

export default class Building extends GameObject {
  possibleTerrain = [];
  cost = {};
  usage = {};
  production = {};
  hitPoints = 0;
  armor = 0;
  constructor(buildingData) {
    super(buildingData);
    this.possibleTerrain = buildingData.possibleTerrain;
    this.cost = buildingData.cost;
    this.usage = buildingData.usage;
    this.production = buildingData.production;
    this.hitPoints = buildingData.hitPoints;
    this.armor = buildingData.armor;
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
      if (
        gameMap[i].GetBuildingId() === "null" &&
        this.IsLocationValid(gameMap[i].terrain)
      ) {
        ret.success = true;
        ret.tile = gameMap[i];
        return ret;
      }
    }

    return ret;
  }
}
