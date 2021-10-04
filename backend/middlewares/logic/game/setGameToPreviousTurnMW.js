const {
  undoBuild,
  undoCreate,
  undoMove,
  undoAttack,
  undoModifyResource,
  undoUpgrade,
  undoAddBuilding,
  undoRemoveBuilding,
} = require("./helperFunctions/helperFunctions");

module.exports = function () {
  return function (req, res, next) {
    for (let i = 0; i < req.params.turnIncrement; i++) {
      if (res.locals.game.currentTurn > 0) {
        res.locals.commandsToUndo =
          res.locals.game.commands[res.locals.game.currentTurn - 1].reverse();
        res.locals.commandsToUndo.forEach((command) => {
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
            case "modify resource":
              undoModifyResource(res.locals.game.players, command);
              break;
            case "upgrade":
              undoUpgrade(res.locals.game.players, command);
              break;
            case "updateResources":
              res.locals.game.players = command.oldPlayers;
              break;
            case "add building":
              undoAddBuilding(
                res.locals.game.buildings,
                res.locals.game.tiles,
                command
              );
              break;
            case "remove building":
              undoRemoveBuilding(
                res.locals.game.buildings,
                res.locals.game.tiles,
                command
              );
              break;
            default:
              console.log("Error: Unknown command!");
              break;
          }
          res.locals.game.currentCommandNumber--;
        });
        res.locals.game.currentTurn--;
      }
    }
    if (res.locals.game.currentTurn === 0) {
      res.locals.game.players = res.locals.game.startingPlayers;
    }
    return next();
  };
};
