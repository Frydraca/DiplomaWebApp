import { UnitType } from "../enums/unitType.js";

export default class ExpectedUnit {
  private unitType: UnitType;
  private inGroup: boolean;
  private unitId: number;

  constructor(unitType: UnitType, inGroup: boolean, unitId: number) {
    this.unitType = unitType;
    this.inGroup = inGroup;
    this.unitId = unitId;
  }

  public GetUnitType(): UnitType {
    return this.unitType;
  }
  public IsInGroup(): boolean {
    return this.inGroup;
  }
  public SetInGroup(state: boolean): void {
    this.inGroup = state;
  }
  public GetUnitId(): number {
    return this.unitId;
  }
  public SetUnitId(id: number): void {
    this.unitId = id;
  }
}
