import GameObject from "./GameObject";

export default class Unit extends GameObject {
  constructor(unitData) {
    super(unitData);
  }

  // Public functions //
  CanCreate(resources) {
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
}
