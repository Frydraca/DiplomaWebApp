module.exports = function () {
  return function (req, res, next) {
    console.log("Do next turn");
    if (res.locals.game.currentTurn <= res.locals.game.commands.length) {
      res.locals.commandsToDo =
        res.locals.game.commands[res.locals.game.currentTurn];
      res.locals.commandsToDo.forEach((command) => {
        switch (command.type) {
          case "build":
            res.locals.game.buildings.push(command.building);
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.building.location[0] &&
                tile.location[1] === command.building.location[1]
            ).buildingId = command.building.objectId;
            break;
          case "create":
            res.locals.game.units.push(command.unit);
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.unit.location[0] &&
                tile.location[1] === command.unit.location[1]
            ).unitId = command.unit.objectId;
            break;
          case "move":
            let unitToMoveId = res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.startLocation[0] &&
                tile.location[1] === command.startLocation[1]
            ).unitId;
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.startLocation[0] &&
                tile.location[1] === command.startLocation[1]
            ).unitId = "null";
            res.locals.game.tiles.find(
              (tile) =>
                tile.location[0] === command.endLocation[0] &&
                tile.location[1] === command.endLocation[1]
            ).unitId = unitToMoveId;
            res.locals.game.units.find(
              (unit) => unit.objectId === unitToMoveId
            ).location = command.endLocation;
            break;
          case "attack":
            let isBuilding = false;
            let targetUnit = res.locals.game.units.find(
              (unit) => unit.objectId === command.targetObject.objectId
            );
            let targetBuilding = undefined;
            if (targetUnit === undefined) {
              targetBuilding = res.locals.game.buildings.find(
                (building) =>
                  building.objectId === command.targetObject.objectId
              );
              isBuilding = true;
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

            if (command.targetObject.hitPoints > 0) {
              if (isBuilding) {
                res.locals.game.buildings.push(command.targetObject);
              } else {
                res.locals.game.units.push(command.targetObject);
              }
            }
            break;
          case "updateResources":
            res.locals.game.players = command.newPlayers;
            break;
          default:
            console.log("Error: Unknown command!");
            break;
        }
        res.locals.game.currentCommandNumber++;
      });
      res.locals.game.currentTurn++;
    }
    return next();
  };
};
