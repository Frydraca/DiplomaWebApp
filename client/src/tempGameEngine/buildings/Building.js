export default class Building {
  stats = {};
  constructor(building) {
    this.stats = building;
  }
  // Private functions //
  IsLocationValid(terrain) {
    return this.stats.possibleTerrain.includes(terrain);
  }

  // Public functions //
  GetOwner() {
    return this.stats.owner;
  }

  GetName() {
    return this.stats.name;
  }
  GetLocation() {
    return this.stats.location;
  }

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
    let ret = { success: false, coordinates: [0, 0] };

    //TODO make a better algprithm
    for (let i = 0; i < gameMap.length; i++) {
      if (
        gameMap[i].building.owner === "null" &&
        this.IsLocationValid(gameMap[i].terrain)
      ) {
        ret.success = true;
        ret.coordinates = gameMap[i].coordinates;
        return ret;
      }
    }

    return ret;
  }
}
