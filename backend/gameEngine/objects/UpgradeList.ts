import { UnitType } from "../enums/unitType.js";
import { UpgradeType } from "../enums/upgradeType.js";
import UpgradeStatus from "../types/upgradeStatus.js";

export default class UpgradeList {
  artilleryBotUpgrades: UpgradeStatus;
  attackBotUpgrades: UpgradeStatus;
  raiderBotUpgrades: UpgradeStatus;
  tankBotUpgrades: UpgradeStatus;

  constructor() {
    this.artilleryBotUpgrades = new UpgradeStatus();
    this.attackBotUpgrades = new UpgradeStatus();
    this.raiderBotUpgrades = new UpgradeStatus();
    this.tankBotUpgrades = new UpgradeStatus();
  }

  GetUpgradesForType(unitType: UnitType) {
    switch (unitType) {
      case UnitType.ArtilleryBot:
        return this.GetArtilleryBotUpgrades();
      case UnitType.AttackBot:
        return this.GetAttackBotUpgrades();
      case UnitType.RaiderBot:
        return this.GetRaiderBotUpgrades();
      case UnitType.TankBot:
        return this.GetTankBotUpgrades();
      default:
        console.log(
          "Error! Unrecognized upgrade type was requested. Type: " + unitType
        );
        return;
    }
  }

  SetUpgrade(unitType: UnitType, upgradeType: UpgradeType): void {
    switch (unitType) {
      case UnitType.ArtilleryBot:
        this.artilleryBotUpgrades.SetUpgrade(upgradeType);
        break;
      case UnitType.AttackBot:
        this.attackBotUpgrades.SetUpgrade(upgradeType);
        break;
      case UnitType.RaiderBot:
        this.raiderBotUpgrades.SetUpgrade(upgradeType);
        break;
      case UnitType.TankBot:
        this.tankBotUpgrades.SetUpgrade(upgradeType);
        break;
      default:
        console.log(
          "Error! Unrecognized unit type was requested. Type: " + unitType
        );
        return;
    }
  }

  GetArtilleryBotUpgrades(): UpgradeStatus {
    return this.artilleryBotUpgrades;
  }
  SetArtilleryBotUpgrades(newUpgradeStatus: UpgradeStatus): void {
    this.artilleryBotUpgrades = newUpgradeStatus; //TODO rethink - reference will work well?
  }
  GetAttackBotUpgrades(): UpgradeStatus {
    return this.attackBotUpgrades;
  }
  SetAttackBotUpgrades(newUpgradeStatus: UpgradeStatus): void {
    this.attackBotUpgrades = newUpgradeStatus;
  }
  GetRaiderBotUpgrades(): UpgradeStatus {
    return this.raiderBotUpgrades;
  }
  SetRaiderBotUpgrades(newUpgradeStatus: UpgradeStatus): void {
    this.raiderBotUpgrades = newUpgradeStatus;
  }
  GetTankBotUpgrades(): UpgradeStatus {
    return this.tankBotUpgrades;
  }
  SetTankBotUpgrades(newUpgradeStatus: UpgradeStatus): void {
    this.tankBotUpgrades = newUpgradeStatus;
  }
}
