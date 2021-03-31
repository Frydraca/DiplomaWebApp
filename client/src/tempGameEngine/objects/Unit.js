import GameObject from "./GameObject";

export default class Unit extends GameObject {
  cost = {};
  speed = 0;

  constructor(unitData, ownerId) {
    super(unitData, ownerId);
    this.cost = unitData.cost;
    this.speed = unitData.speed;
  }

  GetSpeed() {
    return this.speed;
  }

  // Public functions //
  CanCreate(resources) {
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

  FindLocationToCreate(gameMap) {
    let ret = { success: false, tile: "null" };

    //TODO make a better algorithm
    for (let i = 0; i < gameMap.length; i++) {
      if (gameMap[i].IsEmpty()) {
        ret.success = true;
        ret.tile = gameMap[i];
        return ret;
      }
    }
    return ret;
  }
}
