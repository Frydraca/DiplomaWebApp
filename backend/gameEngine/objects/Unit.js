const GameObject = require("./GameObject");

module.exports = class Unit extends GameObject {
  cost = {};
  speed = 0;
  hasAction = false;
  groupName = "";
  //Idle, Moving, Build, Pick Up resources, Put down Resources, Target, Attack, Reload
  status = "";

  constructor(unitData, ownerId) {
    super(unitData, ownerId);
    this.type = "unit";
    this.status = "Idle";
    this.groupName = "";
    this.cost = JSON.parse(JSON.stringify(unitData.cost));
    this.speed = JSON.parse(JSON.stringify(unitData.speed));
  }

  GetSpeed() {
    return this.speed;
  }

  HasAction() {
    return this.hasAction;
  }

  SetHasAction(state) {
    this.hasAction = state;
  }

  AddGroupName(groupName) {
    this.groupName = groupName;
  }

  GetBattleGroup() {
    return this.groupName;
  }

  InGroup() {
    if (this.groupName === "") return false;
    else return true;
  }

  CanCreate(resources) {
    if (
      resources.steel >= this.cost.steel &&
      resources.crystal >= this.cost.crystal &&
      resources.roboSteel >= this.cost.roboSteel &&
      resources.energyCore >= this.cost.energyCore
    ) {
      return true;
    }
    return false;
  }
  TakeCost(resources) {
    resources.steel -= this.cost.steel;
    resources.crystal -= this.cost.crystal;
    resources.roboSteel -= this.cost.roboSteel;
    resources.energyCore -= this.cost.energyCore;
    return resources;
  }

  FindLocationToCreate(gameMap) {
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
};
