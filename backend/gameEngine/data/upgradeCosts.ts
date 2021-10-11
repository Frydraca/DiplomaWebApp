import { UnitType } from "../enums/unitType.js";
import { UpgradeType } from "../enums/upgradeType.js";
import Resources from "../types/resources.js";

export default class UpgradeCostsData {
  private unitType: UnitType;
  private armorCost: Resources;
  private attackCost: Resources;
  private hitPointsCost: Resources;
  private speedCost: Resources;

  constructor(
    unitType: UnitType,
    armorCost: Resources,
    attackCost: Resources,
    hitPointsCost: Resources,
    speedCost: Resources
  ) {
    this.unitType = unitType;
    this.armorCost = armorCost;
    this.attackCost = attackCost;
    this.hitPointsCost = hitPointsCost;
    this.speedCost = speedCost;
  }

  public GetUnitType(): UnitType {
    return this.unitType;
  }
  public GetUpgradeCost(upgradeType: UpgradeType): Resources {
    switch (upgradeType) {
      case UpgradeType.Armor:
        return this.armorCost;
      case UpgradeType.Attack:
        return this.attackCost;
      case UpgradeType.HitPoints:
        return this.hitPointsCost;
      case UpgradeType.Speed:
        return this.speedCost;
      default:
        return null;
    }
  }
}
