import { BattleGroupStatus } from "../enums/battleGroupStatus.js";
import { TacticType } from "../enums/tacticType.js";
import { UnitType } from "../enums/unitType.js";
import ExpectedUnit from "../types/expectedUnit.js";
import FocusFireTactic from "../types/TacticTypes/focusFireTactic.js";
import RetreatTactic from "../types/TacticTypes/retreatTactic.js";
import Tactic from "../types/TacticTypes/tactic.js";
import Unit from "./Unit.js";

export default class BattleGroup {
  private id: number;
  private owner: string;
  private status: BattleGroupStatus;
  private currentUnits: Unit[];
  private expectedUnits: ExpectedUnit[];
  private invidualRetreatAllowed: boolean;
  private invidualRetreatTreshold: number;
  private groupRetreatAllowed: boolean;
  private groupRetreatTreshold: number;
  private focusFireEnabled: boolean;
  private focusFireTarget: string;
  private focusOnlyUnits: boolean;
  private groupTask: string;

  constructor(
    owner: string,
    groupId: number,
    expectedUnits: ExpectedUnit[],
    task: string,
    tactics: Tactic[]
  ) {
    this.currentUnits = new Array<Unit>();
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
      this.invidualRetreatAllowed = retreat.GetIndividualRetreatAllowed();
      this.invidualRetreatTreshold = retreat.GetIndividualRetreatPercentage();
    } else {
      this.groupRetreatAllowed = false;
      this.groupRetreatTreshold = 0;
      this.invidualRetreatAllowed = false;
      this.invidualRetreatTreshold = 0;
    }

    if (focusFire !== undefined) {
      this.focusFireEnabled = focusFire.GetFocusFireEnabled();
      this.focusFireTarget = focusFire.GetFocusFireTarget();
      this.focusOnlyUnits = focusFire.GetFocusOnlyUnits();
    } else {
      this.focusFireEnabled = false;
      this.focusFireTarget = "";
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
          (element) => element.GetUnitId() === unit.GetObjectId()
        );
        expectedUnit.SetUnitId(null);
        expectedUnit.SetInGroup(false);
      }
    });

    if (this.currentUnits.length === 0) {
      this.status = BattleGroupStatus.Wait;
    }
  }
}
