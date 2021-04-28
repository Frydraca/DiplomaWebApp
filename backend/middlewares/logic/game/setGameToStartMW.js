module.exports = function () {
  return function (req, res, next) {
    console.log("set game to start");
    if (res.locals.game.currentTurn > 0) {
      res.locals.commandsToUndo = res.locals.game.commands
        .slice(0, res.locals.game.currentTurn)
        .flat()
        .reverse();
      res.locals.commandsToUndo.forEach((command) => {
        switch (command.type) {
          case "build":
            let buildingToRemove = res.locals.game.buildings.find(
              (building) => building.objectId === command.building.objectId
            );
            let buildingIndex = res.locals.game.buildings.indexOf(
              buildingToRemove
            );
            if (buildingIndex > -1) {
              res.locals.game.buildings.splice(buildingIndex, 1);
            }
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.building.location[0] &&
                tile.location[1] === command.building.location[1]
            ).buildingId = "null";
            break;
          case "create":
            let unitToRemove = res.locals.game.units.find(
              (unit) => unit.objectId === command.unit.objectId
            );
            let unitIndex = res.locals.game.units.indexOf(unitToRemove);
            if (unitIndex > -1) {
              res.locals.game.units.splice(unitIndex, 1);
            }
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.unit.location[0] &&
                tile.location[1] === command.unit.location[1]
            ).unit = "null";
            break;
          case "move":
            let unitToMoveId = res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.endLocation[0] &&
                tile.location[1] === command.endLocation[1]
            ).unitId;
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.startLocation[0] &&
                tile.location[1] === command.startLocation[1]
            ).unitId = unitToMoveId;
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.endLocation[0] &&
                tile.location[1] === command.endLocation[1]
            ).unitId = "null";
            res.locals.game.units.find(
              (unit) => unit.objectId === unitToMoveId
            ).location = command.startLocation;
            break;
          case "attack":
            let isBuilding = false;
            if (command.targetObject.type === "building") {
              isBuilding = true;
            }
            if (command.targetObject.type === "unit") {
              isUnit = true;
            }
            let targetUnit = res.locals.game.units.find(
              (unit) => unit.objectId === command.targetObject.objectId
            );
            let targetBuilding = undefined;
            if (isBuilding) {
              targetBuilding = res.locals.game.buildings.find(
                (building) =>
                  building.objectId === command.targetObject.objectId
              );
              let index = res.locals.game.buildings.indexOf(targetBuilding);
              if (index > -1) {
                res.locals.game.buildings.splice(index, 1);
              }
            } else {
              let index = res.locals.game.units.indexOf(targetUnit);
              if (index > -1) {
                res.locals.game.units.splice(index, 1);
              }
            }

            command.targetObject.hitPoints += Math.max(
              command.attackerObject.attackDamage - command.targetObject.armor,
              1
            );
            if (isBuilding) {
              res.locals.game.buildings.push(command.targetObject);
              res.locals.game.tiles.find(
                (tile) =>
                  tile.location[0] === command.targetObject.location[0] &&
                  tile.location[1] === command.targetObject.location[1]
              ).buildingId = command.targetObject.objectId;
            } else {
              res.locals.game.units.push(command.targetObject);
              res.locals.game.tiles.find(
                (tile) =>
                  tile.location[0] === command.targetObject.location[0] &&
                  tile.location[1] === command.targetObject.location[1]
              ).unitId = command.targetObject.objectId;
            }
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
