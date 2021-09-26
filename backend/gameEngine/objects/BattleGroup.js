module.exports = class GameObject {
  id = "";
  ownerId = "";
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
};
