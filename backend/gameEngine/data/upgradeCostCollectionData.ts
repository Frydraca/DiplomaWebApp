import { UnitType } from "../enums/unitType.js";
import Resources from "../types/resources.js";
import UpgradeCostsData from "./upgradeCosts.js";

export default class UpgradeCostCollectionData {
  private artilleryBot: UpgradeCostsData;
  private attackBot: UpgradeCostsData;
  private raiderBot: UpgradeCostsData;
  private tankBot: UpgradeCostsData;

  constructor() {
    // Energy, Steel RoboSteel, Crystal, EnergyCore, Credits
    let artilleryBotArmor = new Resources(0, 0, 10, 0, 0, 100);
    let artilleryBotAttack = new Resources(0, 0, 0, 20, 0, 100);
    let artilleryBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
    let artilleryBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
    let attackBotArmor = new Resources(0, 0, 10, 0, 0, 100);
    let attackBotAttack = new Resources(0, 0, 0, 20, 0, 100);
    let attackBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
    let attackBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
    let raiderBotArmor = new Resources(0, 0, 10, 0, 0, 100);
    let raiderBotAttack = new Resources(0, 0, 0, 20, 0, 100);
    let raiderBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
    let raiderBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
    let tankBotArmor = new Resources(0, 0, 10, 0, 0, 100);
    let tankBotAttack = new Resources(0, 0, 0, 20, 0, 100);
    let tankBotHitPoints = new Resources(50, 0, 0, 0, 0, 50);
    let tankBotSpeed = new Resources(100, 0, 0, 0, 5, 100);
    this.artilleryBot = new UpgradeCostsData(
      UnitType.ArtilleryBot,
      artilleryBotArmor,
      artilleryBotAttack,
      artilleryBotHitPoints,
      artilleryBotSpeed
    );
    this.attackBot = new UpgradeCostsData(
      UnitType.AttackBot,
      attackBotArmor,
      attackBotAttack,
      attackBotHitPoints,
      attackBotSpeed
    );
    this.raiderBot = new UpgradeCostsData(
      UnitType.RaiderBot,
      raiderBotArmor,
      raiderBotAttack,
      raiderBotHitPoints,
      raiderBotSpeed
    );
    this.tankBot = new UpgradeCostsData(
      UnitType.TankBot,
      tankBotArmor,
      tankBotAttack,
      tankBotHitPoints,
      tankBotSpeed
    );
  }

  public GetUpgradeCostsOfUnitType(unitType: UnitType): UpgradeCostsData {
    switch (unitType) {
      case UnitType.ArtilleryBot:
        return this.artilleryBot;
      case UnitType.AttackBot:
        return this.attackBot;
      case UnitType.RaiderBot:
        return this.raiderBot;
      case UnitType.TankBot:
        return this.tankBot;
      default:
        return null;
    }
  }
}
