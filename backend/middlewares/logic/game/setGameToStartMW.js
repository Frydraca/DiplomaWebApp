const {
  undoBuild,
  undoCreate,
  undoMove,
  undoAttack,
  undoModifyResource,
  undoUpgrade,
} = require("./helperFunctions/helperFunctions");

module.exports = function () {
  return function (req, res, next) {
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
          case "modify resource":
            undoModifyResource(res.locals.game.players, command);
            break;
          case "upgrade":
            undoUpgrade(res.locals.game.players, command);
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
      res.locals.game.players = res.locals.game.startingPlayers;
    }
    return next();
  };
};
