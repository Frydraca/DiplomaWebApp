import GameObject from "./GameObject";
import Tile from "./Tile";

export default class Building extends GameObject {
  // Private functions //
  IsLocationValid(terrain) {
    return this.stats.possibleTerrain.includes(terrain);
  }

  // Public functions //
  CanBuild(resources) {
    if (
      resources.steel >= this.stats.cost.steel &&
      resources.crystal >= this.stats.cost.crystal &&
      resources.roboSteel >= this.stats.cost.roboSteel &&
      resources.energyCore >= this.stats.cost.energyCore
    ) {
      return true;
    }
    return false;
  }
  TakeCost(resources) {
    resources.steel -= this.stats.cost.steel;
    resources.crystal -= this.stats.cost.crystal;
    resources.roboSteel -= this.stats.cost.roboSteel;
    resources.energyCore -= this.stats.cost.energyCore;
    return resources;
  }
  UpdateResources(resources) {
    if (
      resources.energy >= this.stats.usage.energy &&
      resources.steel >= this.stats.usage.steel &&
      resources.crystal >= this.stats.usage.crystal &&
      resources.roboSteel >= this.stats.usage.roboSteel &&
      resources.energyCore >= this.stats.usage.energyCore
    ) {
      resources.energy -= this.stats.usage.energy;
      resources.steel -= this.stats.usage.steel;
      resources.crystal -= this.stats.usage.crystal;
      resources.roboSteel -= this.stats.usage.roboSteel;
      resources.energyCore -= this.stats.usage.energyCore;

      resources.energy += this.stats.production.energy;
      resources.steel += this.stats.production.steel;
      resources.crystal += this.stats.production.crystal;
      resources.roboSteel += this.stats.production.roboSteel;
      resources.energyCore += this.stats.production.energyCore;
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
