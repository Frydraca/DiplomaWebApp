import GameObject from "./GameObject";

export default class Unit extends GameObject {
  cost = {};
  hitPoints = 0;
  armor = 0;
  constructor(unitData) {
    super(unitData);
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
}
