import { UpgradeType } from "../enums/upgradeType.js";

export default class UpgradeStatus {
  private armor: boolean;
  private attack: boolean;
  private hitPoints: boolean;
  private speed: boolean;

  constructor() {
    this.armor = false;
    this.attack = false;
    this.hitPoints = false;
    this.speed = false;
  }

  public GetUpgrade(upgradeType: UpgradeType): boolean {
    switch (upgradeType) {
      case UpgradeType.Armor:
        return this.armor;
      case UpgradeType.Attack:
        return this.attack;
      case UpgradeType.HitPoints:
        return this.hitPoints;
      case UpgradeType.Speed:
        return this.speed;
      default:
        console.log(
          "Error! Unrecognized upgrade type was requested. Type: " + upgradeType
        );
        return false;
    }
  }

  public SetUpgrade(upgradeType: UpgradeType): void {
    switch (upgradeType) {
      case UpgradeType.Armor:
        this.armor = true;
        break;
      case UpgradeType.Attack:
        this.attack = true;
        break;
      case UpgradeType.HitPoints:
        this.hitPoints = true;
        break;
      case UpgradeType.Speed:
        this.speed = true;
        break;
      default:
        console.log(
          "Error! Unrecognized upgrade type was requested. Type: " + upgradeType
        );
        return;
    }
  }

  public GetArmor(): boolean {
    return this.armor;
  }
  public SetArmor(state: boolean): void {
    this.armor = state;
  }
  public GetAttack(): boolean {
    return this.attack;
  }
  public SetAttack(state: boolean): void {
    this.attack = state;
  }
  public GetHitPoints(): boolean {
    return this.hitPoints;
  }
  public SetHitPoints(state: boolean): void {
    this.hitPoints = state;
  }
  public GetSpeed(): boolean {
    return this.speed;
  }
  public SetSpeed(state: boolean): void {
    this.speed = state;
  }
}
