import { UnitStatus } from "../enums/unitStatus.js";
import Resources from "../types/resources.js";
import UnitData from "../types/DataTypes/unitData.js";
import GameObject from "./GameObject.js";
import { ObjectName } from "../enums/objectName.js";
import { UnitType } from "../enums/unitType.js";

export default class Unit extends GameObject {
  private speed: number;
  private hasAction: boolean;
  private groupId: number;
  //Idle, Moving, Build, Pick Up resources, Put down Resources, Target, Attack, Reload
  private status: UnitStatus;

  constructor(unitData: UnitData, owner: string) {
    super(unitData, owner);
    this.status = UnitStatus.Idle;
    this.groupId = null;
    this.hasAction = false;
    this.speed = unitData.GetSpeed();
  }

  public GetUnitType(): UnitType {
    switch (this.name) {
      case ObjectName.ArtilleryBot:
        return UnitType.ArtilleryBot;
      case ObjectName.AttackBot:
        return UnitType.AttackBot;
      case ObjectName.RaiderBot:
        return UnitType.RaiderBot;
      case ObjectName.TankBot:
        return UnitType.TankBot;
      default:
        console.log("Error! Not compatible unit type and object name!");
    }
    return UnitType.AttackBot;
  }

  public GetSpeed(): number {
    return this.speed;
  }

  public HasAction(): boolean {
    return this.hasAction;
  }

  public SetHasAction(state: boolean): void {
    this.hasAction = state;
  }

  public AddGroupName(groupId: number): void {
    this.groupId = groupId;
  }

  public GetBattleGroup(): number {
    return this.groupId;
  }

  public InGroup(): boolean {
    if (this.groupId === null) return false;
    else return true;
  }

  public CanCreate(resources: Resources): boolean {
    if (resources.HasMoreOrEqualThan(this.cost)) {
      return true;
    }
    return false;
  }
  public TakeCost(resources: Resources): Resources {
    resources.Decrease(this.cost);
    return resources;
  }

  public FindLocationToCreate(gameMap) {
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

  public UpgradeSpeed(value: number): void {
    this.speed += value;
  }
}
