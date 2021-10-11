import { ResourceType } from "../enums/resourceType.js";

export default class PricesData {
  private energy: number;
  private steel: number;
  private crystal: number;
  private roboSteel: number;
  private energyCore: number;

  constructor() {
    this.energy = 1;
    this.steel = 2;
    this.crystal = 3;
    this.roboSteel = 10;
    this.energyCore = 25;
  }

  public GetResourcePrice(resourceType: ResourceType): number {
    switch (resourceType) {
      case ResourceType.Credits:
        return 1;
      case ResourceType.Crystal:
        return this.crystal;
      case ResourceType.Energy:
        return this.energy;
      case ResourceType.EnergyCore:
        return this.energyCore;
      case ResourceType.Steel:
        return this.steel;
      case ResourceType.RoboSteel:
        return this.roboSteel;
      default:
        return 0;
    }
  }
}
