const {
  undoBuild,
  undoCreate,
  undoMove,
  undoAttack,
} = require("./helperFunctions/helperFunctions");

module.exports = function () {
  return function (req, res, next) {
    console.log("set game to start");
    console.log(res.locals);
    if (res.locals.game.currentTurn > 0) {
      let commandsToUndo = res.locals.game.commands
        .slice(0, res.locals.game.currentTurn)
        .flat()
        .reverse();
      commandsToUndo.forEach((command) => {
        switch (command.type) {
          case "build":
            undoBuild(
              res.locals.game.buildings,
              res.locals.game.tiles,
              command
            );
            break;
          case "create":
            undoCreate(res.locals.game.units, res.locals.game.tiles, command);
            break;
          case "move":
            undoMove(res.locals.game.units, res.locals.game.tiles, command);
            break;
          case "attack":
            undoAttack(
              res.locals.game.buildings,
              res.locals.game.units,
              res.locals.game.tiles,
              command
            );
            break;
          case "updateResources":
            res.locals.game.players = command.newPlayers;
            break;
          default:
            console.log("Error: Unknown command!");
            break;
        }
      });
      res.locals.game.currentCommandNumber = 0;
      res.locals.game.currentTurn = 0;
    }
    return next();
  };
};

// Helper functions
function locationEqual(location1, location2) {
  if (location1[0] === location2[0] && location1[1] === location2[1]) {
    return true;
  }
  return false;
}

// function undoBuild(buildings, tiles, command) {
//   let buildingToRemove = buildings.find(
//     (building) => building.objectId === command.building.objectId
//   );
//   let buildingIndex = buildings.indexOf(buildingToRemove);
//   if (buildingIndex > -1) {
//     buildings.splice(buildingIndex, 1);
//   }
//   tiles.find((tile) =>
//     locationEqual(tile.location, command.building.location)
//   ).buildingId = "null";
// }

// function undoCreate(units, tiles, command) {
//   let unitToRemove = units.find(
//     (unit) => unit.objectId === command.unit.objectId
//   );
//   let unitIndex = units.indexOf(unitToRemove);
//   if (unitIndex > -1) {
//     units.splice(unitIndex, 1);
//   }
//   tiles.find((tile) =>
//     locationEqual(tile.location, command.unit.location)
//   ).unit = "null";
// }

// function undoMove(units, tiles, command) {
//   let unitToMoveId = tiles.find((tile) =>
//     locationEqual(tile.location, command.endLocation)
//   ).unitId;
//   tiles.find((tile) =>
//     locationEqual(tile.location, command.startLocation)
//   ).unitId = unitToMoveId;
//   tiles.find((tile) =>
//     locationEqual(tile.location, command.endLocation)
//   ).unitId = "null";
//   units.find((unit) => unit.objectId === unitToMoveId).location =
//     command.startLocation;
// }

// function undoAttack(buildings, units, tiles, command) {
//   let isBuilding = false;
//   if (command.targetObject.type === "building") {
//     isBuilding = true;
//   }
//   if (command.targetObject.type === "unit") {
//     isUnit = true;
//   }
//   let targetUnit = units.find(
//     (unit) => unit.objectId === command.targetObject.objectId
//   );
//   let targetBuilding = undefined;
//   if (isBuilding) {
//     targetBuilding = buildings.find(
//       (building) => building.objectId === command.targetObject.objectId
//     );
//     let index = buildings.indexOf(targetBuilding);
//     if (index > -1) {
//       buildings.splice(index, 1);
//     }
//   } else {
//     let index = units.indexOf(targetUnit);
//     if (index > -1) {
//       units.splice(index, 1);
//     }
//   }

//   command.targetObject.hitPoints += Math.max(
//     command.attackerObject.attackDamage - command.targetObject.armor,
//     1
//   );
//   if (isBuilding) {
//     buildings.push(command.targetObject);
//     tiles.find((tile) =>
//       locationEqual(tile.location, command.targetObject.location)
//     ).buildingId = command.targetObject.objectId;
//   } else {
//     units.push(command.targetObject);
//     tiles.find((tile) =>
//       locationEqual(tile.location, command.targetObject.location)
//     ).unitId = command.targetObject.objectId;
//   }
// }
