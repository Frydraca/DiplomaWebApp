const ModifyResourceCommand = require("../../../../gameEngine/commands/modifyResourceCommand");

// Helper functions
function locationEqual(location1, location2) {
  if (location1[0] === location2[0] && location1[1] === location2[1]) {
    return true;
  }
  return false;
}

module.exports = {
  doBuild: function (buildings, tiles, command) {
    buildings.push(command.building);
    tiles.find((tile) =>
      locationEqual(tile.location, command.building.location)
    ).buildingId = command.building.objectId;
  },
  doCreate: function (units, tiles, command) {
    units.push(command.unit);
    tiles.find((tile) =>
      locationEqual(tile.location, command.unit.location)
    ).unitId = command.unit.objectId;
  },
  doMove: function (units, tiles, command) {
    let unitToMoveId = tiles.find((tile) =>
      locationEqual(tile.location, command.startLocation)
    ).unitId;
    tiles.find((tile) =>
      locationEqual(tile.location, command.startLocation)
    ).unitId = "null";
    tiles.find((tile) =>
      locationEqual(tile.location, command.endLocation)
    ).unitId = unitToMoveId;
    units.find((unit) => unit.objectId === unitToMoveId).location =
      command.endLocation;
  },
  doAttack: function (buildings, units, command) {
    let isBuilding = false;
    let targetUnit = units.find(
      (unit) => unit.objectId === command.targetObject.objectId
    );
    let targetBuilding = undefined;
    if (targetUnit === undefined) {
      targetBuilding = buildings.find(
        (building) => building.objectId === command.targetObject.objectId
      );
      isBuilding = true;
      let index = buildings.indexOf(targetBuilding);
      if (index > -1) {
        buildings.splice(index, 1);
      }
    } else {
      let index = units.indexOf(targetUnit);
      if (index > -1) {
        units.splice(index, 1);
      }
    }

    if (command.targetObject.hitPoints > 0) {
      if (isBuilding) {
        buildings.push(command.targetObject);
      } else {
        units.push(command.targetObject);
      }
    }
  },
  doModifyResource: function (players, command) {
    let player = players.find((player) => player.playerId === command.playerId);
    player.resources[command.resource] += command.value;
  },
  undoBuild: function (buildings, tiles, command) {
    let buildingToRemove = buildings.find(
      (building) => building.objectId === command.building.objectId
    );
    let buildingIndex = buildings.indexOf(buildingToRemove);
    if (buildingIndex > -1) {
      buildings.splice(buildingIndex, 1);
    }
    tiles.find((tile) =>
      locationEqual(tile.location, command.building.location)
    ).buildingId = "null";
  },
  undoCreate: function (units, tiles, command) {
    let unitToRemove = units.find(
      (unit) => unit.objectId === command.unit.objectId
    );
    let unitIndex = units.indexOf(unitToRemove);
    if (unitIndex > -1) {
      units.splice(unitIndex, 1);
    }
    tiles.find((tile) =>
      locationEqual(tile.location, command.unit.location)
    ).unit = "null";
  },
  undoMove: function (units, tiles, command) {
    let unitToMoveId = tiles.find((tile) =>
      locationEqual(tile.location, command.endLocation)
    ).unitId;
    tiles.find((tile) =>
      locationEqual(tile.location, command.startLocation)
    ).unitId = unitToMoveId;
    tiles.find((tile) =>
      locationEqual(tile.location, command.endLocation)
    ).unitId = "null";
    units.find((unit) => unit.objectId === unitToMoveId).location =
      command.startLocation;
  },
  undoAttack: function (buildings, units, tiles, command) {
    let isBuilding = false;
    if (command.targetObject.type === "building") {
      isBuilding = true;
    }
    if (command.targetObject.type === "unit") {
      isUnit = true;
    }
    let targetUnit = units.find(
      (unit) => unit.objectId === command.targetObject.objectId
    );
    let targetBuilding = undefined;
    if (isBuilding) {
      targetBuilding = buildings.find(
        (building) => building.objectId === command.targetObject.objectId
      );
      let index = buildings.indexOf(targetBuilding);
      if (index > -1) {
        buildings.splice(index, 1);
      }
    } else {
      let index = units.indexOf(targetUnit);
      if (index > -1) {
        units.splice(index, 1);
      }
    }

    command.targetObject.hitPoints += Math.max(
      command.attackerObject.attackDamage - command.targetObject.armor,
      1
    );
    if (isBuilding) {
      buildings.push(command.targetObject);
      tiles.find((tile) =>
        locationEqual(tile.location, command.targetObject.location)
      ).buildingId = command.targetObject.objectId;
    } else {
      units.push(command.targetObject);
      tiles.find((tile) =>
        locationEqual(tile.location, command.targetObject.location)
      ).unitId = command.targetObject.objectId;
    }
  },
  undoModifyResource: function (players, command) {
    let player = players.find((player) => player.playerId === command.playerId);
    player.resources[command.resource] -= command.value;
  },
};
