module.exports = class GameObject {
  id = "";
  ownerId = "";
  status = ""; // Wait, Active, Retreat
  currentUnits = [];
  expectedUnits = [];
  invidualRetreatAllowed = false;
  invidualRetreatTreshold = 0;
  groupRetreatAllowed = false;
  groupRetreatTreshold = 0;
  focusFireEnabled = false;
  focusFireTarget = "";
  focusOnlyUnits = false;
  groupTask = "";

  constructor(ownerId, groupId, expectedUnits, task, tactics) {
    this.id = groupId;
    this.ownerId = ownerId;
    this.status = "Wait";
    this.expectedUnits = expectedUnits;
    this.groupTask = task;

    let retreat = tactics.find((element) => element.type === "RetreatTactic");
    let focusFire = tactics.find(
      (element) => element.type === "FocusFireTactic"
    );

    if (retreat !== undefined) {
      this.groupRetreatAllowed = retreat.contents.groupRetreatAllowed;
      this.groupRetreatTreshold = retreat.contents.groupRetreatValue;
      this.invidualRetreatAllowed = retreat.contents.individualRetreatAllowed;
      this.invidualRetreatTreshold =
        retreat.contents.individualRetreatPercentage;
    } else {
      this.groupRetreatAllowed = false;
      this.groupRetreatTreshold = 0;
      this.invidualRetreatAllowed = false;
      this.invidualRetreatTreshold = 0;
    }

    if (focusFire !== undefined) {
      this.focusFireEnabled = focusFire.contents.groupRetreatAllowed;
      this.focusFireTarget = focusFire.contents.focusFireTarget;
      this.focusOnlyUnits = focusFire.contents.focusOnlyUnits;
    } else {
      this.focusFireEnabled = false;
      this.focusFireTarget = "";
      this.focusOnlyUnits = false;
    }
  }

  GetId() {
    return this.id;
  }

  GetStatus() {
    return this.status;
  }

  GetTask() {
    return this.groupTask;
  }

  HasAllUnits() {
    for (let i = 0; i < this.expectedUnits.length; i++) {
      if (!this.expectedUnits[i].inGroup) return false;
    }
    return true;
  }

  GetMissingUnits() {
    let missingUnits = [];
    for (let i = 0; i < this.expectedUnits.length; i++) {
      if (!this.expectedUnits[i].inGroup) {
        missingUnits.push(this.expectedUnits[i].unitName);
      }
    }
    return missingUnits;
  }

  NeedUnitType(unitName) {
    for (let i = 0; i < this.expectedUnits.length; i++) {
      if (
        !this.expectedUnits[i].inGroup &&
        this.expectedUnits[i].unitName === unitName
      )
        return true;
    }
    return false;
  }

  AddUnit(unit) {
    let expectedUnit = this.expectedUnits.find(
      (element) => !element.inGroup && element.unitName === unit.GetName()
    );
    if (expectedUnit === undefined) {
      console.log(
        "Error! Trying to add a unit to battlegroup which is not needed."
      );
      return false;
    }
    this.currentUnits.push(unit);
    expectedUnit.inGroup = true;
    expectedUnit.unitId = unit.GetObjectId();
    if (this.HasAllUnits() && this.status === "Wait") {
      this.status = "Active";
    }
  }

  CheckUnits() {
    this.currentUnits.forEach((unit) => {
      if (unit.GetHitPoints() < 1) {
        this.currentUnits.splice(this.currentUnits.indexOf(unit), 1);
        let expectedUnit = this.expectedUnits.find(
          (element) => element.unitId === unit.GetObjectId()
        );
        expectedUnit.unitId = "";
        expectedUnit.inGroup = false;
      }
    });

    if (this.currentUnits.length === 0) {
      this.status = "Wait";
    }
  }
};
