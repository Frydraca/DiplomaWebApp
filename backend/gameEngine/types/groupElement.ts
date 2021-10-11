import { ObjectName } from "../enums/objectName.js";
import { UnitType } from "../enums/unitType.js";

export default class GroupElement {
  private objectName: ObjectName;
  private objectCount: number;

  constructor(objectName: ObjectName, objectCount: number) {
    this.objectName = objectName;
    this.objectCount = objectCount;
  }

  public GetObjectName(): ObjectName {
    return this.objectName;
  }
  public GetUnitType(): UnitType {
    switch (this.objectName) {
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
  public GetObjectCount(): number {
    return this.objectCount;
  }
}
