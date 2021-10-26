import { BattleGroupStatus } from "../enums/battleGroupStatus.js";
import { TacticType } from "../enums/tacticType.js";
import { UnitType } from "../enums/unitType.js";
import ExpectedUnit from "../types/expectedUnit.js";
import FocusFireTactic from "../types/TacticTypes/focusFireTactic.js";
import RetreatTactic from "../types/TacticTypes/retreatTactic.js";
import Tactic from "../types/TacticTypes/tactic.js";
import Unit from "./Unit.js";
import ArtilleryBotData from "../data/units/artilleryBot.js";
import AttackBotData from "../data/units/attackBot.js";
import RaiderBotData from "../data/units/raiderBot.js";
import TankBotData from "../data/units/tankBot.js";
import { FocusTarget } from "../enums/FocusTarget.js";
import LocationType from "../types/locationType.js";

export default class BattleGroup {
  private id: number;
  private owner: string;
  private status: BattleGroupStatus;
  private currentUnits: Unit[];
  private expectedUnits: ExpectedUnit[];
  private individualRetreatAllowed: boolean;
  private individualRetreatTreshold: number;
  private groupRetreatAllowed: boolean;
  private groupRetreatTreshold: number;
  private focusFireEnabled: boolean;
  private focusFireTarget: FocusTarget;
  private focusOnlyUnits: boolean;
  private groupTask: string;
  private targetCenterLocation: LocationType;

  constructor(
    owner: string,
    groupId: number,
    expectedUnits: ExpectedUnit[],
    task: string,
    tactics: Tactic[]
  ) {
    this.currentUnits = new Array<Unit>();
    this.targetCenterLocation = new LocationType(0, 0);
    this.id = groupId;
    this.owner = owner;
    this.status = BattleGroupStatus.Wait;
    this.expectedUnits = expectedUnits;
    this.groupTask = task;

    let retreat = <RetreatTactic>(
      tactics.find((element) => element.GetTacticType() === TacticType.Retreat)
    );
    let focusFire = <FocusFireTactic>(
      tactics.find(
        (element: Tactic) => element.GetTacticType() === TacticType.FocusFire
      )
    );

    if (retreat !== undefined) {
      this.groupRetreatAllowed = retreat.GetGroupRetreatAllowed();
      this.groupRetreatTreshold = retreat.GetGroupRetreatValue();
      this.individualRetreatAllowed = retreat.GetIndividualRetreatAllowed();
      this.individualRetreatTreshold = retreat.GetIndividualRetreatPercentage();
    } else {
      this.groupRetreatAllowed = false;
      this.groupRetreatTreshold = 0;
      this.individualRetreatAllowed = false;
      this.individualRetreatTreshold = 0;
    }

    if (focusFire !== undefined) {
      this.focusFireEnabled = focusFire.GetFocusFireEnabled();
      this.focusFireTarget = focusFire.GetFocusFireTarget();
      this.focusOnlyUnits = focusFire.GetFocusOnlyUnits();
    } else {
      this.focusFireEnabled = false;
      this.focusFireTarget = FocusTarget.Closest;
      this.focusOnlyUnits = false;
    }
  }

  public GetId(): number {
    return this.id;
  }

  public GetStatus(): BattleGroupStatus {
    return this.status;
  }

  public GetTask() {
    return this.groupTask;
  }

  public GetFocusTarget(): FocusTarget {
    return this.focusFireTarget;
  }

  public IsIndividualRetreatAllowed(): boolean {
    return this.individualRetreatAllowed;
  }

  public GetIndividualRetreatTreshold(): number {
    return this.individualRetreatTreshold;
  }

  public HasAllUnits(): boolean {
    for (let i = 0; i < this.expectedUnits.length; i++) {
      if (!this.expectedUnits[i].IsInGroup()) return false;
    }
    return true;
  }

  public GetMissingUnits(): UnitType[] {
    let missingUnits = new Array<UnitType>();
    for (let i = 0; i < this.expectedUnits.length; i++) {
      if (!this.expectedUnits[i].IsInGroup()) {
        missingUnits.push(this.expectedUnits[i].GetUnitType());
      }
    }
    return missingUnits;
  }

  public GetSlowestUnitSpeed(): number {
    let slowestSpeed = Number.POSITIVE_INFINITY;
    this.currentUnits.forEach((unit) => {
      if (unit.GetSpeed() < slowestSpeed) {
        slowestSpeed = unit.GetSpeed();
      }
    });
    return slowestSpeed;
  }

  public GetCenterLocationOfGroup(): LocationType {
    let x = 0;
    let y = 0;
    this.currentUnits.forEach((unit) => {
      x += unit.GetLocation().GetX();
      y += unit.GetLocation().GetY();
    });

    return new LocationType(
      Math.floor(x / this.currentUnits.length),
      Math.floor(y / this.currentUnits.length)
    );
  }

  public GetTargetCenterLocation(): LocationType {
    return this.targetCenterLocation;
  }

  public SetTargetCenterLocation(target: LocationType): void {
    this.targetCenterLocation = target;
  }

  public NeedUnitType(unitType: UnitType): boolean {
    for (let i = 0; i < this.expectedUnits.length; i++) {
      if (
        !this.expectedUnits[i].IsInGroup() &&
        this.expectedUnits[i].GetUnitType() === unitType
      )
        return true;
    }
    return false;
  }

  public AddUnit(unit: Unit): void {
    let expectedUnit = this.expectedUnits.find(
      (element: ExpectedUnit) =>
        !element.IsInGroup() && element.GetUnitType() === unit.GetUnitType()
    );
    if (expectedUnit === undefined) {
      console.log(
        "Error! Trying to add a unit to battlegroup which is not needed."
      );
      return;
    }
    this.currentUnits.push(unit);
    expectedUnit.SetInGroup(true);
    expectedUnit.SetUnitId(unit.GetObjectId());
    if (this.HasAllUnits() && this.status === BattleGroupStatus.Wait) {
      this.status = BattleGroupStatus.Active;
    }
  }

  public CheckUnits(): void {
    this.currentUnits.forEach((unit) => {
      if (unit.GetHitPoints() < 1) {
        this.currentUnits.splice(this.currentUnits.indexOf(unit), 1);
        let expectedUnit = this.expectedUnits.find(
          (element: ExpectedUnit) => element.GetUnitId() === unit.GetObjectId()
        );
        expectedUnit.SetUnitId(null);
        expectedUnit.SetInGroup(false);
      }
    });

    if (this.currentUnits.length === 0) {
      this.status = BattleGroupStatus.Wait;
    }

    if (
      this.currentUnits.length === this.expectedUnits.length &&
      this.status === BattleGroupStatus.Wait
    ) {
      this.status = BattleGroupStatus.Active;
    }
  }

  public CheckRetreat(): void {
    if (this.groupRetreatAllowed) {
      let currentHPPool = 0;
      let currentMaxHPPool = 0;
      this.currentUnits.forEach((unit: Unit) => {
        currentHPPool += unit.GetHitPoints();
      });
      this.expectedUnits.forEach((unit: ExpectedUnit) => {
        switch (unit.GetUnitType()) {
          case UnitType.ArtilleryBot:
            currentMaxHPPool += ArtilleryBotData.hitPoints;
            break;
          case UnitType.AttackBot:
            currentMaxHPPool += AttackBotData.hitPoints;
            break;
          case UnitType.RaiderBot:
            currentMaxHPPool += RaiderBotData.hitPoints;
            break;
          case UnitType.TankBot:
            currentMaxHPPool += TankBotData.hitPoints;
            break;
          default:
            break;
        }
      });
      if (
        (currentHPPool / currentMaxHPPool) * 100 <= this.groupRetreatTreshold &&
        this.status !== BattleGroupStatus.Wait
      ) {
        this.status = BattleGroupStatus.Retreat;
      } else if (this.status === BattleGroupStatus.Retreat) {
        this.status = BattleGroupStatus.Wait;
      }
    }
  }
}
